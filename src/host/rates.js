const RATES_URL = 'https://open.er-api.com/v6/latest/CNY';
const RATES_TTL_MS = 6 * 60 * 60 * 1000;

/**
 * Live FX table, quoted as 1 CNY -> currency. A free keyless endpoint is used
 * on purpose: the feature must work without the user registering anywhere.
 * Cached for six hours; a failed attempt retries in ten minutes and keeps the
 * previous table (null when nothing was fetched yet).
 */
export function createRatesReader() {
  const cache = { at: 0, value: null };

  return async function readRates() {
    if (cache.value && Date.now() - cache.at < RATES_TTL_MS) return cache.value;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      let response;
      try {
        response = await fetch(RATES_URL, { signal: controller.signal, headers: { accept: 'application/json' } });
      } finally {
        clearTimeout(timer);
      }
      if (!response.ok) throw new Error('rates ' + response.status);
      const body = await response.json();
      const table = body && body.rates;
      if (!table || typeof table !== 'object') throw new Error('rates shape');
      // Keep the whole keyless table: the client offers every quote it can show.
      const picked = {};
      for (const [code, value] of Object.entries(table)) {
        if (!/^[A-Z]{3}$/.test(code) || !Number.isFinite(value) || value <= 0) continue;
        picked[code] = value;
      }
      if (!Number.isFinite(picked.USD)) throw new Error('rates missing USD');
      cache.at = Date.now();
      cache.value = picked;
      return picked;
    } catch (error) {
      cache.at = Date.now() - RATES_TTL_MS + 10 * 60 * 1000;
      return cache.value;
    }
  };
}
