const RATES_URL = 'https://open.er-api.com/v6/latest/CNY';
const RATES_TTL_MS = 6 * 60 * 60 * 1000;
const RETRY_MS = 10 * 60 * 1000;

/**
 * Live FX table, quoted as 1 CNY -> currency. A free keyless endpoint is used
 * on purpose: the feature must work without the user registering anywhere.
 * Cached for six hours; a failure retries in ten minutes, keeps serving the
 * previous table as `stale`, and reports `offline` when nothing was fetched yet.
 */
export function createRatesReader() {
  const cache = { at: 0, result: null, failed: false };

  return async function readRates() {
    const ttl = cache.failed ? RETRY_MS : RATES_TTL_MS;
    if (cache.result && cache.result.value && Date.now() - cache.at < ttl) {
      return { value: cache.result.value, reason: cache.failed ? 'stale' : 'ok' };
    }
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
      cache.failed = false;
      cache.result = { value: picked, reason: 'ok' };
      return cache.result;
    } catch (error) {
      cache.at = Date.now();
      cache.failed = true;
      if (cache.result && cache.result.value) {
        return { value: cache.result.value, reason: 'stale' };
      }
      return { value: null, reason: 'offline' };
    }
  };
}
