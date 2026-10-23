import { POPULAR_CURRENCIES, SYMBOLS } from './constants.js';

export function cnyToUnit(amountCny, unit, rates) {
  if (amountCny == null || !Number.isFinite(amountCny)) return null;
  if (unit === 'CNY') return amountCny;
  if (rates && Number.isFinite(rates[unit])) return amountCny * rates[unit];
  return null;
}

/** Balance is normalised to CNY first, then converted to the display unit. */
export function balanceToCny(balance, rates) {
  if (!balance) return null;
  if (balance.CNY != null) return balance.CNY;
  if (balance.USD != null && rates && Number.isFinite(rates.USD) && rates.USD > 0) {
    return balance.USD / rates.USD;
  }
  return null;
}

export function currencySymbol(unit) {
  return SYMBOLS[unit] || null;
}

export function currencyLabel(code) {
  const symbol = currencySymbol(code);
  return symbol ? symbol + ' ' + code : code;
}

/** The live table is the source of truth; popular codes stay on top. */
export function currencyOptions(rates, current) {
  const codes = [];
  for (const code of POPULAR_CURRENCIES) codes.push(code);
  if (rates) {
    const rest = Object.keys(rates)
      .filter(function (code) { return /^[A-Z]{3}$/.test(code) && codes.indexOf(code) === -1; })
      .sort();
    for (const code of rest) codes.push(code);
  }
  if (current && codes.indexOf(current) === -1) codes.push(current);
  return codes;
}

/**
 * Read the agent's activity out of the two standard Slot hooks:
 * `useSessions()` is the session catalog (each row carries `running` and
 * `retainedBy.mainView`), `useSessionStatus()` is the per-session UI status
 * map (`running`, `pendingInteraction`, `completionUnread`).
 * The main-view session is the one the user is actually looking at; when no
 * row is retained by the main view yet, any running session counts.
 */

export function formatTokens(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return '0';
  if (n >= 1e6) return (Math.round(n / 1e4) / 100).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e4) return Math.round(n / 1000) + 'k';
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatMoney(value, unit) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '\u2014';
  const digits = Math.abs(n) >= 1 ? 2 : Math.abs(n) >= 0.01 ? 3 : 4;
  const text = n === 0 ? '0.00' : n.toFixed(digits);
  const symbol = currencySymbol(unit);
  return symbol ? symbol + text : text + ' ' + unit;
}

export async function fetchState(sessionId) {
  const query = sessionId ? '?session=' + encodeURIComponent(sessionId) : '';
  const response = await window.fetch('/dsh-ledger-kitty/state' + query, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('state ' + response.status);
  return response.json();
}
