import { en } from './en.js';
import { ru } from './ru.js';
import { uk } from './uk.js';
import { zh } from './zh.js';

export const STRINGS = { en, ru, uk, zh };

/**
 * The pet carries its own language: it follows the app locale only until the
 * user picks one in settings, and never depends on the Host locale afterwards.
 */
export function translator(lang, fallback) {
  const dict = STRINGS[lang] || STRINGS.en;
  return function translate(key) {
    return dict[key] || STRINGS.en[key] || fallback(key);
  };
}
