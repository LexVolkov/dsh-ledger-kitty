import { isPeak, peakChangeAt, contextWindowFor, CONTEXT_WINDOW } from './pricing.js';
import { emptyRow } from './ledger.js';

export const ROUTE_PATH = '/dsh-ledger-kitty/state';

/**
 * One read-only JSON route for the browser half: the session ledger plus the
 * wallet balance and the FX table. Served by the Host, so no credential ever
 * reaches the page. Each optional part carries a `reason` so the card can say
 * what exactly is missing instead of a bare dash.
 */
export function registerStateRoute(ctx, deps) {
  return ctx.webServer.register({
    kind: 'exact',
    path: ROUTE_PATH,
    handler: async (request, response) => {
      let payload;
      try {
        const url = new URL(request.url || '/', 'http://dsh.invalid');
        const id = url.searchParams.get('session') || '';
        const row = deps.sessions.get(id) || emptyRow();
        const results = await Promise.all([deps.readBalance(), deps.readRates()]);
        const now = Date.now();
        payload = {
          ok: true,
          balance: results[0].value,
          balanceReason: results[0].reason,
          rates: results[1].value,
          ratesReason: results[1].reason,
          session: { tokens: row.tokens, cost: row.cost, saved: row.saved, last: row.last },
          peak: isPeak(now),
          nextChangeAt: peakChangeAt(now),
          contextWindow: row.last && row.last.model ? contextWindowFor(row.last.model) : CONTEXT_WINDOW,
        };
      } catch (error) {
        payload = {
          ok: false,
          reason: 'error',
          balance: null,
          balanceReason: 'error',
          rates: null,
          ratesReason: 'error',
          session: emptyRow(),
          peak: isPeak(Date.now()),
          nextChangeAt: null,
          contextWindow: CONTEXT_WINDOW,
        };
      }
      const body = JSON.stringify(payload);
      response.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'content-length': Buffer.byteLength(body),
      });
      response.end(body);
    },
  });
}
