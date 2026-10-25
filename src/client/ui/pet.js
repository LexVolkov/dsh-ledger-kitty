import { h, useState, useEffect, useRef, useCallback, useLayoutEffect } from '../runtime.js';
import { STRINGS } from '../i18n/index.js';
import { PET_W, PET_H, SIZES, SNAP_ZONE, SLEEP_AFTER_MS, POS_KEY, SIZE_KEY, SETTINGS_KEY } from '../constants.js';
import { readStore, writeStore, normalizeSize, normalizeSettings } from '../store.js';
import { clampPos, defaultPos, snapToEdge } from '../geometry.js';
import { fetchState } from '../format.js';
import { configureAudio, unlockAudio, playSound, startTyping, stopTyping, startPurr, stopPurr } from '../audio.js';
import { PetView } from './pet-view.js';

/** Accountant glyphs that float above the head while the agent is working. */
const BUSY_SYMBOLS = ['+', '\u2212', '=', '\u00a5', '%', '#', '?', '!'];

export function LedgerKitty(props) {
  const t = props.t;

  const [scale, setScale] = useState(function () {
    return normalizeSize(readStore(SIZE_KEY, 1));
  });
  const [pos, setPos] = useState(function () {
    const saved = readStore(POS_KEY, null);
    return saved && typeof saved.left === 'number' ? clampPos(saved, scale) : defaultPos(scale);
  });
  const [dragging, setDragging] = useState(false);
  const [blink, setBlink] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [bubble, setBubble] = useState(null);
  const [hop, setHop] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [agent, setAgent] = useState({ running: false, waiting: false });
  const [celebrating, setCelebrating] = useState(false);
  const [pleased, setPleased] = useState(false);
  const [card, setCard] = useState(null);
  const [settings, setSettings] = useState(function () {
    return normalizeSettings(readStore(SETTINGS_KEY, null), props.defaultLang);
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cardBox, setCardBox] = useState({ shift: 0, tail: 80 });
  const [rates, setRates] = useState(null);

  // The pet's own language, independent of the app locale.
  const tr = useCallback(function (key) {
    const dict = STRINGS[settings.language] || STRINGS.en;
    return dict[key] || STRINGS.en[key] || t(key);
  }, [settings.language, t]);

  const posRef = useRef(pos);
  posRef.current = pos;
  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const dragRef = useRef(null);
  const idleRef = useRef(0);
  const bubbleRef = useRef(0);
  const heartSeq = useRef(0);
  const symbolSeq = useRef(0);
  const agentRef = useRef({ running: false, waiting: false, anyRunning: false });
  const celebrateRef = useRef(0);
  const pleasedRef = useRef(false);
  const pleasureTimeoutRef = useRef(0);
  const heartTimerRef = useRef(0);
  const strokeRef = useRef({ distance: 0, x: 0, y: 0, lastAt: 0 });
  const busyRef = useRef(false);
  const cardRef = useRef(0);
  const sessionIdRef = useRef(null);
  const cardAnchor = useRef(null);
  const settingsAnchor = useRef(null);
  const menuAnchor = useRef(null);
  const lastClickRef = useRef(0);
  const viewportRef = useRef({ w: window.innerWidth, h: window.innerHeight });

  useEffect(function () {
    writeStore(SETTINGS_KEY, settings);
    configureAudio(settings);
    // Toggling a sound mid-turn takes effect immediately.
    if (agent.running && settings.sounds.typing !== false) startTyping();
    if (!agent.running) stopTyping();
  }, [settings, agent.running]);

  // Browsers unlock audio on any user gesture, not only on the pet: the first
  // click anywhere in the app is enough for the purr to become audible.
  useEffect(function () {
    function unlock() {
      unlockAudio();
    }
    window.addEventListener('pointerdown', unlock, { once: true, capture: true });
    window.addEventListener('keydown', unlock, { once: true, capture: true });
    return function () {
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('keydown', unlock, true);
    };
  }, []);

  // Accountant glyphs float above the head while the agent works, with the
  // same lifecycle as the hearts: spawn, drift up, remove themselves.
  useEffect(function () {
    if (!agent.running) return undefined;
    const timer = window.setInterval(function () {
      const id = symbolSeq.current + 1;
      symbolSeq.current = id;
      const glyph = BUSY_SYMBOLS[Math.floor(Math.random() * BUSY_SYMBOLS.length)];
      setSymbols(function (current) {
        return current.concat({ id: id, glyph: glyph, dx: Math.round(Math.random() * 44 - 22) });
      });
      window.setTimeout(function () {
        setSymbols(function (current) {
          return current.filter(function (item) {
            return item.id !== id;
          });
        });
      }, 1500);
    }, 620);
    return function () {
      window.clearInterval(timer);
    };
  }, [agent.running]);

  useLayoutEffect(function () {
    const node = settingsOpen
      ? settingsAnchor.current
      : menuOpen
        ? menuAnchor.current
        : card
          ? cardAnchor.current
          : null;
    if (!node) return;
    const width = node.offsetWidth || 170;
    const petCenter = posRef.current.left + (PET_W * scaleRef.current) / 2;
    const minLeft = 10;
    const maxLeft = Math.max(minLeft, window.innerWidth - width - 10);
    const desired = petCenter - width / 2;
    const left = Math.min(Math.max(minLeft, desired), maxLeft);
    const shift = left - desired;
    const tail = Math.min(Math.max(14, petCenter - left), Math.max(14, width - 14));
    setCardBox(function (current) {
      if (Math.abs(current.shift - shift) < 0.5 && Math.abs(current.tail - tail) < 0.5) return current;
      return { shift: shift, tail: tail };
    });
  }, [card, settingsOpen, menuOpen, pos, scale]);


  const wake = useCallback(function () {
    setSleeping(false);
    window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(function () {
      // The cat does not fall asleep on a working agent: it keeps tapping.
      if (busyRef.current) {
        wake();
        return;
      }
      setSleeping(true);
    }, SLEEP_AFTER_MS);
  }, []);

  const say = useCallback(function (text) {
    setBubble(text);
    window.clearTimeout(bubbleRef.current);
    bubbleRef.current = window.setTimeout(function () {
      setBubble(null);
    }, 3400);
  }, []);

  const spawnHeart = useCallback(function () {
    const id = heartSeq.current + 1;
    heartSeq.current = id;
    setHearts(function (current) {
      return current.concat({ id: id, dx: Math.round(Math.random() * 36 - 18) });
    });
    window.setTimeout(function () {
      setHearts(function (current) {
        return current.filter(function (heart) {
          return heart.id !== id;
        });
      });
    }, 1400);
  }, []);

  const burst = useCallback(function (text) {
    setHop(function (value) {
      return value + 1;
    });
    if (text) say(text);
    spawnHeart();
  }, [say, spawnHeart]);

  const startPleasure = useCallback(function () {
    if (pleasedRef.current) {
      keepPleasure();
      return;
    }
    pleasedRef.current = true;
    setPleased(true);
    startPurr();
    spawnHeart();
    window.clearInterval(heartTimerRef.current);
    heartTimerRef.current = window.setInterval(spawnHeart, 550);
    keepPleasure();
  }, [spawnHeart]);

  function keepPleasure() {
    window.clearTimeout(pleasureTimeoutRef.current);
    pleasureTimeoutRef.current = window.setTimeout(function () {
      stopPleasure();
    }, 800);
  }

  function stopPleasure() {
    if (!pleasedRef.current) return;
    pleasedRef.current = false;
    setPleased(false);
    window.clearInterval(heartTimerRef.current);
    heartTimerRef.current = 0;
    stopPurr();
  }

  const jump = useCallback(function () {
    const list = [1, 2, 3, 4, 5, 6].map(function (index) { return tr('line.' + index); });
    burst(list[Math.floor(Math.random() * list.length)]);
  }, [burst, tr]);

  const celebrate = useCallback(function () {
    burst(tr('reaction.done'));
    setCelebrating(true);
    window.clearTimeout(celebrateRef.current);
    celebrateRef.current = window.setTimeout(function () {
      setCelebrating(false);
    }, 1600);
  }, [burst, tr]);

  useEffect(function () {
    return function () {
      window.clearTimeout(celebrateRef.current);
      window.clearTimeout(cardRef.current);
    };
  }, []);

  const showCard = useCallback(function (mode, data, ttl) {
    if (data && data.rates) setRates(data.rates);
    setCard({ mode: mode, data: data });
    window.clearTimeout(cardRef.current);
    cardRef.current = window.setTimeout(function () {
      setCard(null);
    }, ttl);
  }, []);

  // The Host finishes writing the step's usage before the running flag
  // clears, but a short delay keeps the read off the same tick.
  const refreshCard = useCallback(function (mode, sessionId) {
    window.setTimeout(function () {
      fetchState(sessionId).then(function (data) {
        if (data && data.ok) {
          showCard(mode, data, mode === 'receipt' ? 15000 : 12000);
          return;
        }
        // The route answered but the Host could not build the payload.
        showCard(mode, { ok: false, reason: (data && data.reason) || 'generic' }, 9000);
      }).catch(function () {
        // Route missing or the Host is unreachable: say so instead of nothing.
        showCard(mode, { ok: false, reason: 'unreachable' }, 9000);
      });
    }, mode === 'receipt' ? 500 : 0);
  }, [showCard]);

  // An open card keeps itself current: the Host ledger grows with every
  // finished model step, including steps in the middle of a running turn.
  useEffect(function () {
    if (!card) return undefined;
    const timer = window.setInterval(function () {
      fetchState(sessionIdRef.current).then(function (data) {
        if (!data || !data.ok) return;
        if (data.rates) setRates(data.rates);
        setCard(function (current) {
          return current ? { mode: current.mode, data: data } : current;
        });
      }).catch(function () {
        /* ignore a failed refresh; the last numbers stay on screen */
      });
    }, 3000);
    return function () {
      window.clearInterval(timer);
    };
  }, [card !== null]);

  // Agent reactions: `running` drives the busy paws, a pending question or
  // approval raises a paw and a badge, and the moment every session stops
  // running the cat celebrates once and presents the receipt.
  const onAgent = useCallback(function (next) {
    const previous = agentRef.current;
    agentRef.current = next;
    busyRef.current = next.running;
    if (next.sessionId) sessionIdRef.current = next.sessionId;
    setAgent(function (current) {
      if (current.running === next.running && current.waiting === next.waiting) return current;
      return { running: next.running, waiting: next.waiting };
    });
    if (next.running && !previous.running) {
      wake();
      startTyping();
    }
    if (!next.running) stopTyping();
    if (next.waiting && !previous.waiting) {
      say(tr('reaction.wait'));
      playSound('question');
    }
    if (previous.anyRunning && !next.anyRunning && !next.waiting) {
      celebrate();
      playSound('receipt');
      refreshCard('receipt', next.sessionId || sessionIdRef.current);
    }
  }, [say, tr, celebrate, wake, refreshCard]);

  useEffect(function () {
    wake();
    return function () {
      window.clearTimeout(idleRef.current);
      window.clearTimeout(bubbleRef.current);
      window.clearTimeout(pleasureTimeoutRef.current);
      window.clearInterval(heartTimerRef.current);
      stopTyping();
      stopPurr();
    };
  }, [wake]);

  useEffect(function () {
    let timer = 0;
    let close = 0;
    let stopped = false;
    function loop() {
      timer = window.setTimeout(function () {
        setBlink(true);
        close = window.setTimeout(function () {
          setBlink(false);
          if (!stopped) loop();
        }, 130);
      }, 2300 + Math.random() * 3600);
    }
    loop();
    return function () {
      stopped = true;
      window.clearTimeout(timer);
      window.clearTimeout(close);
    };
  }, []);

  useEffect(function () {
    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    let lastWake = 0;
    function onMove(event) {
      const now = Date.now();
      if (now - lastWake > 500) {
        lastWake = now;
        wake();
      }
      const point = posRef.current;
      const currentScale = scaleRef.current;
      const cx = point.left + (PET_W * currentScale) / 2;
      const cy = point.top + PET_H * currentScale * 0.4;
      const nx = Math.max(-1, Math.min(1, (event.clientX - cx) / 240));
      const ny = Math.max(-1, Math.min(1, (event.clientY - cy) / 240));
      const x = Math.round(nx * 24) / 10;
      const y = Math.round(ny * 20) / 10;
      if (x === lastX && y === lastY) return;
      lastX = x;
      lastY = y;
      if (frame) return;
      frame = window.requestAnimationFrame(function () {
        frame = 0;
        setGaze({ x: x, y: y });
      });
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return function () {
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [wake]);

  // Resize keeps an attached cat attached: a right/bottom gap within the snap
  // zone is preserved, while a cat parked away from the edges stays exactly
  // where it is (only clamped back into the window).
  useEffect(function () {
    function onResize() {
      const prev = viewportRef.current;
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      viewportRef.current = { w: nextW, h: nextH };
      setPos(function (current) {
        const currentScale = scaleRef.current;
        const width = PET_W * currentScale;
        const height = PET_H * currentScale;
        let left = current.left;
        let top = current.top;
        const rightGap = prev.w - (current.left + width);
        if (rightGap <= SNAP_ZONE) left = nextW - width - Math.max(0, rightGap);
        const bottomGap = prev.h - (current.top + height);
        if (bottomGap <= SNAP_ZONE) top = nextH - height - Math.max(0, bottomGap);
        return clampPos({ left: left, top: top }, currentScale);
      });
    }
    window.addEventListener('resize', onResize);
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  function applySize(value) {
    const next = normalizeSize(value);
    const nextPos = clampPos(posRef.current, next);
    setScale(next);
    setPos(nextPos);
    writeStore(SIZE_KEY, next);
    writeStore(POS_KEY, nextPos);
  }

  function updateSettings(patch) {
    setSettings(function (current) {
      return normalizeSettings(Object.assign({}, current, patch));
    });
  }

  useEffect(function () {
    if (!settingsOpen) return undefined;
    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSettingsOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return function () {
      window.removeEventListener('keydown', onKey);
    };
  }, [settingsOpen]);

  // A menu only lives while it is being used: any press outside closes it.
  useEffect(function () {
    if (!menuOpen) return undefined;
    function onDown(event) {
      const node = menuAnchor.current;
      if (node && node.contains(event.target)) return;
      setMenuOpen(false);
    }
    window.addEventListener('pointerdown', onDown, true);
    return function () {
      window.removeEventListener('pointerdown', onDown, true);
    };
  }, [menuOpen]);

  function onHeadEnter(event) {
    strokeRef.current = { distance: 0, x: event.clientX, y: event.clientY, lastAt: Date.now() };
  }

  function onHeadMove(event) {
    const now = Date.now();
    const stroke = strokeRef.current;
    const dx = event.clientX - stroke.x;
    const dy = event.clientY - stroke.y;
    stroke.x = event.clientX;
    stroke.y = event.clientY;
    if (now - stroke.lastAt > 350) stroke.distance = 0;
    stroke.lastAt = now;
    stroke.distance += Math.abs(dx) + Math.abs(dy);
    if (pleasedRef.current) {
      keepPleasure();
      return;
    }
    if (stroke.distance > 140) {
      stroke.distance = 0;
      startPleasure();
    }
  }

  function onHeadLeave() {
    strokeRef.current.distance = 0;
  }

  function onPointerDown(event) {
    if (event.button !== 0) return;
    // First real gesture: browsers only allow audio after one.
    unlockAudio();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch (error) {
      /* older pointer implementations */
    }
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      from: posRef.current,
      moved: false,
    };
    setDragging(true);
    wake();
  }

  function onPointerMove(event) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
    setPos(clampPos({ left: drag.from.left + dx, top: drag.from.top + dy }, scaleRef.current));
  }

  function finishDrag(event) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (!drag.moved) {
      // Own double-click detection: pointer capture and the per-click card
      // fetch make the browser's `dblclick` unreliable here.
      const now = Date.now();
      const isDouble = now - lastClickRef.current < 400;
      lastClickRef.current = isDouble ? 0 : now;
      setMenuOpen(false);
      if (isDouble) {
        window.clearTimeout(cardRef.current);
        setCard(null);
        setSettingsOpen(true);
        return;
      }
      // A click is a request for the balance: hop silently, no chatter.
      burst(null);
      playSound('meow');
      refreshCard('balance', sessionIdRef.current);
      return;
    }
    const currentScale = scaleRef.current;
    const dropped = clampPos({
      left: drag.from.left + (event.clientX - drag.x),
      top: drag.from.top + (event.clientY - drag.y),
    }, currentScale);
    const settled = snapToEdge(dropped, currentScale);
    setPos(settled);
    writeStore(POS_KEY, settled);
  }

  function onKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      jump();
    }
  }

  function openMenu(event) {
    event.preventDefault();
    lastClickRef.current = 0;
    setSettingsOpen(false);
    setMenuOpen(true);
  }

  let className = 'dpp-cat';
  if (dragging) className += ' dpp-drag';
  if (sleeping) className += ' dpp-sleep';
  if (blink) className += ' dpp-blink';
  if (agent.running) className += ' dpp-busy';
  if (agent.waiting) className += ' dpp-waiting';
  if (celebrating) className += ' dpp-celebrate';
  if (pleased) className += ' dpp-pleased';

  return h(PetView, {
    t: tr,
    className: className,
    pos: pos,
    scale: scale,
    card: card,
    cardBox: cardBox,
    settings: settings,
    rates: rates,
    settingsOpen: settingsOpen,
    menuOpen: menuOpen,
    bubble: bubble,
    agent: agent,
    sleeping: sleeping,
    hearts: hearts,
    symbols: symbols,
    pleased: pleased,
    onHeadEnter: onHeadEnter,
    onHeadMove: onHeadMove,
    onHeadLeave: onHeadLeave,
    hop: hop,
    gaze: gaze,
    cardAnchor: cardAnchor,
    settingsAnchor: settingsAnchor,
    menuAnchor: menuAnchor,
    sessionIdRef: sessionIdRef,
    cardRef: cardRef,
    useSessions: props.useSessions,
    useSessionStatus: props.useSessionStatus,
    onAgent: onAgent,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onFinishDrag: finishDrag,
    onKeyDown: onKeyDown,
    onContextMenu: openMenu,
    onUpdateSettings: updateSettings,
    onApplySize: applySize,
    onRefreshCard: refreshCard,
    onOpenSettings: function () { setSettingsOpen(true); },
    onCloseSettings: function () { setSettingsOpen(false); },
    onCloseMenu: function () { setMenuOpen(false); },
    onCloseCard: function () {
      window.clearTimeout(cardRef.current);
      setCard(null);
    },
  });
}