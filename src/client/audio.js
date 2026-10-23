/**
 * Synthesized sound effects: no assets, no licensing. The AudioContext is
 * created lazily and only resumed from a user gesture, which browsers require
 * before any audio may start.
 */
import { SOUND_KEYS } from './constants.js';

const config = {
  volume: 0.6,
  sounds: { meow: true, typing: true, receipt: true, question: true, purr: true },
};

let ctx = null;
let master = null;
let typingTimer = 0;

function ensure() {
  if (!ctx) {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return null;
    ctx = new Audio();
    master = ctx.createGain();
    master.gain.value = config.volume;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') {
    const resumed = ctx.resume();
    if (resumed && typeof resumed.catch === 'function') resumed.catch(function () {});
  }
  return ctx;
}

/** Called on a real user gesture so the page is allowed to make sound. */
export function unlockAudio() {
  ensure();
}

export function configureAudio(settings) {
  if (!settings) return;
  const volume = Number(settings.volume);
  if (Number.isFinite(volume)) config.volume = Math.min(1, Math.max(0, volume));
  if (settings.sounds && typeof settings.sounds === 'object') {
    for (const key of SOUND_KEYS) {
      if (typeof settings.sounds[key] === 'boolean') config.sounds[key] = settings.sounds[key];
    }
  }
  if (master) master.gain.value = config.volume;
  if (config.sounds.purr === false) stopPurr();
}

function meow(ac, now) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();
  osc.type = 'sawtooth';
  filter.type = 'bandpass';
  filter.frequency.value = 1100;
  filter.Q.value = 3.5;
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(620, now + 0.22);
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.34);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.4);
}

let noiseBuffer = null;

function noiseFor(ac) {
  if (!noiseBuffer) {
    noiseBuffer = ac.createBuffer(1, Math.floor(ac.sampleRate), ac.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

/**
 * A muted mechanical key: a low thump (the switch bottoming out), a dark body
 * of noise, and a small band-passed transient on top that gives the "click"
 * without turning into a beep.
 */
function tick(ac, now) {
  const thump = ac.createOscillator();
  const thumpGain = ac.createGain();
  thump.type = 'sine';
  thump.frequency.setValueAtTime(88 + Math.random() * 12, now);
  thump.frequency.exponentialRampToValueAtTime(58, now + 0.06);
  thumpGain.gain.setValueAtTime(0.0001, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.1, now + 0.005);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
  thump.connect(thumpGain);
  thumpGain.connect(master);
  thump.start(now);
  thump.stop(now + 0.08);

  const body = ac.createBufferSource();
  body.buffer = noiseFor(ac);
  const bodyFilter = ac.createBiquadFilter();
  bodyFilter.type = 'lowpass';
  bodyFilter.frequency.value = 1100 + Math.random() * 300;
  bodyFilter.Q.value = 0.7;
  const bodyGain = ac.createGain();
  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.055, now + 0.003);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  body.connect(bodyFilter);
  bodyFilter.connect(bodyGain);
  bodyGain.connect(master);
  body.start(now, Math.random() * 0.5, 0.06);

  const click = ac.createBufferSource();
  click.buffer = noiseFor(ac);
  const clickFilter = ac.createBiquadFilter();
  clickFilter.type = 'bandpass';
  clickFilter.frequency.value = 2400 + Math.random() * 700;
  clickFilter.Q.value = 1.2;
  const clickGain = ac.createGain();
  clickGain.gain.setValueAtTime(0.0001, now);
  clickGain.gain.exponentialRampToValueAtTime(0.03, now + 0.002);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);
  click.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(master);
  click.start(now, Math.random() * 0.5, 0.03);
}

function ding(ac, now) {
  [880, 1320].forEach(function (frequency, index) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    const start = now + index * 0.06;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.16, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + 0.4);
  });
}

function blip(ac, now) {
  [660, 990].forEach(function (frequency, index) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'triangle';
    osc.frequency.value = frequency;
    const start = now + index * 0.09;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.12, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + 0.18);
  });
}

