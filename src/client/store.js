

import { SIZES, SOUND_KEYS } from './constants.js';

export function readStore(key, fallback) {
  try {
    // Renamed from the old package: keep the user's position, size and
    // settings by falling back to the previous key prefix once.
    let raw = window.localStorage.getItem(key);
    if (!raw) {
      const legacyKey = key.replace('dsh-ledger-kitty:', 'dsh-pocket-pet:');
      if (legacyKey !== key) raw = window.localStorage.getItem(legacyKey);
    }
    if (!raw) return fallback;
    const value = JSON.parse(raw);
    return value == null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    /* private mode / quota: the cat simply forgets where it was */
  }
}

export function normalizeSize(value) {
  return SIZES.indexOf(value) === -1 ? 1 : value;
}

export const LANGS = ['en', 'ru', 'uk', 'zh'];

export function normalizeSettings(value, fallbackLang) {
  const next = {
    currency: 'CNY',
    language: LANGS.indexOf(fallbackLang) === -1 ? 'en' : fallbackLang,
    volume: 0.6,
    sounds: { meow: true, typing: true, receipt: true, question: true, purr: true },
  };
  if (value && typeof value === 'object') {
    if (typeof value.currency === 'string' && /^[A-Z]{3}$/.test(value.currency)) {
      next.currency = value.currency;
    }
    if (LANGS.indexOf(value.language) !== -1) next.language = value.language;
    const volume = Number(value.volume);
    if (Number.isFinite(volume) && volume >= 0 && volume <= 1) next.volume = volume;
    if (value.sounds && typeof value.sounds === 'object') {
      for (const key of SOUND_KEYS) {
        if (typeof value.sounds[key] === 'boolean') next.sounds[key] = value.sounds[key];
      }
    }
  }
  return next;
}

/** The Host quotes 1 CNY -> currency. Without the table, other units show —. */
