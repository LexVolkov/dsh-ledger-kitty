import { accumulate, seed } from './ledger.js';
import { createBalanceReader } from './balance.js';
import { createRatesReader } from './rates.js';
import { registerStateRoute } from './route.js';

// `session/event` is listened to from the root context (events bubble), so the
// only hard dependency is the HTTP carrier; the account service is optional.
export const inject = ['webServer'];

export function apply(ctx) {
  const sessions = new Map();
  const readBalance = createBalanceReader(ctx);
  const readRates = createRatesReader();

  ctx.on('session/event', (session, event) => {
    if (!event) return;
    const id = session && (session.sessionId || session.id);
    if (!id) return;
    if (!sessions.has(id)) seed(sessions, session, id, event.seq);
    if (event.type !== 'assistant/message') return;
    accumulate(sessions, id, event);
  });

  ctx.effect(() => registerStateRoute(ctx, { sessions, readBalance, readRates }));
}