function whenReady(callback, retried) {
  const ac = ensure();
  if (!ac) return;
  if (ac.state === 'running') {
    callback(ac);
    return;
  }
  if (retried) return;
  // The first gesture resumes the context asynchronously; play after it settles
  // so the very first preview is not swallowed.
  const resumed = ac.resume();
  if (resumed && typeof resumed.then === 'function') {
    resumed.then(function () { whenReady(callback, true); }).catch(function () {});
  }
}

function emit(name) {
  whenReady(function (ac) {
    const now = ac.currentTime;
    if (name === 'meow') meow(ac, now);
    else if (name === 'typing') tick(ac, now);
    else if (name === 'receipt') ding(ac, now);
    else if (name === 'question') blip(ac, now);
  });
}

export function playSound(name) {
  if (config.sounds[name] === false) return;
  if (config.volume <= 0) return;
  emit(name);
}

/**
 * Settings preview: play the sound even when its checkbox is off, so the
 * switch can be auditioned before it is enabled. Typing plays a short burst,
 * the purr runs for 1.3 s.
 */
export function previewSound(name) {
  if (config.volume <= 0) return;
  if (name === 'typing') {
    emit('typing');
    window.setTimeout(function () { emit('typing'); }, 300);
    window.setTimeout(function () { emit('typing'); }, 600);
    return;
  }
  if (name === 'purr') {
    startPurr(true);
    window.setTimeout(stopPurr, 1300);
    return;
  }
  emit(name);
}

/**
 * Human typing is not a metronome: most keys land 150-400 ms apart, sometimes
 * two quick hits, and now and then the typist stops to think for a second.
 */
function typingDelay() {
  const roll = Math.random();
  if (roll < 0.1) return 650 + Math.random() * 900;
  if (roll < 0.22) return 70 + Math.random() * 45;
  return 150 + Math.random() * 250;
}

/** Loose keystroke track under the "working" animation. */
export function startTyping() {
  if (typingTimer) return;
  if (config.sounds.typing === false) return;
  const schedule = function () {
    playSound('typing');
    typingTimer = window.setTimeout(schedule, typingDelay());
  };
  typingTimer = window.setTimeout(schedule, 100 + Math.random() * 200);
}

export function stopTyping() {
  if (!typingTimer) return;
  window.clearTimeout(typingTimer);
  typingTimer = 0;
}

export function isAudioEnabled(name) {
  return config.sounds[name] !== false;
}

let purr = null;

/** Fade the purr out over ~0.25 s, then tear its nodes down. */
export function stopPurr() {
  if (!purr) return;
  const nodes = purr;
  purr = null;
  const ac = ctx;
  if (!ac) return;
  const now = ac.currentTime;
  try {
    nodes.gain.gain.cancelScheduledValues(now);
    nodes.gain.gain.setValueAtTime(Math.max(0.0001, nodes.gain.gain.value), now);
    nodes.gain.gain.linearRampToValueAtTime(0.0001, now + 0.25);
    nodes.source.stop(now + 0.3);
    nodes.lfo.stop(now + 0.3);
  } catch (error) {
    /* already stopped */
  }
}

/**
 * A purr is filtered noise amplitude-modulated at ~26 Hz, the way a real cat
 * vibrates. It loops until `stopPurr()`: the cat purrs while it is being
 * stroked and goes quiet shortly after the hand stops.
 */
export function startPurr(force) {
  if (purr) return;
  if (!force && config.sounds.purr === false) return;
  if (config.volume <= 0) return;
  if (!ensure()) return;
  if (ctx.state !== 'running') {
    const resumed = ctx.resume();
    if (resumed && typeof resumed.then === 'function') {
      resumed.then(function () { startPurr(force); }).catch(function () {});
    }
    return;
  }

  const ac = ctx;
  const now = ac.currentTime;
  const source = ac.createBufferSource();
  source.buffer = noiseFor(ac);
  source.loop = true;

  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 380;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.12);

  const lfo = ac.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 26;
  const depth = ac.createGain();
  depth.gain.value = 0.1;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  lfo.connect(depth);
  depth.connect(gain.gain);

  source.start(now);
  lfo.start(now);
  purr = { source, lfo, gain };
}
