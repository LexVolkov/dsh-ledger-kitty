/** CNY per million tokens, off-peak. */
export const PRICING = {
  'deepseek-flash': { hit: 0.02, miss: 1, out: 4 },
  'deepseek-v4-pro': { hit: 0.15, miss: 4.5, out: 13.5 },
};

export function modelKey(model) {
  const name = String(model || '').toLowerCase();
  return name.includes('pro') ? 'deepseek-v4-pro' : 'deepseek-flash';
}

export function isPeak(timeMs) {
  // Beijing is UTC+8 all year: shift the instant and read UTC fields.
  const shifted = new Date(timeMs + 8 * 3600 * 1000);
  const day = shifted.getUTCDay();
  if (day === 0 || day === 6) return false;
  const hour = shifted.getUTCHours() + shifted.getUTCMinutes() / 60;
  return (hour >= 9 && hour < 12) || (hour >= 14 && hour < 18);
}

export function tokenTotal(usage) {
  return (
    (usage.inputTokens || 0) +
    (usage.outputTokens || 0) +
    (usage.cacheReadTokens || 0) +
    (usage.cacheWriteTokens || 0)
  );
}

export function costOf(model, usage, timeMs) {
  const price = PRICING[modelKey(model)];
  const multiplier = isPeak(timeMs) ? 2 : 1;
  const miss = (usage.inputTokens || 0) + (usage.cacheWriteTokens || 0);
  const hit = usage.cacheReadTokens || 0;
  const out = usage.outputTokens || 0;
  return ((miss * price.miss + hit * price.hit + out * price.out) * multiplier) / 1e6;
}

/** Both DeepSeek models advertise a 1M combined context window. */
export const CONTEXT_WINDOW = 1e6;
const CONTEXT_WINDOWS = { 'deepseek-flash': 1e6, 'deepseek-v4-pro': 1e6 };

export function contextWindowFor(model) {
  return CONTEXT_WINDOWS[modelKey(model)] || CONTEXT_WINDOW;
}

/** Money the cache hit rate saved versus paying the cache-miss price. */
export function cacheSaved(model, usage, timeMs) {
  const price = PRICING[modelKey(model)];
  const multiplier = isPeak(timeMs) ? 2 : 1;
  const hit = usage.cacheReadTokens || 0;
  return (hit * (price.miss - price.hit) * multiplier) / 1e6;
}

const DAY_MS = 24 * 3600 * 1000;
const HOUR_MS = 3600 * 1000;
const BEIJING_OFFSET = 8 * HOUR_MS;
const PEAK_MARKS = [9, 12, 14, 18];

/**
 * Epoch milliseconds of the next peak/off-peak transition, or null when none is
 * found (only possible far outside any weekday window).
 */
export function peakChangeAt(timeMs) {
  const shifted = timeMs + BEIJING_OFFSET;
  const midnight = Math.floor(shifted / DAY_MS) * DAY_MS;
  for (let day = 0; day <= 8; day += 1) {
    const base = midnight + day * DAY_MS;
    const weekday = new Date(base).getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    for (const hour of PEAK_MARKS) {
      const at = base + hour * HOUR_MS;
      if (at > shifted) return at - BEIJING_OFFSET;
    }
  }
  return null;
}
