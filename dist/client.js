var __ledgerKitty = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/client/index.js
  var index_exports = {};
  __export(index_exports, {
    createPlugin: () => createPlugin
  });

  // src/client/runtime.js
  var h = null;
  var useState = null;
  var useEffect = null;
  var useRef = null;
  var useCallback = null;
  var useLayoutEffect = null;
  var react = null;
  function initRuntime(require2) {
    react = require2("react");
    h = react.createElement;
    useState = react.useState;
    useEffect = react.useEffect;
    useRef = react.useRef;
    useCallback = react.useCallback;
    useLayoutEffect = react.useLayoutEffect || react.useEffect;
  }
  function getReact() {
    if (!react) throw new Error("ledger-kitty: runtime is not initialized");
    return react;
  }

  // src/client/i18n/en.js
  var en = {
    "aria": "Ledger Kitty",
    "hint": "Drag me \xB7 click for balance \xB7 double click for settings \xB7 right click for menu",
    "size": "Size {n}\xD7",
    "reaction.done": "Done! \u{1F389}",
    "reaction.wait": "They need your answer",
    "card.answer": "This answer",
    "card.session": "Session",
    "card.balance": "Balance",
    "card.tokens": "tok.",
    "card.unavailable": "\u2014",
    "card.saved": "Cache saving",
    "card.context": "Context",
    "peak.peak": "peak",
    "peak.off": "off-peak",
    "peak.in": "in {time}",
    "time.hm": "{h}h {m}m",
    "time.m": "{m}m",
    "card.close": "Close",
    "settings.title": "Settings",
    "settings.close": "Close",
    "settings.back": "Back",
    "settings.currency": "Currency",
    "settings.language": "Language",
    "settings.rate": "Rate",
    "settings.rate.offline": "live rate unavailable",
    "settings.size": "Size",
    "settings.sound": "Sounds",
    "settings.volume": "Volume",
    "settings.sound.hint": "Sound starts after the first click on the cat.",
    "sound.meow": "Meow",
    "sound.typing": "Typing",
    "sound.receipt": "Receipt",
    "sound.question": "Question",
    "sound.purr": "Purr",
    "sound.preview": "Play",
    "menu.balance": "Balance",
    "menu.settings": "Settings",
    "line.1": "Mrrp!",
    "line.2": "I am right here",
    "line.3": "Take a breather",
    "line.4": "Nice work \u2728",
    "line.5": "One more step?",
    "line.6": "Pet me \u{1F43E}",
    "error.no-account": "DeepSeek account is not connected",
    "error.signed-out": "Sign in to DeepSeek to see the balance",
    "error.offline": "No network \u2014 exchange rates are unavailable",
    "error.stale": "Exchange rates are stale",
    "error.error": "Could not fetch the balance",
    "error.generic": "Could not load the data",
    "error.unreachable": "The Host is not responding"
  };

  // src/client/i18n/ru.js
  var ru = {
    "aria": "\u041A\u043E\u0442\u043E\u0431\u0443\u0445",
    "hint": "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438 \u043C\u0435\u043D\u044F \xB7 \u043A\u043B\u0438\u043A \u2014 \u0431\u0430\u043B\u0430\u043D\u0441 \xB7 \u0434\u0432\u043E\u0439\u043D\u043E\u0439 \u043A\u043B\u0438\u043A \u2014 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \xB7 \u043F\u0440\u0430\u0432\u044B\u0439 \u043A\u043B\u0438\u043A \u2014 \u043C\u0435\u043D\u044E",
    "size": "\u0420\u0430\u0437\u043C\u0435\u0440 {n}\xD7",
    "reaction.done": "\u0413\u043E\u0442\u043E\u0432\u043E! \u{1F389}",
    "reaction.wait": "\u041D\u0443\u0436\u0435\u043D \u0442\u0432\u043E\u0439 \u043E\u0442\u0432\u0435\u0442",
    "card.answer": "\u042D\u0442\u043E\u0442 \u043E\u0442\u0432\u0435\u0442",
    "card.session": "\u0421\u0435\u0441\u0441\u0438\u044F",
    "card.balance": "\u0411\u0430\u043B\u0430\u043D\u0441",
    "card.tokens": "\u0442\u043E\u043A.",
    "card.unavailable": "\u2014",
    "card.saved": "\u041A\u044D\u0448-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044F",
    "card.context": "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
    "peak.peak": "\u043F\u0438\u043A",
    "peak.off": "\u043D\u0435\u043F\u0438\u043A",
    "peak.in": "\u0447\u0435\u0440\u0435\u0437 {time}",
    "time.hm": "{h} \u0447 {m} \u043C\u0438\u043D",
    "time.m": "{m} \u043C\u0438\u043D",
    "card.close": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
    "settings.title": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    "settings.close": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
    "settings.back": "\u041D\u0430\u0437\u0430\u0434",
    "settings.currency": "\u0412\u0430\u043B\u044E\u0442\u0430",
    "settings.language": "\u042F\u0437\u044B\u043A",
    "settings.rate": "\u041A\u0443\u0440\u0441",
    "settings.rate.offline": "\u0436\u0438\u0432\u043E\u0439 \u043A\u0443\u0440\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D",
    "settings.size": "\u0420\u0430\u0437\u043C\u0435\u0440",
    "settings.sound": "\u0417\u0432\u0443\u043A\u0438",
    "settings.volume": "\u0413\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C",
    "settings.sound.hint": "\u0417\u0432\u0443\u043A \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u043A\u043B\u0438\u043A\u0430 \u043F\u043E \u043A\u043E\u0442\u0443.",
    "sound.meow": "\u041C\u044F\u0443",
    "sound.typing": "\u041F\u0435\u0447\u0430\u0442\u044C",
    "sound.receipt": "\u0427\u0435\u043A",
    "sound.question": "\u0412\u043E\u043F\u0440\u043E\u0441",
    "sound.purr": "\u041C\u0443\u0440\u0447\u0430\u043D\u0438\u0435",
    "sound.preview": "\u041F\u0440\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C",
    "menu.balance": "\u0411\u0430\u043B\u0430\u043D\u0441",
    "menu.settings": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    "line.1": "\u041C\u0443\u0440\u0440!",
    "line.2": "\u042F \u0442\u0443\u0442, \u0440\u044F\u0434\u043E\u043C",
    "line.3": "\u041E\u0442\u0434\u043E\u0445\u043D\u0438 \u043D\u0435\u043C\u043D\u043E\u0433\u043E",
    "line.4": "\u0422\u044B \u043C\u043E\u043B\u043E\u0434\u0435\u0446 \u2728",
    "line.5": "\u0415\u0449\u0451 \u043E\u0434\u0438\u043D \u0448\u0430\u0433?",
    "line.6": "\u041F\u043E\u0433\u043B\u0430\u0434\u044C \u043C\u0435\u043D\u044F \u{1F43E}",
    "error.no-account": "\u0410\u043A\u043A\u0430\u0443\u043D\u0442 DeepSeek \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0451\u043D",
    "error.signed-out": "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 DeepSeek, \u0447\u0442\u043E\u0431\u044B \u0432\u0438\u0434\u0435\u0442\u044C \u0431\u0430\u043B\u0430\u043D\u0441",
    "error.offline": "\u041D\u0435\u0442 \u0441\u0435\u0442\u0438 \u2014 \u043A\u0443\u0440\u0441\u044B \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B",
    "error.stale": "\u041A\u0443\u0440\u0441\u044B \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u0438",
    "error.error": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0431\u0430\u043B\u0430\u043D\u0441",
    "error.generic": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435",
    "error.unreachable": "Host \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442"
  };

  // src/client/i18n/uk.js
  var uk = {
    "aria": "\u041A\u0438\u0448\u0435\u043D\u044C\u043A\u043E\u0432\u0438\u0439 \u043A\u0456\u0442",
    "hint": "\u041F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0438 \u043C\u0435\u043D\u0435 \xB7 \u043A\u043B\u0456\u043A \u2014 \u0431\u0430\u043B\u0430\u043D\u0441 \xB7 \u043F\u043E\u0434\u0432\u0456\u0439\u043D\u0438\u0439 \u043A\u043B\u0456\u043A \u2014 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \xB7 \u043F\u0440\u0430\u0432\u0438\u0439 \u043A\u043B\u0456\u043A \u2014 \u043C\u0435\u043D\u044E",
    "size": "\u0420\u043E\u0437\u043C\u0456\u0440 {n}\xD7",
    "reaction.done": "\u0413\u043E\u0442\u043E\u0432\u043E! \u{1F389}",
    "reaction.wait": "\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0442\u0432\u043E\u044F \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u044C",
    "card.answer": "\u0426\u044F \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u044C",
    "card.session": "\u0421\u0435\u0441\u0456\u044F",
    "card.balance": "\u0411\u0430\u043B\u0430\u043D\u0441",
    "card.tokens": "\u0442\u043E\u043A.",
    "card.unavailable": "\u2014",
    "card.saved": "\u0415\u043A\u043E\u043D\u043E\u043C\u0456\u044F \u043A\u0435\u0448\u0443",
    "card.context": "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
    "peak.peak": "\u043F\u0456\u043A",
    "peak.off": "\u043D\u0435\u043F\u0456\u043A",
    "peak.in": "\u0447\u0435\u0440\u0435\u0437 {time}",
    "time.hm": "{h} \u0433\u043E\u0434 {m} \u0445\u0432",
    "time.m": "{m} \u0445\u0432",
    "card.close": "\u0417\u0430\u043A\u0440\u0438\u0442\u0438",
    "settings.title": "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F",
    "settings.close": "\u0417\u0430\u043A\u0440\u0438\u0442\u0438",
    "settings.back": "\u041D\u0430\u0437\u0430\u0434",
    "settings.currency": "\u0412\u0430\u043B\u044E\u0442\u0430",
    "settings.language": "\u041C\u043E\u0432\u0430",
    "settings.rate": "\u041A\u0443\u0440\u0441",
    "settings.rate.offline": "\u0436\u0438\u0432\u0438\u0439 \u043A\u0443\u0440\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439",
    "settings.size": "\u0420\u043E\u0437\u043C\u0456\u0440",
    "settings.sound": "\u0417\u0432\u0443\u043A\u0438",
    "settings.volume": "\u0413\u0443\u0447\u043D\u0456\u0441\u0442\u044C",
    "settings.sound.hint": "\u0417\u0432\u0443\u043A \u0443\u0432\u0456\u043C\u043A\u043D\u0435\u0442\u044C\u0441\u044F \u043F\u0456\u0441\u043B\u044F \u043F\u0435\u0440\u0448\u043E\u0433\u043E \u043A\u043B\u0456\u043A\u0443 \u043F\u043E \u043A\u043E\u0442\u0443.",
    "sound.meow": "\u041C\u044F\u0443",
    "sound.typing": "\u0414\u0440\u0443\u043A",
    "sound.receipt": "\u0427\u0435\u043A",
    "sound.question": "\u041F\u0438\u0442\u0430\u043D\u043D\u044F",
    "sound.purr": "\u041C\u0443\u0440\u0447\u0430\u043D\u043D\u044F",
    "sound.preview": "\u041F\u0440\u043E\u0441\u043B\u0443\u0445\u0430\u0442\u0438",
    "menu.balance": "\u0411\u0430\u043B\u0430\u043D\u0441",
    "menu.settings": "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F",
    "line.1": "\u041C\u0443\u0440\u0440!",
    "line.2": "\u042F \u0442\u0443\u0442, \u043F\u043E\u0440\u0443\u0447",
    "line.3": "\u0412\u0456\u0434\u043F\u043E\u0447\u0438\u043D\u044C \u0442\u0440\u043E\u0445\u0438",
    "line.4": "\u0422\u0438 \u043C\u043E\u043B\u043E\u0434\u0435\u0446\u044C \u2728",
    "line.5": "\u0429\u0435 \u043E\u0434\u0438\u043D \u043A\u0440\u043E\u043A?",
    "line.6": "\u041F\u043E\u0433\u043B\u0430\u0434\u044C \u043C\u0435\u043D\u0435 \u{1F43E}",
    "error.no-account": "\u0410\u043A\u0430\u0443\u043D\u0442 DeepSeek \u043D\u0435 \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
    "error.signed-out": "\u0423\u0432\u0456\u0439\u0434\u0456\u0442\u044C \u0432 \u0430\u043A\u0430\u0443\u043D\u0442 DeepSeek, \u0449\u043E\u0431 \u0431\u0430\u0447\u0438\u0442\u0438 \u0431\u0430\u043B\u0430\u043D\u0441",
    "error.offline": "\u041D\u0435\u043C\u0430\u0454 \u043C\u0435\u0440\u0435\u0436\u0456 \u2014 \u043A\u0443\u0440\u0441\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0456",
    "error.stale": "\u041A\u0443\u0440\u0441\u0438 \u0437\u0430\u0441\u0442\u0430\u0440\u0456\u043B\u0438",
    "error.error": "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0431\u0430\u043B\u0430\u043D\u0441",
    "error.generic": "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0434\u0430\u043D\u0456",
    "error.unreachable": "Host \u043D\u0435 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454"
  };

  // src/client/i18n/index.js
  var STRINGS = { en, ru, uk };

  // src/client/constants.js
  var PET_W = 120;
  var PET_H = 140;
  var SIZES = [0.5, 1, 1.25, 1.5];
  var MARGIN = 8;
  var SNAP_ZONE = 54;
  var FLOOR_MARGIN = 4;
  var SLEEP_AFTER_MS = 6e4;
  var POS_KEY = "dsh-ledger-kitty:pos:v2";
  var SIZE_KEY = "dsh-ledger-kitty:size";
  var SETTINGS_KEY = "dsh-ledger-kitty:settings";
  var POPULAR_CURRENCIES = ["CNY", "USD", "EUR", "RUB", "KZT", "UAH", "GBP", "JPY", "KRW", "TRY", "INR", "BRL"];
  var SOUND_KEYS = ["meow", "typing", "receipt", "question", "purr"];
  var SYMBOLS = {
    CNY: "\xA5",
    USD: "$",
    EUR: "\u20AC",
    RUB: "\u20BD",
    KZT: "\u20B8",
    UAH: "\u20B4",
    GBP: "\xA3",
    JPY: "JP\xA5",
    KRW: "\u20A9",
    TRY: "\u20BA",
    INR: "\u20B9",
    BRL: "R$",
    CAD: "C$",
    AUD: "A$",
    CHF: "CHF",
    PLN: "z\u0142",
    CZK: "K\u010D",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    SGD: "S$",
    HKD: "HK$",
    NZD: "NZ$",
    THB: "\u0E3F",
    VND: "\u20AB",
    IDR: "Rp",
    MYR: "RM",
    PHP: "\u20B1",
    ILS: "\u20AA",
    AED: "AED",
    SAR: "SAR",
    ZAR: "R",
    MXN: "MX$",
    ARS: "AR$",
    CLP: "CL$",
    COP: "CO$",
    PEN: "S/",
    EGP: "E\xA3",
    NGN: "\u20A6",
    PKR: "\u20A8",
    BDT: "\u09F3",
    LKR: "Rs",
    NPR: "Rs",
    TWD: "NT$",
    HUF: "Ft",
    RON: "lei",
    BGN: "lv",
    HRK: "kn",
    ISK: "kr"
  };

  // src/client/store.js
  function readStore(key, fallback) {
    try {
      let raw = window.localStorage.getItem(key);
      if (!raw) {
        const legacyKey = key.replace("dsh-ledger-kitty:", "dsh-pocket-pet:");
        if (legacyKey !== key) raw = window.localStorage.getItem(legacyKey);
      }
      if (!raw) return fallback;
      const value = JSON.parse(raw);
      return value == null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }
  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
  }
  function normalizeSize(value) {
    return SIZES.indexOf(value) === -1 ? 1 : value;
  }
  var LANGS = ["en", "ru", "uk"];
  function normalizeSettings(value, fallbackLang) {
    const next = {
      currency: "CNY",
      language: LANGS.indexOf(fallbackLang) === -1 ? "en" : fallbackLang,
      volume: 0.6,
      sounds: { meow: true, typing: true, receipt: true, question: true, purr: true }
    };
    if (value && typeof value === "object") {
      if (typeof value.currency === "string" && /^[A-Z]{3}$/.test(value.currency)) {
        next.currency = value.currency;
      }
      if (LANGS.indexOf(value.language) !== -1) next.language = value.language;
      const volume = Number(value.volume);
      if (Number.isFinite(volume) && volume >= 0 && volume <= 1) next.volume = volume;
      if (value.sounds && typeof value.sounds === "object") {
        for (const key of SOUND_KEYS) {
          if (typeof value.sounds[key] === "boolean") next.sounds[key] = value.sounds[key];
        }
      }
    }
    return next;
  }

  // src/client/styles.js
  var CSS = [
    ".dpp-root{position:fixed;inset:0;pointer-events:none;z-index:2147482000}",
    ".dpp-cat{position:absolute;pointer-events:auto;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;",
    "transition:left 300ms cubic-bezier(.34,1.4,.64,1),top 300ms cubic-bezier(.34,1.4,.64,1);will-change:left,top}",
    ".dpp-cat.dpp-drag{transition:none;cursor:grabbing}",
    ".dpp-cat:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:6px;border-radius:28px}",
    ".dpp-idle{width:100%;height:100%;transform-origin:50% 100%;animation:dpp-idle 4.2s ease-in-out infinite}",
    ".dpp-hop{width:100%;height:100%;transform-origin:50% 92%}",
    ".dpp-jump{animation:dpp-hop 620ms cubic-bezier(.28,1.4,.5,1)}",
    ".dpp-svg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 3px 4px rgba(24,36,58,.10))}",
    ".dpp-tail{transform-box:fill-box;transform-origin:12% 82%;animation:dpp-sway 3.2s ease-in-out infinite}",
    ".dpp-body-g{transform-box:fill-box;transform-origin:50% 100%;animation:dpp-breathe 4s ease-in-out infinite}",
    ".dpp-ear-l{transform-box:fill-box;transform-origin:78% 96%;animation:dpp-twitch-l 7.4s ease-in-out infinite}",
    ".dpp-ear-r{transform-box:fill-box;transform-origin:22% 96%;animation:dpp-twitch-r 8.6s ease-in-out -2.1s infinite}",
    ".dpp-shadow{transform-box:fill-box;transform-origin:50% 50%}",
    ".dpp-eyes-open,.dpp-eyes-closed{transition:opacity 90ms ease}",
    ".dpp-eyes-closed{opacity:0}",
    ".dpp-sleep .dpp-eyes-open,.dpp-blink .dpp-eyes-open{opacity:0}",
    ".dpp-sleep .dpp-eyes-closed,.dpp-blink .dpp-eyes-closed{opacity:1}",
    ".dpp-pleased .dpp-eyes-open{opacity:0}",
    ".dpp-pleased .dpp-eyes-closed{opacity:1}",
    ".dpp-pleased .dpp-tail{animation:dpp-wag .5s ease-in-out infinite}",
    ".dpp-pleased .dpp-idle{animation:dpp-pleased 1.2s ease-in-out infinite}",
    ".dpp-head{position:absolute;left:22%;top:16%;width:56%;height:46%;pointer-events:auto;cursor:inherit}",
    ".dpp-bubble{position:absolute;left:50%;bottom:calc(100% - 4px);transform:translateX(-50%);",
    "max-width:190px;min-width:64px;padding:7px 10px;border-radius:12px;background:var(--dsw-alias-bg-overlay);",
    "color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);",
    'box-shadow:0 6px 18px rgba(0,0,0,.18);font:500 12px/1.35 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;',
    "text-align:center;white-space:pre-wrap;word-break:break-word;pointer-events:none;animation:dpp-pop 220ms ease-out}",
    '.dpp-bubble::after{content:"";position:absolute;left:50%;top:100%;width:9px;height:9px;background:inherit;',
    "border-right:1px solid var(--dsw-alias-border-l1);border-bottom:1px solid var(--dsw-alias-border-l1);",
    "transform:translate(-50%,-55%) rotate(45deg)}",
    ".dpp-heart{position:absolute;left:50%;bottom:calc(100% - 18px);color:#F26D7D;font-size:16px;line-height:1;",
    "pointer-events:none;animation:dpp-heart 1.4s ease-out forwards}",
    ".dpp-symbol{position:absolute;left:50%;bottom:calc(100% - 34px);font:600 13px/1 ui-monospace,SFMono-Regular,Menlo,monospace;",
    "color:var(--dsw-alias-label-secondary);opacity:0;pointer-events:none;animation:dpp-symbol 1.5s ease-out forwards}",
    ".dpp-zzz{position:absolute;right:4%;top:6%;font:600 12px/1 ui-sans-serif,system-ui;",
    "color:var(--dsw-alias-label-secondary);pointer-events:none;animation:dpp-zzz 2.4s ease-in-out infinite}",
    ".dpp-busy .dpp-idle{animation-duration:1.15s}",
    ".dpp-busy .dpp-tail{animation-duration:.9s}",
    ".dpp-busy .dpp-leg-fl{transform-box:fill-box;transform-origin:50% 8%;animation:dpp-tap-l .64s ease-in-out infinite}",
    ".dpp-busy .dpp-leg-fr{transform-box:fill-box;transform-origin:50% 8%;animation:dpp-tap-r .64s ease-in-out infinite;",
    "animation-delay:.32s}",
    ".dpp-waiting .dpp-leg-fr{transform-box:fill-box;transform-origin:50% 6%;animation:dpp-raise 1.1s ease-in-out infinite}",
    ".dpp-waiting .dpp-ear-l{animation:none;transform:rotate(-5deg)}",
    ".dpp-waiting .dpp-ear-r{animation:none;transform:rotate(5deg)}",
    ".dpp-celebrate .dpp-tail{animation:dpp-wag .32s ease-in-out 5}",
    ".dpp-alert{position:absolute;top:0;right:12%;width:20px;height:20px;border-radius:50%;",
    "background:var(--dsw-alias-state-warn-primary);color:#FFFFFF;font:700 13px/20px ui-sans-serif,system-ui;",
    "text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.25);pointer-events:none;animation:dpp-alert 1s ease-in-out infinite}",
    ".dpp-fallback{position:fixed;right:16px;bottom:16px;max-width:300px;padding:10px 12px;border-radius:12px;",
    "background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);",
    "border:1px solid var(--dsw-alias-state-error-primary);font:12px/1.4 ui-sans-serif,system-ui;",
    "pointer-events:none;z-index:2147483000}",
    ".dpp-card{position:absolute;left:50%;bottom:calc(100% + 6px);min-width:150px;max-width:210px;",
    "padding:8px 22px 8px 10px;border-radius:12px;background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);",
    "border:1px solid var(--dsw-alias-border-l1);box-shadow:0 8px 22px rgba(0,0,0,.2);",
    'font:11.5px/1.32 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;pointer-events:auto;animation:dpp-fade 160ms ease-out}',
    ".dpp-card-close{position:absolute;top:3px;right:3px;width:16px;height:16px;padding:0;border:0;border-radius:5px;",
    "background:transparent;color:var(--dsw-alias-label-secondary);font:12px/16px ui-sans-serif,system-ui;cursor:pointer}",
    ".dpp-card-close:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}",
    ".dpp-settings-quote{margin-top:5px;font-size:10.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}",
    ".dpp-select{width:100%;padding:4px 6px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);",
    "background:var(--dsw-alias-bg-layer-1);color:inherit;font:11px/1.2 ui-sans-serif,system-ui;}",
    ".dpp-card-tail{position:absolute;top:100%;width:9px;height:9px;background:inherit;",
    "border-right:1px solid var(--dsw-alias-border-l1);border-bottom:1px solid var(--dsw-alias-border-l1);",
    "transform:translate(-50%,-55%) rotate(45deg)}",
    ".dpp-settings{position:absolute;left:50%;bottom:calc(100% + 6px);transform:translateX(-50%);width:212px;",
    "max-height:calc(100vh - 40px);overflow:auto;padding:10px 11px;border-radius:12px;background:var(--dsw-alias-bg-overlay);",
    "color:var(--dsw-alias-label-primary);",
    "border:1px solid var(--dsw-alias-border-l1);box-shadow:0 10px 26px rgba(0,0,0,.24);",
    'font:12px/1.35 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;pointer-events:auto;z-index:2;',
    "user-select:text;-webkit-user-select:text}",
    ".dpp-settings-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px}",
    ".dpp-settings-title{font-size:12px;font-weight:600}",
    ".dpp-settings-label{margin:8px 0 4px;font-size:10px;letter-spacing:.05em;text-transform:uppercase;",
    "color:var(--dsw-alias-label-secondary)}",
    ".dpp-seg{display:flex;gap:6px}",
    ".dpp-seg-btn{flex:1;appearance:none;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);",
    "color:inherit;border-radius:8px;padding:4px 0;font:11px/1.2 ui-sans-serif,system-ui;cursor:pointer}",
    ".dpp-seg-btn:hover{border-color:var(--dsw-alias-brand-primary)}",
    ".dpp-seg-on{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary)}",
    ".dpp-settings-rate{display:flex;align-items:center;gap:6px;font-variant-numeric:tabular-nums}",
    ".dpp-settings-rate input{width:68px;padding:3px 6px;border-radius:7px;border:1px solid var(--dsw-alias-border-l1);",
    "background:var(--dsw-alias-bg-layer-1);color:inherit;font:inherit}",
    ".dpp-back{appearance:none;border:none;background:transparent;color:inherit;cursor:pointer;font-size:14px;",
    "line-height:1;padding:0 4px}",
    ".dpp-settings-link{display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:10px;",
    "padding:6px 8px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);",
    "color:inherit;font:11.5px/1.2 ui-sans-serif,system-ui;cursor:pointer}",
    ".dpp-settings-link:hover{border-color:var(--dsw-alias-brand-primary)}",
    ".dpp-settings-link-arrow{color:var(--dsw-alias-label-secondary)}",
    ".dpp-sound-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:2px 0;",
    "font-size:11.5px}",
    ".dpp-sound-toggle{display:flex;align-items:center;justify-content:space-between;gap:8px;flex:1;cursor:pointer}",
    ".dpp-play{appearance:none;width:20px;height:20px;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);",
    "background:var(--dsw-alias-bg-layer-1);color:inherit;font-size:9px;line-height:1;cursor:pointer;padding:0;",
    "display:flex;align-items:center;justify-content:center}",
    ".dpp-play:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}",
    ".dpp-sound-row input{accent-color:var(--dsw-alias-brand-primary);width:14px;height:14px;margin:0;cursor:pointer}",
    ".dpp-volume{display:flex;align-items:center;gap:8px}",
    ".dpp-volume input{flex:1;accent-color:var(--dsw-alias-brand-primary)}",
    ".dpp-volume span{min-width:34px;text-align:right;font-size:11px;color:var(--dsw-alias-label-secondary);",
    "font-variant-numeric:tabular-nums}",
    ".dpp-close{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:inherit;",
    "width:22px;height:22px;border-radius:7px;cursor:pointer;font-size:14px;line-height:1;padding:0}",
    ".dpp-close:hover{border-color:var(--dsw-alias-brand-primary)}",
    ".dpp-menu{position:absolute;left:50%;bottom:calc(100% + 6px);display:flex;flex-direction:column;min-width:124px;",
    "padding:4px;border-radius:10px;background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);",
    "border:1px solid var(--dsw-alias-border-l1);box-shadow:0 8px 22px rgba(0,0,0,.2);pointer-events:auto;z-index:2}",
    ".dpp-menu-item{appearance:none;border:0;background:transparent;color:inherit;text-align:left;",
    "padding:6px 8px;border-radius:7px;font:12px/1.2 ui-sans-serif,system-ui;cursor:pointer}",
    ".dpp-menu-item:hover{background:var(--dsw-alias-bg-layer-1)}",
    ".dpp-card-label{font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--dsw-alias-label-secondary)}",
    ".dpp-card-gap{margin-top:7px}",
    ".dpp-card-row{display:flex;justify-content:space-between;gap:12px;margin-top:3px;font-variant-numeric:tabular-nums}",
    ".dpp-card-sum{font-weight:600}",
    ".dpp-card-sep{height:1px;background:var(--dsw-alias-border-l1);margin:8px 0 6px}",
    ".dpp-card-total{display:flex;justify-content:space-between;gap:12px;font-weight:600;font-variant-numeric:tabular-nums}",
    ".dpp-card-value{margin-top:3px;font-size:16px;font-weight:600;font-variant-numeric:tabular-nums}",
    ".dpp-card-saved{font-weight:600;color:var(--dsw-alias-state-success-primary)}",
    ".dpp-card-foot{margin-top:6px;font-size:10.5px;color:var(--dsw-alias-label-secondary)}",
    ".dpp-card-note{margin-top:4px;font-size:10.5px;line-height:1.35;color:var(--dsw-alias-label-secondary)}",
    "@keyframes dpp-idle{0%,100%{transform:scale(1,1)}50%{transform:scale(1.01,.988)}}",
    "@keyframes dpp-hop{0%{transform:translateY(0) scale(1,1)}18%{transform:translateY(2px) scale(1.08,.9)}",
    "45%{transform:translateY(-22px) scale(.96,1.06)}70%{transform:translateY(0) scale(1.1,.88)}",
    "85%{transform:translateY(-4px) scale(1,1)}100%{transform:translateY(0) scale(1,1)}}",
    "@keyframes dpp-breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,.985)}}",
    "@keyframes dpp-sway{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(7deg)}}",
    "@keyframes dpp-twitch-l{0%,84%,100%{transform:rotate(0)}88%{transform:rotate(-10deg)}92%{transform:rotate(4deg)}}",
    "@keyframes dpp-twitch-r{0%,80%,100%{transform:rotate(0)}84%{transform:rotate(10deg)}88%{transform:rotate(-4deg)}}",
    "@keyframes dpp-heart{0%{opacity:0;transform:translate(-50%,0) scale(.6)}20%{opacity:1}",
    "100%{opacity:0;transform:translate(-50%,-46px) scale(1.1)}}",
    "@keyframes dpp-zzz{0%,100%{opacity:.35;transform:translateY(0)}50%{opacity:.85;transform:translateY(-3px)}}",
    "@keyframes dpp-tap-l{0%,100%{transform:translate(0,0) rotate(0)}",
    "30%,50%{transform:translate(-2px,-6px) rotate(18deg)}72%{transform:translate(0,1px) rotate(2deg)}}",
    "@keyframes dpp-tap-r{0%,100%{transform:translate(0,0) rotate(0)}",
    "30%,50%{transform:translate(2px,-6px) rotate(-18deg)}72%{transform:translate(0,1px) rotate(-2deg)}}",
    "@keyframes dpp-symbol{0%{opacity:0;transform:translate(-50%,2px) scale(.7)}20%{opacity:.9}",
    "100%{opacity:0;transform:translate(-50%,-44px) scale(1.05) rotate(14deg)}}",
    "@keyframes dpp-raise{0%,100%{transform:rotate(-18deg) translateY(-2px)}50%{transform:rotate(-30deg) translateY(-4px)}}",
    "@keyframes dpp-wag{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(14deg)}}",
    "@keyframes dpp-pleased{0%,100%{transform:rotate(0) scale(1,1)}50%{transform:rotate(1.2deg) scale(1.02,.985)}}",
    "@keyframes dpp-alert{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-3px) scale(1.06)}}",
    "@keyframes dpp-pop{0%{opacity:0;transform:translate(-50%,6px) scale(.92)}100%{opacity:1;transform:translate(-50%,0) scale(1)}}",
    "@keyframes dpp-fade{from{opacity:0}to{opacity:1}}",
    "@media (prefers-reduced-motion: reduce){",
    ".dpp-idle,.dpp-tail,.dpp-body-g,.dpp-ear-l,.dpp-ear-r,.dpp-shadow,.dpp-zzz{animation:none}",
    ".dpp-busy .dpp-leg-fl,.dpp-busy .dpp-leg-fr,.dpp-waiting .dpp-leg-fr,.dpp-celebrate .dpp-tail,.dpp-alert,.dpp-symbol{animation:none}",
    ".dpp-jump{animation-duration:1ms}.dpp-heart{animation-duration:1ms}}"
  ].join("");

  // src/client/ui/boundaries.js
  function recordFailure(scope, error) {
    const message = String(error && error.message || error).slice(0, 300);
    writeStore("dsh-ledger-kitty:error", { scope, message, at: Date.now() });
    if (window.console && window.console.error) window.console.error("[dsh-ledger-kitty] " + scope, error);
    return message;
  }
  var cached = null;
  function getBoundaries() {
    if (cached) return cached;
    const React = getReact();
    class ReactionBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { failed: false };
      }
      static getDerivedStateFromError() {
        return { failed: true };
      }
      componentDidCatch(error) {
        recordFailure("reactions", error);
      }
      render() {
        return this.state.failed ? null : this.props.children;
      }
    }
    class PetBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { failed: false, message: "" };
      }
      static getDerivedStateFromError(error) {
        return { failed: true, message: recordFailure("pet", error) };
      }
      componentDidCatch(error) {
        recordFailure("pet", error);
      }
      render() {
        if (this.state.failed) {
          return h(
            "div",
            { className: "dpp-root" },
            h("style", null, CSS),
            h("div", { className: "dpp-fallback" }, "\u043A\u043E\u0442\u0451\u043D\u043E\u043A \u043D\u0435 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F: " + this.state.message)
          );
        }
        return this.props.children;
      }
    }
    cached = { ReactionBoundary, PetBoundary };
    return cached;
  }

  // src/client/geometry.js
  function clampPos(pos, scale) {
    const width = PET_W * scale;
    const height = PET_H * scale;
    const maxLeft = Math.max(MARGIN, window.innerWidth - width - MARGIN);
    const maxTop = Math.max(MARGIN, window.innerHeight - height - MARGIN);
    const left = Number(pos && pos.left);
    const top = Number(pos && pos.top);
    return {
      left: Math.min(Math.max(MARGIN, Number.isFinite(left) ? left : maxLeft), maxLeft),
      top: Math.min(Math.max(MARGIN, Number.isFinite(top) ? top : maxTop), maxTop)
    };
  }
  function defaultPos(scale) {
    return {
      left: Math.max(MARGIN, window.innerWidth - PET_W * scale - 16),
      top: Math.max(MARGIN, window.innerHeight - PET_H * scale - FLOOR_MARGIN)
    };
  }
  function snapToEdge(pos, scale) {
    const width = PET_W * scale;
    const height = PET_H * scale;
    let left = pos.left;
    let top = pos.top;
    const rightGap = window.innerWidth - (left + width);
    if (left <= SNAP_ZONE) left = MARGIN + 2;
    else if (rightGap <= SNAP_ZONE) left = Math.max(MARGIN, window.innerWidth - width - MARGIN - 2);
    if (window.innerHeight - (top + height) <= SNAP_ZONE) {
      top = Math.max(MARGIN, window.innerHeight - height - FLOOR_MARGIN);
    }
    return { left, top };
  }

  // src/client/format.js
  function cnyToUnit(amountCny, unit, rates) {
    if (amountCny == null || !Number.isFinite(amountCny)) return null;
    if (unit === "CNY") return amountCny;
    if (rates && Number.isFinite(rates[unit])) return amountCny * rates[unit];
    return null;
  }
  function balanceToCny(balance, rates) {
    if (!balance) return null;
    if (balance.CNY != null) return balance.CNY;
    if (balance.USD != null && rates && Number.isFinite(rates.USD) && rates.USD > 0) {
      return balance.USD / rates.USD;
    }
    return null;
  }
  function currencySymbol(unit) {
    return SYMBOLS[unit] || null;
  }
  function currencyLabel(code) {
    const symbol = currencySymbol(code);
    return symbol ? symbol + " " + code : code;
  }
  function currencyOptions(rates, current) {
    const codes = [];
    for (const code of POPULAR_CURRENCIES) codes.push(code);
    if (rates) {
      const rest = Object.keys(rates).filter(function(code) {
        return /^[A-Z]{3}$/.test(code) && codes.indexOf(code) === -1;
      }).sort();
      for (const code of rest) codes.push(code);
    }
    if (current && codes.indexOf(current) === -1) codes.push(current);
    return codes;
  }
  function formatTokens(value) {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return "0";
    if (n >= 1e6) return (Math.round(n / 1e4) / 100).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (n >= 1e4) return Math.round(n / 1e3) + "k";
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  function formatMoney(value, unit) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "\u2014";
    const digits = Math.abs(n) >= 1 ? 2 : Math.abs(n) >= 0.01 ? 3 : 4;
    const text = n === 0 ? "0.00" : n.toFixed(digits);
    const symbol = currencySymbol(unit);
    return symbol ? symbol + text : text + " " + unit;
  }
  async function fetchState(sessionId) {
    const query = sessionId ? "?session=" + encodeURIComponent(sessionId) : "";
    const response = await window.fetch("/dsh-ledger-kitty/state" + query, {
      headers: { accept: "application/json" },
      cache: "no-store"
    });
    if (!response.ok) throw new Error("state " + response.status);
    return response.json();
  }

  // src/client/audio.js
  var config = {
    volume: 0.6,
    sounds: { meow: true, typing: true, receipt: true, question: true, purr: true }
  };
  var ctx = null;
  var master = null;
  var typingTimer = 0;
  function ensure() {
    if (!ctx) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return null;
      ctx = new Audio();
      master = ctx.createGain();
      master.gain.value = config.volume;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") {
      const resumed = ctx.resume();
      if (resumed && typeof resumed.catch === "function") resumed.catch(function() {
      });
    }
    return ctx;
  }
  function unlockAudio() {
    ensure();
  }
  function configureAudio(settings) {
    if (!settings) return;
    const volume = Number(settings.volume);
    if (Number.isFinite(volume)) config.volume = Math.min(1, Math.max(0, volume));
    if (settings.sounds && typeof settings.sounds === "object") {
      for (const key of SOUND_KEYS) {
        if (typeof settings.sounds[key] === "boolean") config.sounds[key] = settings.sounds[key];
      }
    }
    if (master) master.gain.value = config.volume;
    if (config.sounds.purr === false) stopPurr();
  }
  function meow(ac, now) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const filter = ac.createBiquadFilter();
    osc.type = "sawtooth";
    filter.type = "bandpass";
    filter.frequency.value = 1100;
    filter.Q.value = 3.5;
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.34);
    gain.gain.setValueAtTime(1e-4, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.38);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.4);
  }
  var noiseBuffer = null;
  function noiseFor(ac) {
    if (!noiseBuffer) {
      noiseBuffer = ac.createBuffer(1, Math.floor(ac.sampleRate), ac.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  }
  function tick(ac, now) {
    const thump = ac.createOscillator();
    const thumpGain = ac.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(88 + Math.random() * 12, now);
    thump.frequency.exponentialRampToValueAtTime(58, now + 0.06);
    thumpGain.gain.setValueAtTime(1e-4, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.1, now + 5e-3);
    thumpGain.gain.exponentialRampToValueAtTime(1e-4, now + 0.075);
    thump.connect(thumpGain);
    thumpGain.connect(master);
    thump.start(now);
    thump.stop(now + 0.08);
    const body = ac.createBufferSource();
    body.buffer = noiseFor(ac);
    const bodyFilter = ac.createBiquadFilter();
    bodyFilter.type = "lowpass";
    bodyFilter.frequency.value = 1100 + Math.random() * 300;
    bodyFilter.Q.value = 0.7;
    const bodyGain = ac.createGain();
    bodyGain.gain.setValueAtTime(1e-4, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.055, now + 3e-3);
    bodyGain.gain.exponentialRampToValueAtTime(1e-4, now + 0.045);
    body.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(master);
    body.start(now, Math.random() * 0.5, 0.06);
    const click = ac.createBufferSource();
    click.buffer = noiseFor(ac);
    const clickFilter = ac.createBiquadFilter();
    clickFilter.type = "bandpass";
    clickFilter.frequency.value = 2400 + Math.random() * 700;
    clickFilter.Q.value = 1.2;
    const clickGain = ac.createGain();
    clickGain.gain.setValueAtTime(1e-4, now);
    clickGain.gain.exponentialRampToValueAtTime(0.03, now + 2e-3);
    clickGain.gain.exponentialRampToValueAtTime(1e-4, now + 0.022);
    click.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(master);
    click.start(now, Math.random() * 0.5, 0.03);
  }
  function ding(ac, now) {
    [880, 1320].forEach(function(frequency, index) {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      const start = now + index * 0.06;
      gain.gain.setValueAtTime(1e-4, start);
      gain.gain.exponentialRampToValueAtTime(0.16, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(1e-4, start + 0.35);
      osc.connect(gain);
      gain.connect(master);
      osc.start(start);
      osc.stop(start + 0.4);
    });
  }
  function blip(ac, now) {
    [660, 990].forEach(function(frequency, index) {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = "triangle";
      osc.frequency.value = frequency;
      const start = now + index * 0.09;
      gain.gain.setValueAtTime(1e-4, start);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 8e-3);
      gain.gain.exponentialRampToValueAtTime(1e-4, start + 0.16);
      osc.connect(gain);
      gain.connect(master);
      osc.start(start);
      osc.stop(start + 0.18);
    });
  }
  function whenReady(callback, retried) {
    const ac = ensure();
    if (!ac) return;
    if (ac.state === "running") {
      callback(ac);
      return;
    }
    if (retried) return;
    const resumed = ac.resume();
    if (resumed && typeof resumed.then === "function") {
      resumed.then(function() {
        whenReady(callback, true);
      }).catch(function() {
      });
    }
  }
  function emit(name) {
    whenReady(function(ac) {
      const now = ac.currentTime;
      if (name === "meow") meow(ac, now);
      else if (name === "typing") tick(ac, now);
      else if (name === "receipt") ding(ac, now);
      else if (name === "question") blip(ac, now);
    });
  }
  function playSound(name) {
    if (config.sounds[name] === false) return;
    if (config.volume <= 0) return;
    emit(name);
  }
  function previewSound(name) {
    if (config.volume <= 0) return;
    if (name === "typing") {
      emit("typing");
      window.setTimeout(function() {
        emit("typing");
      }, 300);
      window.setTimeout(function() {
        emit("typing");
      }, 600);
      return;
    }
    if (name === "purr") {
      startPurr(true);
      window.setTimeout(stopPurr, 1300);
      return;
    }
    emit(name);
  }
  function typingDelay() {
    const roll = Math.random();
    if (roll < 0.1) return 650 + Math.random() * 900;
    if (roll < 0.22) return 70 + Math.random() * 45;
    return 150 + Math.random() * 250;
  }
  function startTyping() {
    if (typingTimer) return;
    if (config.sounds.typing === false) return;
    const schedule = function() {
      playSound("typing");
      typingTimer = window.setTimeout(schedule, typingDelay());
    };
    typingTimer = window.setTimeout(schedule, 100 + Math.random() * 200);
  }
  function stopTyping() {
    if (!typingTimer) return;
    window.clearTimeout(typingTimer);
    typingTimer = 0;
  }
  var purr = null;
  function stopPurr() {
    if (!purr) return;
    const nodes = purr;
    purr = null;
    const ac = ctx;
    if (!ac) return;
    const now = ac.currentTime;
    try {
      nodes.gain.gain.cancelScheduledValues(now);
      nodes.gain.gain.setValueAtTime(Math.max(1e-4, nodes.gain.gain.value), now);
      nodes.gain.gain.linearRampToValueAtTime(1e-4, now + 0.25);
      nodes.source.stop(now + 0.3);
      nodes.lfo.stop(now + 0.3);
    } catch (error) {
    }
  }
  function startPurr(force) {
    if (purr) return;
    if (!force && config.sounds.purr === false) return;
    if (config.volume <= 0) return;
    if (!ensure()) return;
    if (ctx.state !== "running") {
      const resumed = ctx.resume();
      if (resumed && typeof resumed.then === "function") {
        resumed.then(function() {
          startPurr(force);
        }).catch(function() {
        });
      }
      return;
    }
    const ac = ctx;
    const now = ac.currentTime;
    const source = ac.createBufferSource();
    source.buffer = noiseFor(ac);
    source.loop = true;
    const filter = ac.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 380;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(1e-4, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.12);
    const lfo = ac.createOscillator();
    lfo.type = "sine";
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

  // src/client/ui/cat.js
  var SVG_PROPS = {
    viewBox: "0 0 120 140",
    className: "dpp-svg",
    "aria-hidden": "true",
    focusable: "false"
  };
  var OUTLINE = "#C9D4E3";
  function CatArt(state) {
    const gazeX = state.sleeping ? 0 : state.gaze.x;
    const focusY = state.busy ? 1.4 : 0;
    const waitingY = state.waiting ? -1.2 : 0;
    const gazeY = (state.sleeping ? 0 : state.gaze.y) + focusY + waitingY;
    const pupilShift = "translate(" + gazeX + " " + gazeY + ")";
    return h(
      "svg",
      SVG_PROPS,
      h(
        "defs",
        null,
        h(
          "linearGradient",
          { id: "dpp-fur", x1: "0", y1: "0", x2: "0", y2: "1" },
          h("stop", { offset: "0", stopColor: "#FFFFFF" }),
          h("stop", { offset: "1", stopColor: "#E9EFF8" })
        ),
        h(
          "linearGradient",
          { id: "dpp-iris", x1: "0", y1: "0", x2: "0", y2: "1" },
          h("stop", { offset: "0", stopColor: "#A9DCF7" }),
          h("stop", { offset: "1", stopColor: "#4E93D8" })
        ),
        h(
          "radialGradient",
          { id: "dpp-belly", cx: "50%", cy: "45%", r: "70%" },
          h("stop", { offset: "0", stopColor: "#FFFFFF" }),
          h("stop", { offset: "1", stopColor: "#F2F6FB" })
        )
      ),
      h("ellipse", { className: "dpp-shadow", cx: 60, cy: 134, rx: 31, ry: 5.5, fill: "#000000", opacity: 0.14 }),
      h(
        "g",
        { className: "dpp-tail" },
        h("path", {
          d: "M84 114 C104 112 114 98 110 80 C107 66 96 60 88 68 C96 74 101 82 99 91 C97 101 90 106 83 106 Z",
          fill: "url(#dpp-fur)",
          stroke: OUTLINE,
          strokeWidth: 1.4,
          strokeLinejoin: "round"
        }),
        h("path", {
          d: "M101 102 C107 95 107 84 101 77",
          fill: "none",
          stroke: "#E6ECF6",
          strokeWidth: 2.2,
          strokeLinecap: "round"
        })
      ),
      h(
        "g",
        { className: "dpp-leg-bl" },
        h("ellipse", { cx: 43, cy: 124, rx: 11, ry: 9, fill: "#F5F8FD", stroke: OUTLINE, strokeWidth: 1.2 }),
        h("ellipse", { cx: 43, cy: 128, rx: 9.4, ry: 5, fill: "#C9D3E1" })
      ),
      h(
        "g",
        { className: "dpp-leg-br" },
        h("ellipse", { cx: 77, cy: 124, rx: 11, ry: 9, fill: "#F5F8FD", stroke: OUTLINE, strokeWidth: 1.2 }),
        h("ellipse", { cx: 77, cy: 128, rx: 9.4, ry: 5, fill: "#C9D3E1" })
      ),
      h(
        "g",
        { className: "dpp-body-g" },
        h("ellipse", {
          cx: 60,
          cy: 104,
          rx: 28,
          ry: 29,
          fill: "url(#dpp-fur)",
          stroke: OUTLINE,
          strokeWidth: 1.4
        }),
        h("ellipse", { cx: 60, cy: 108, rx: 17, ry: 16, fill: "url(#dpp-belly)" }),
        h(
          "g",
          { className: "dpp-leg-fl" },
          h("rect", {
            x: 45,
            y: 109,
            width: 9,
            height: 23,
            rx: 4.5,
            fill: "#FFFFFF",
            stroke: OUTLINE,
            strokeWidth: 1.2
          }),
          h("rect", { x: 45, y: 123.4, width: 9, height: 8.6, rx: 4.2, fill: "#C9D3E1" }),
          h("ellipse", { cx: 49.5, cy: 132, rx: 6, ry: 3.4, fill: "#C9D3E1", stroke: OUTLINE, strokeWidth: 1.1 })
        ),
        h(
          "g",
          { className: "dpp-leg-fr" },
          h("rect", {
            x: 66,
            y: 109,
            width: 9,
            height: 23,
            rx: 4.5,
            fill: "#FFFFFF",
            stroke: OUTLINE,
            strokeWidth: 1.2
          }),
          h("rect", { x: 66, y: 123.4, width: 9, height: 8.6, rx: 4.2, fill: "#C9D3E1" }),
          h("ellipse", { cx: 70.5, cy: 132, rx: 6, ry: 3.4, fill: "#C9D3E1", stroke: OUTLINE, strokeWidth: 1.1 })
        )
      ),
      h(
        "g",
        { className: "dpp-ear-l" },
        h("path", {
          d: "M36 40 C31 30 26 20 22 12 C33 15 46 25 53 33 Z",
          fill: "url(#dpp-fur)",
          stroke: OUTLINE,
          strokeWidth: 1.4,
          strokeLinejoin: "round"
        }),
        h("path", { d: "M38 37 C34 30 31 24 28 18 C36 21 45 28 50 34 Z", fill: "#F7B8C4" })
      ),
      h(
        "g",
        { className: "dpp-ear-r" },
        h("path", {
          d: "M84 40 C89 30 94 20 98 12 C87 15 74 25 67 33 Z",
          fill: "url(#dpp-fur)",
          stroke: OUTLINE,
          strokeWidth: 1.4,
          strokeLinejoin: "round"
        }),
        h("path", { d: "M82 37 C86 30 89 24 92 18 C84 21 75 28 70 34 Z", fill: "#F7B8C4" })
      ),
      h("circle", {
        cx: 60,
        cy: 58,
        r: 33,
        fill: "url(#dpp-fur)",
        stroke: OUTLINE,
        strokeWidth: 1.4
      }),
      h("ellipse", { cx: 60, cy: 74, rx: 25, ry: 15, fill: "#FBFDFF", opacity: 0.85 }),
      h("path", {
        d: "M28 70 L14 67 M28 74 L13 76 M92 70 L106 67 M92 74 L107 76",
        fill: "none",
        stroke: "#DCE4EF",
        strokeWidth: 1.3,
        strokeLinecap: "round"
      }),
      h(
        "g",
        { className: "dpp-eyes-open" },
        h("ellipse", { cx: 46, cy: 60, rx: 9.6, ry: 10.8, fill: "#FFFFFF", stroke: OUTLINE, strokeWidth: 1.3 }),
        h("ellipse", { cx: 74, cy: 60, rx: 9.6, ry: 10.8, fill: "#FFFFFF", stroke: OUTLINE, strokeWidth: 1.3 }),
        h(
          "g",
          { transform: pupilShift },
          h("circle", { cx: 46, cy: 61, r: 7.3, fill: "url(#dpp-iris)" }),
          h("circle", { cx: 74, cy: 61, r: 7.3, fill: "url(#dpp-iris)" }),
          h("circle", { cx: 46, cy: 61, r: 3.5, fill: "#22344A" }),
          h("circle", { cx: 74, cy: 61, r: 3.5, fill: "#22344A" }),
          h("circle", { cx: 43.3, cy: 57.4, r: 2.9, fill: "#FFFFFF" }),
          h("circle", { cx: 71.3, cy: 57.4, r: 2.9, fill: "#FFFFFF" }),
          h("circle", { cx: 48.8, cy: 64.6, r: 1.3, fill: "#FFFFFF", opacity: 0.9 }),
          h("circle", { cx: 76.8, cy: 64.6, r: 1.3, fill: "#FFFFFF", opacity: 0.9 })
        )
      ),
      h(
        "g",
        { className: "dpp-eyes-closed" },
        h("path", { d: "M37 60 Q46 67 55 60", fill: "none", stroke: "#3A4A5E", strokeWidth: 2.2, strokeLinecap: "round" }),
        h("path", { d: "M65 60 Q74 67 83 60", fill: "none", stroke: "#3A4A5E", strokeWidth: 2.2, strokeLinecap: "round" })
      ),
      h("ellipse", { cx: 33, cy: 74, rx: 6, ry: 3.2, fill: "#F9C6D0", opacity: 0.65 }),
      h("ellipse", { cx: 87, cy: 74, rx: 6, ry: 3.2, fill: "#F9C6D0", opacity: 0.65 }),
      h("path", { d: "M57 73 Q60 71 63 73 Q60 77 57 73 Z", fill: "#F2A0AE" }),
      h("path", {
        d: "M60 77 Q56.5 81 53 78 M60 77 Q63.5 81 67 78",
        fill: "none",
        stroke: "#B9C6D6",
        strokeWidth: 1.4,
        strokeLinecap: "round"
      })
    );
  }

  // src/client/ui/card.js
  function formatDuration(ms, t) {
    const total = Math.max(1, Math.round(ms / 6e4));
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return hours > 0 ? t("time.hm").replace("{h}", hours).replace("{m}", minutes) : t("time.m").replace("{m}", minutes);
  }
  function PetCard(state) {
    const t = state.t;
    const unit = typeof state.unit === "string" && state.unit ? state.unit : "CNY";
    const rates = state.rates || null;
    const data = state.data || {};
    const session = data.session || {};
    const last = session.last || {};
    const balance = data.balance || {};
    const cashCny = balanceToCny(balance, rates);
    const cash = cnyToUnit(cashCny, unit, rates);
    function money(value, negate) {
      const converted = cnyToUnit(value, unit, rates);
      if (converted == null) return t("card.unavailable");
      return (negate ? "\u2212" : "") + formatMoney(converted, unit);
    }
    const box = state.box || { shift: 0, tail: 80 };
    const rows = [];
    const saved = Number(session.saved) || 0;
    const contextTokens = Number(last.context) || 0;
    const windowTokens = Number(data.contextWindow) || 1e6;
    const percent = windowTokens > 0 ? Math.min(100, Math.round(contextTokens / windowTokens * 100)) : 0;
    const failed = data.ok === false;
    const notes = [];
    function addNote(reason) {
      const key = "error." + (reason || "generic");
      const text = t(key);
      if (text && text !== key && notes.indexOf(text) === -1) notes.push(text);
    }
    const hasBalance = Boolean(balance && (balance.CNY != null || balance.USD != null));
    if (failed) {
      addNote(data.reason || "generic");
    } else if (cash == null) {
      addNote(hasBalance ? data.ratesReason || "offline" : data.balanceReason || "no-account");
    }
    function pushNotes() {
      notes.forEach(function(text, index) {
        rows.push(h("div", { key: "note" + index, className: "dpp-card-note" }, text));
      });
    }
    function pushPeak() {
      const nextAt = Number(data.nextChangeAt);
      const remain = Number.isFinite(nextAt) ? nextAt - Date.now() : null;
      const status = data.peak ? t("peak.peak") : t("peak.off");
      const text = remain == null ? status : status + " \xB7 " + t("peak.in").replace("{time}", formatDuration(remain, t));
      rows.push(h("div", { key: "pk", className: "dpp-card-foot" }, text));
    }
    if (state.mode === "receipt") {
      rows.push(h("div", { key: "a1", className: "dpp-card-label" }, t("card.answer")));
      rows.push(h(
        "div",
        { key: "a2", className: "dpp-card-row" },
        h("span", null, formatTokens(last.tokens) + " " + t("card.tokens")),
        h("span", { className: "dpp-card-sum" }, money(last.cost))
      ));
      rows.push(h("div", { key: "s1", className: "dpp-card-label dpp-card-gap" }, t("card.session")));
      rows.push(h(
        "div",
        { key: "s2", className: "dpp-card-row" },
        h("span", null, formatTokens(session.tokens) + " " + t("card.tokens")),
        h("span", { className: "dpp-card-sum" }, money(session.cost))
      ));
      if (saved > 0) {
        rows.push(h(
          "div",
          { key: "sv", className: "dpp-card-row" },
          h("span", null, t("card.saved")),
          h("span", { className: "dpp-card-saved" }, money(saved, true))
        ));
      }
      rows.push(h(
        "div",
        { key: "cx", className: "dpp-card-row" },
        h("span", null, t("card.context")),
        h("span", { className: "dpp-card-sum" }, formatTokens(contextTokens) + " \xB7 " + percent + "%")
      ));
      rows.push(h("div", { key: "sep", className: "dpp-card-sep" }));
      rows.push(h(
        "div",
        { key: "b1", className: "dpp-card-total" },
        h("span", null, t("card.balance")),
        h("span", null, cash == null ? t("card.unavailable") : formatMoney(cash, unit))
      ));
      pushNotes();
      pushPeak();
    } else {
      rows.push(h("div", { key: "label", className: "dpp-card-label" }, t("card.balance")));
      rows.push(h(
        "div",
        { key: "value", className: "dpp-card-value" },
        cash == null ? t("card.unavailable") : formatMoney(cash, unit)
      ));
      if (session.tokens || session.cost) {
        rows.push(h("div", { key: "sep", className: "dpp-card-sep" }));
        rows.push(h("div", { key: "s1", className: "dpp-card-label" }, t("card.session")));
        rows.push(h(
          "div",
          { key: "s2", className: "dpp-card-row" },
          h("span", null, formatTokens(session.tokens) + " " + t("card.tokens")),
          h("span", { className: "dpp-card-sum" }, money(session.cost))
        ));
      }
      pushNotes();
      pushPeak();
    }
    return h(
      "div",
      {
        className: "dpp-card",
        ref: state.anchor,
        style: { transform: "translateX(calc(-50% + " + box.shift + "px))" },
        onPointerDown: function(event) {
          event.stopPropagation();
        },
        onClick: function(event) {
          event.stopPropagation();
        }
      },
      rows,
      h("button", {
        key: "close",
        type: "button",
        className: "dpp-card-close",
        "aria-label": t("card.close"),
        onClick: function() {
          state.onClose();
        }
      }, "\xD7"),
      h("div", { key: "tail", className: "dpp-card-tail", style: { left: box.tail + "px" } })
    );
  }

  // src/client/ui/settings.js
  function SettingsPanel(state) {
    const [view, setView] = useState("main");
    const t = state.t;
    const settings = state.settings;
    const rates = state.rates || null;
    const box = state.box || { shift: 0 };
    let quote = t("settings.rate.offline");
    if (rates && Number.isFinite(rates.USD)) {
      if (settings.currency === "CNY") {
        quote = "1 $ = \xA5" + (1 / rates.USD).toFixed(2);
      } else if (Number.isFinite(rates[settings.currency])) {
        const value = rates[settings.currency];
        const digits = value >= 100 ? 1 : value >= 1 ? 2 : 3;
        quote = "1 \xA5 = " + value.toFixed(digits) + " " + (currencySymbol(settings.currency) || settings.currency);
      }
    }
    const panel = {
      className: "dpp-settings",
      role: "dialog",
      "aria-label": t("settings.title"),
      ref: state.anchor,
      style: { transform: "translateX(calc(-50% + " + box.shift + "px))" },
      onPointerDown: function(event) {
        event.stopPropagation();
      },
      onDoubleClick: function(event) {
        event.stopPropagation();
      },
      onClick: function(event) {
        event.stopPropagation();
      }
    };
    if (view === "sounds") {
      return h(
        "div",
        panel,
        h(
          "div",
          { className: "dpp-settings-head" },
          h("button", {
            type: "button",
            className: "dpp-back",
            onClick: function() {
              setView("main");
            },
            "aria-label": t("settings.back")
          }, "\u2190"),
          h("span", { className: "dpp-settings-title" }, t("settings.sound")),
          h("button", { type: "button", className: "dpp-close", onClick: state.onClose, "aria-label": t("settings.close") }, "\xD7")
        ),
        SOUND_KEYS.map(function(key) {
          return h(
            "div",
            { key, className: "dpp-sound-row" },
            h("button", {
              type: "button",
              className: "dpp-play",
              onClick: function() {
                state.onPreview(key);
              },
              title: t("sound.preview"),
              "aria-label": t("sound.preview")
            }, "\u25B6"),
            h(
              "label",
              { className: "dpp-sound-toggle" },
              h("span", null, t("sound." + key)),
              h("input", {
                type: "checkbox",
                checked: settings.sounds[key] !== false,
                onChange: function(event) {
                  state.onSound(key, event.target.checked);
                }
              })
            )
          );
        }),
        h("div", { className: "dpp-settings-label" }, t("settings.volume")),
        h(
          "div",
          { className: "dpp-volume" },
          h("input", {
            type: "range",
            min: "0",
            max: "100",
            step: "5",
            value: String(Math.round(settings.volume * 100)),
            onChange: function(event) {
              state.onVolume(Number(event.target.value) / 100);
            },
            "aria-label": t("settings.volume")
          }),
          h("span", null, Math.round(settings.volume * 100) + "%")
        ),
        h("div", { className: "dpp-settings-quote" }, t("settings.sound.hint"))
      );
    }
    return h(
      "div",
      panel,
      h(
        "div",
        { className: "dpp-settings-head" },
        h("span", { className: "dpp-settings-title" }, t("settings.title")),
        h("button", { type: "button", className: "dpp-close", onClick: state.onClose, "aria-label": t("settings.close") }, "\xD7")
      ),
      h("div", { className: "dpp-settings-label" }, t("settings.currency")),
      h(
        "select",
        {
          className: "dpp-select",
          value: settings.currency,
          onChange: function(event) {
            state.onCurrency(event.target.value);
          },
          "aria-label": t("settings.currency")
        },
        currencyOptions(rates, settings.currency).map(function(code) {
          return h("option", { key: code, value: code }, currencyLabel(code));
        })
      ),
      h("div", { className: "dpp-settings-quote" }, quote),
      h("div", { className: "dpp-settings-label" }, t("settings.language")),
      h(
        "select",
        {
          className: "dpp-select",
          value: settings.language,
          onChange: function(event) {
            state.onLanguage(event.target.value);
          },
          "aria-label": t("settings.language")
        },
        [["en", "English"], ["ru", "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"], ["uk", "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"]].map(function(pair) {
          return h("option", { key: pair[0], value: pair[0] }, pair[1]);
        })
      ),
      h("div", { className: "dpp-settings-label" }, t("settings.size")),
      h(
        "div",
        { className: "dpp-seg" },
        SIZES.map(function(value) {
          return h("button", {
            key: String(value),
            type: "button",
            className: "dpp-seg-btn" + (state.scale === value ? " dpp-seg-on" : ""),
            onClick: function() {
              state.onSize(value);
            }
          }, String(value) + "\xD7");
        })
      ),
      h(
        "button",
        {
          type: "button",
          className: "dpp-settings-link",
          onClick: function() {
            setView("sounds");
          }
        },
        h("span", null, t("settings.sound")),
        h("span", { className: "dpp-settings-link-arrow" }, "\u2192")
      )
    );
  }

  // src/client/agent.js
  function readAgentState(list, statuses) {
    const state = { running: false, waiting: false, anyRunning: false, sessionId: null };
    const mainIds = [];
    const rows = [];
    if (list && list.byId) {
      const ids = Array.isArray(list.ids) ? list.ids : Object.keys(list.byId);
      for (let index = 0; index < ids.length; index += 1) {
        const row = list.byId[ids[index]];
        if (!row) continue;
        rows.push({ id: ids[index], running: Boolean(row.running) });
        if (row.retainedBy && row.retainedBy.mainView > 0) mainIds.push(ids[index]);
      }
    }
    state.sessionId = mainIds.length > 0 ? mainIds[0] : null;
    if (!state.sessionId && rows.length > 0) state.sessionId = rows[0].id;
    function isMain(id) {
      return mainIds.length === 0 || mainIds.indexOf(id) !== -1;
    }
    if (statuses && typeof statuses.forEach === "function") {
      statuses.forEach(function(status, id) {
        if (!status) return;
        if (status.running) {
          state.anyRunning = true;
          if (isMain(id)) state.running = true;
        }
        if (status.pendingInteraction && isMain(id)) state.waiting = true;
      });
    }
    for (let index = 0; index < rows.length; index += 1) {
      if (!rows[index].running) continue;
      state.anyRunning = true;
      if (isMain(rows[index].id)) state.running = true;
    }
    return state;
  }
  var noopHook = function() {
    return null;
  };
  var selectSnapshot = function(snapshot) {
    return snapshot;
  };
  function AgentWatcher(props) {
    const useSessions = props.useSessions || noopHook;
    const useSessionStatus = props.useSessionStatus || noopHook;
    const list = useSessions(selectSnapshot);
    const statuses = useSessionStatus(selectSnapshot);
    const last = useRef(null);
    useEffect(function() {
      let next;
      try {
        next = readAgentState(list, statuses);
      } catch (error) {
        return;
      }
      const previous = last.current;
      last.current = next;
      if (previous && previous.running === next.running && previous.waiting === next.waiting && previous.anyRunning === next.anyRunning && previous.sessionId === next.sessionId) {
        return;
      }
      props.onChange(next);
    }, [list, statuses, props.onChange]);
    return null;
  }

  // src/client/ui/pet-view.js
  function PetView(props) {
    const {
      t,
      className,
      pos,
      scale,
      card,
      cardBox,
      settings,
      rates,
      settingsOpen,
      menuOpen,
      bubble,
      agent,
      sleeping,
      hearts,
      symbols,
      hop,
      gaze,
      pleased,
      cardAnchor,
      settingsAnchor,
      menuAnchor,
      sessionIdRef,
      cardRef,
      useSessions,
      useSessionStatus,
      onAgent,
      onPointerDown,
      onPointerMove,
      onFinishDrag,
      onKeyDown,
      onContextMenu,
      onHeadEnter,
      onHeadMove,
      onHeadLeave,
      onUpdateSettings,
      onApplySize,
      onRefreshCard,
      onOpenSettings,
      onCloseSettings,
      onCloseMenu,
      onCloseCard
    } = props;
    const { ReactionBoundary } = getBoundaries();
    return h(
      "div",
      { className: "dpp-root" },
      h("style", null, CSS),
      h(
        ReactionBoundary,
        null,
        h(AgentWatcher, {
          useSessions,
          useSessionStatus,
          onChange: onAgent
        })
      ),
      h(
        "div",
        {
          className,
          style: {
            left: pos.left + "px",
            top: pos.top + "px",
            width: PET_W * scale + "px",
            height: PET_H * scale + "px"
          },
          role: "button",
          tabIndex: 0,
          "aria-label": t("aria"),
          title: t("hint"),
          onPointerDown,
          onPointerMove,
          onPointerUp: onFinishDrag,
          onPointerCancel: onFinishDrag,
          onContextMenu,
          onKeyDown
        },
        settingsOpen ? h(SettingsPanel, {
          t,
          settings,
          scale,
          rates,
          box: cardBox,
          anchor: settingsAnchor,
          onCurrency: function(currency) {
            onUpdateSettings({ currency });
          },
          onLanguage: function(language) {
            onUpdateSettings({ language });
          },
          onSize: onApplySize,
          onClose: onCloseSettings,
          onSound: function(name, enabled) {
            const next = Object.assign({}, settings.sounds);
            next[name] = enabled;
            onUpdateSettings({ sounds: next });
          },
          onVolume: function(volume) {
            onUpdateSettings({ volume });
          },
          onPreview: function(name) {
            previewSound(name);
          }
        }) : menuOpen ? h(
          "div",
          {
            className: "dpp-menu",
            ref: menuAnchor,
            role: "menu",
            style: { transform: "translateX(calc(-50% + " + cardBox.shift + "px))" },
            onPointerDown: function(event) {
              event.stopPropagation();
            },
            onClick: function(event) {
              event.stopPropagation();
            }
          },
          h("button", {
            type: "button",
            className: "dpp-menu-item",
            role: "menuitem",
            onClick: function() {
              onCloseMenu();
              onRefreshCard("balance", sessionIdRef.current);
            }
          }, t("menu.balance")),
          h("button", {
            type: "button",
            className: "dpp-menu-item",
            role: "menuitem",
            onClick: function() {
              onCloseMenu();
              onOpenSettings();
            }
          }, t("menu.settings"))
        ) : card ? h(PetCard, {
          mode: card.mode,
          data: card.data,
          t,
          unit: settings.currency,
          rates,
          box: cardBox,
          anchor: cardAnchor,
          onClose: onCloseCard
        }) : bubble ? h("div", { className: "dpp-bubble", role: "status" }, bubble) : null,
        agent.waiting ? h("span", { className: "dpp-alert", "aria-hidden": "true" }, "!") : null,
        h(
          "div",
          { className: "dpp-idle" },
          h(
            "div",
            { key: hop, className: "dpp-hop" + (hop ? " dpp-jump" : "") },
            CatArt({
              gaze,
              sleeping,
              busy: agent.running,
              waiting: agent.waiting
            })
          )
        ),
        h("div", {
          className: "dpp-head",
          onPointerEnter: onHeadEnter,
          onPointerMove: onHeadMove,
          onPointerLeave: onHeadLeave
        }),
        symbols.map(function(item) {
          return h("span", {
            key: "sym-" + item.id,
            className: "dpp-symbol",
            style: { marginLeft: item.dx + "px" }
          }, item.glyph);
        }),
        hearts.map(function(heart) {
          return h("span", {
            key: heart.id,
            className: "dpp-heart",
            style: { marginLeft: heart.dx + "px" }
          }, "\u2665");
        }),
        sleeping ? h("span", { className: "dpp-zzz" }, "z z") : null
      )
    );
  }

  // src/client/ui/pet.js
  var BUSY_SYMBOLS = ["+", "\u2212", "=", "\xA5", "%", "#", "?", "!"];
  function LedgerKitty(props) {
    const t = props.t;
    const [scale, setScale] = useState(function() {
      return normalizeSize(readStore(SIZE_KEY, 1));
    });
    const [pos, setPos] = useState(function() {
      const saved = readStore(POS_KEY, null);
      return saved && typeof saved.left === "number" ? clampPos(saved, scale) : defaultPos(scale);
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
    const [settings, setSettings] = useState(function() {
      return normalizeSettings(readStore(SETTINGS_KEY, null), props.defaultLang);
    });
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cardBox, setCardBox] = useState({ shift: 0, tail: 80 });
    const [rates, setRates] = useState(null);
    const tr = useCallback(function(key) {
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
    useEffect(function() {
      writeStore(SETTINGS_KEY, settings);
      configureAudio(settings);
      if (agent.running && settings.sounds.typing !== false) startTyping();
      if (!agent.running) stopTyping();
    }, [settings, agent.running]);
    useEffect(function() {
      function unlock() {
        unlockAudio();
      }
      window.addEventListener("pointerdown", unlock, { once: true, capture: true });
      window.addEventListener("keydown", unlock, { once: true, capture: true });
      return function() {
        window.removeEventListener("pointerdown", unlock, true);
        window.removeEventListener("keydown", unlock, true);
      };
    }, []);
    useEffect(function() {
      if (!agent.running) return void 0;
      const timer = window.setInterval(function() {
        const id = symbolSeq.current + 1;
        symbolSeq.current = id;
        const glyph = BUSY_SYMBOLS[Math.floor(Math.random() * BUSY_SYMBOLS.length)];
        setSymbols(function(current) {
          return current.concat({ id, glyph, dx: Math.round(Math.random() * 44 - 22) });
        });
        window.setTimeout(function() {
          setSymbols(function(current) {
            return current.filter(function(item) {
              return item.id !== id;
            });
          });
        }, 1500);
      }, 620);
      return function() {
        window.clearInterval(timer);
      };
    }, [agent.running]);
    useLayoutEffect(function() {
      const node = settingsOpen ? settingsAnchor.current : menuOpen ? menuAnchor.current : card ? cardAnchor.current : null;
      if (!node) return;
      const width = node.offsetWidth || 170;
      const petCenter = posRef.current.left + PET_W * scaleRef.current / 2;
      const minLeft = 10;
      const maxLeft = Math.max(minLeft, window.innerWidth - width - 10);
      const desired = petCenter - width / 2;
      const left = Math.min(Math.max(minLeft, desired), maxLeft);
      const shift = left - desired;
      const tail = Math.min(Math.max(14, petCenter - left), Math.max(14, width - 14));
      setCardBox(function(current) {
        if (Math.abs(current.shift - shift) < 0.5 && Math.abs(current.tail - tail) < 0.5) return current;
        return { shift, tail };
      });
    }, [card, settingsOpen, menuOpen, pos, scale]);
    const wake = useCallback(function() {
      setSleeping(false);
      window.clearTimeout(idleRef.current);
      idleRef.current = window.setTimeout(function() {
        if (busyRef.current) {
          wake();
          return;
        }
        setSleeping(true);
      }, SLEEP_AFTER_MS);
    }, []);
    const say = useCallback(function(text) {
      setBubble(text);
      window.clearTimeout(bubbleRef.current);
      bubbleRef.current = window.setTimeout(function() {
        setBubble(null);
      }, 3400);
    }, []);
    const spawnHeart = useCallback(function() {
      const id = heartSeq.current + 1;
      heartSeq.current = id;
      setHearts(function(current) {
        return current.concat({ id, dx: Math.round(Math.random() * 36 - 18) });
      });
      window.setTimeout(function() {
        setHearts(function(current) {
          return current.filter(function(heart) {
            return heart.id !== id;
          });
        });
      }, 1400);
    }, []);
    const burst = useCallback(function(text) {
      setHop(function(value) {
        return value + 1;
      });
      if (text) say(text);
      spawnHeart();
    }, [say, spawnHeart]);
    const startPleasure = useCallback(function() {
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
      pleasureTimeoutRef.current = window.setTimeout(function() {
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
    const jump = useCallback(function() {
      const list = [1, 2, 3, 4, 5, 6].map(function(index) {
        return tr("line." + index);
      });
      burst(list[Math.floor(Math.random() * list.length)]);
    }, [burst, tr]);
    const celebrate = useCallback(function() {
      burst(tr("reaction.done"));
      setCelebrating(true);
      window.clearTimeout(celebrateRef.current);
      celebrateRef.current = window.setTimeout(function() {
        setCelebrating(false);
      }, 1600);
    }, [burst, tr]);
    useEffect(function() {
      return function() {
        window.clearTimeout(celebrateRef.current);
        window.clearTimeout(cardRef.current);
      };
    }, []);
    const showCard = useCallback(function(mode, data, ttl) {
      if (data && data.rates) setRates(data.rates);
      setCard({ mode, data });
      window.clearTimeout(cardRef.current);
      cardRef.current = window.setTimeout(function() {
        setCard(null);
      }, ttl);
    }, []);
    const refreshCard = useCallback(function(mode, sessionId) {
      window.setTimeout(function() {
        fetchState(sessionId).then(function(data) {
          if (data && data.ok) {
            showCard(mode, data, mode === "receipt" ? 15e3 : 12e3);
            return;
          }
          showCard(mode, { ok: false, reason: data && data.reason || "generic" }, 9e3);
        }).catch(function() {
          showCard(mode, { ok: false, reason: "unreachable" }, 9e3);
        });
      }, mode === "receipt" ? 500 : 0);
    }, [showCard]);
    useEffect(function() {
      if (!card) return void 0;
      const timer = window.setInterval(function() {
        fetchState(sessionIdRef.current).then(function(data) {
          if (!data || !data.ok) return;
          if (data.rates) setRates(data.rates);
          setCard(function(current) {
            return current ? { mode: current.mode, data } : current;
          });
        }).catch(function() {
        });
      }, 3e3);
      return function() {
        window.clearInterval(timer);
      };
    }, [card !== null]);
    const onAgent = useCallback(function(next) {
      const previous = agentRef.current;
      agentRef.current = next;
      busyRef.current = next.running;
      if (next.sessionId) sessionIdRef.current = next.sessionId;
      setAgent(function(current) {
        if (current.running === next.running && current.waiting === next.waiting) return current;
        return { running: next.running, waiting: next.waiting };
      });
      if (next.running && !previous.running) {
        wake();
        startTyping();
      }
      if (!next.running) stopTyping();
      if (next.waiting && !previous.waiting) {
        say(tr("reaction.wait"));
        playSound("question");
      }
      if (previous.anyRunning && !next.anyRunning && !next.waiting) {
        celebrate();
        playSound("receipt");
        refreshCard("receipt", next.sessionId || sessionIdRef.current);
      }
    }, [say, tr, celebrate, wake, refreshCard]);
    useEffect(function() {
      wake();
      return function() {
        window.clearTimeout(idleRef.current);
        window.clearTimeout(bubbleRef.current);
        window.clearTimeout(pleasureTimeoutRef.current);
        window.clearInterval(heartTimerRef.current);
        stopTyping();
        stopPurr();
      };
    }, [wake]);
    useEffect(function() {
      let timer = 0;
      let close = 0;
      let stopped = false;
      function loop() {
        timer = window.setTimeout(function() {
          setBlink(true);
          close = window.setTimeout(function() {
            setBlink(false);
            if (!stopped) loop();
          }, 130);
        }, 2300 + Math.random() * 3600);
      }
      loop();
      return function() {
        stopped = true;
        window.clearTimeout(timer);
        window.clearTimeout(close);
      };
    }, []);
    useEffect(function() {
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
        const cx = point.left + PET_W * currentScale / 2;
        const cy = point.top + PET_H * currentScale * 0.4;
        const nx = Math.max(-1, Math.min(1, (event.clientX - cx) / 240));
        const ny = Math.max(-1, Math.min(1, (event.clientY - cy) / 240));
        const x = Math.round(nx * 24) / 10;
        const y = Math.round(ny * 20) / 10;
        if (x === lastX && y === lastY) return;
        lastX = x;
        lastY = y;
        if (frame) return;
        frame = window.requestAnimationFrame(function() {
          frame = 0;
          setGaze({ x, y });
        });
      }
      window.addEventListener("pointermove", onMove, { passive: true });
      return function() {
        window.removeEventListener("pointermove", onMove);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }, [wake]);
    useEffect(function() {
      function onResize() {
        const prev = viewportRef.current;
        const nextW = window.innerWidth;
        const nextH = window.innerHeight;
        viewportRef.current = { w: nextW, h: nextH };
        setPos(function(current) {
          const currentScale = scaleRef.current;
          const width = PET_W * currentScale;
          const height = PET_H * currentScale;
          let left = current.left;
          let top = current.top;
          const rightGap = prev.w - (current.left + width);
          if (rightGap <= SNAP_ZONE) left = nextW - width - Math.max(0, rightGap);
          const bottomGap = prev.h - (current.top + height);
          if (bottomGap <= SNAP_ZONE) top = nextH - height - Math.max(0, bottomGap);
          return clampPos({ left, top }, currentScale);
        });
      }
      window.addEventListener("resize", onResize);
      return function() {
        window.removeEventListener("resize", onResize);
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
      setSettings(function(current) {
        return normalizeSettings(Object.assign({}, current, patch));
      });
    }
    useEffect(function() {
      if (!settingsOpen) return void 0;
      function onKey(event) {
        if (event.key === "Escape") {
          event.preventDefault();
          setSettingsOpen(false);
        }
      }
      window.addEventListener("keydown", onKey);
      return function() {
        window.removeEventListener("keydown", onKey);
      };
    }, [settingsOpen]);
    useEffect(function() {
      if (!menuOpen) return void 0;
      function onDown(event) {
        const node = menuAnchor.current;
        if (node && node.contains(event.target)) return;
        setMenuOpen(false);
      }
      window.addEventListener("pointerdown", onDown, true);
      return function() {
        window.removeEventListener("pointerdown", onDown, true);
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
      unlockAudio();
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch (error) {
      }
      dragRef.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        from: posRef.current,
        moved: false
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
        burst(null);
        playSound("meow");
        refreshCard("balance", sessionIdRef.current);
        return;
      }
      const currentScale = scaleRef.current;
      const dropped = clampPos({
        left: drag.from.left + (event.clientX - drag.x),
        top: drag.from.top + (event.clientY - drag.y)
      }, currentScale);
      const settled = snapToEdge(dropped, currentScale);
      setPos(settled);
      writeStore(POS_KEY, settled);
    }
    function onKeyDown(event) {
      if (event.key === "Enter" || event.key === " ") {
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
    let className = "dpp-cat";
    if (dragging) className += " dpp-drag";
    if (sleeping) className += " dpp-sleep";
    if (blink) className += " dpp-blink";
    if (agent.running) className += " dpp-busy";
    if (agent.waiting) className += " dpp-waiting";
    if (celebrating) className += " dpp-celebrate";
    if (pleased) className += " dpp-pleased";
    return h(PetView, {
      t: tr,
      className,
      pos,
      scale,
      card,
      cardBox,
      settings,
      rates,
      settingsOpen,
      menuOpen,
      bubble,
      agent,
      sleeping,
      hearts,
      symbols,
      pleased,
      onHeadEnter,
      onHeadMove,
      onHeadLeave,
      hop,
      gaze,
      cardAnchor,
      settingsAnchor,
      menuAnchor,
      sessionIdRef,
      cardRef,
      useSessions: props.useSessions,
      useSessionStatus: props.useSessionStatus,
      onAgent,
      onPointerDown,
      onPointerMove,
      onFinishDrag: finishDrag,
      onKeyDown,
      onContextMenu: openMenu,
      onUpdateSettings: updateSettings,
      onApplySize: applySize,
      onRefreshCard: refreshCard,
      onOpenSettings: function() {
        setSettingsOpen(true);
      },
      onCloseSettings: function() {
        setSettingsOpen(false);
      },
      onCloseMenu: function() {
        setMenuOpen(false);
      },
      onCloseCard: function() {
        window.clearTimeout(cardRef.current);
        setCard(null);
      }
    });
  }

  // src/client/index.js
  function createPlugin(require2) {
    initRuntime(require2);
    const { PetBoundary } = getBoundaries();
    return {
      inject: ["slots", "locale"],
      apply(ctx2) {
        ctx2.locale.register("ledger-kitty", "en", STRINGS.en);
        ctx2.locale.register("ledger-kitty", "ru", STRINGS.ru);
        try {
          ctx2.locale.register("ledger-kitty", "uk", STRINGS.uk);
        } catch (error) {
        }
        const t = ctx2.locale.bind("ledger-kitty");
        let defaultLang = "en";
        try {
          const active = String(ctx2.locale.getLocale().active || "").toLowerCase();
          if (active.indexOf("ru") === 0) defaultLang = "ru";
          else if (active.indexOf("uk") === 0) defaultLang = "uk";
        } catch (error) {
        }
        ctx2.slots.inject("shell.overlay", function() {
          return ctx2.slots.register({
            name: "shell.overlay",
            id: "dsh-ledger-kitty",
            order: 20,
            label: function() {
              return t("aria");
            }
          }, function(slotProps) {
            return h(
              PetBoundary,
              null,
              h(LedgerKitty, {
                t,
                defaultLang,
                useSessions: slotProps.useSessions,
                useSessionStatus: slotProps.useSessionStatus
              })
            );
          });
        });
      }
    };
  }
  return __toCommonJS(index_exports);
})();
window.__ModuleLoader__.load({ id: 'dsh-ledger-kitty', factory(require) { return __ledgerKitty.createPlugin(require); } });
