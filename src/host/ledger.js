import { costOf, tokenTotal, cacheSaved } from './pricing.js';

export function emptyRow() {
  return { tokens: 0, cost: 0, saved: 0, last: null };
}

/** Fold one `assistant/message` event into a session's ledger row. */
export function accumulate(sessions, id, event) {
  const data = event.data || {};
  const usage = data.usage;
  if (!usage) return;
  const time = typeof event.time === 'number' ? event.time : Date.now();
  const model = data.message && data.message.source ? data.message.source.model : undefined;
  const row = sessions.get(id) || emptyRow();
  const tokens = tokenTotal(usage);
  const cost = costOf(model, usage, time);
  row.tokens += tokens;
  row.cost += cost;
  row.saved += cacheSaved(model, usage, time);
  row.last = {
    tokens: tokens,
    cost: cost,
    at: time,
    model: model || null,
    context: (usage.inputTokens || 0) + (usage.cacheReadTokens || 0) + (usage.cacheWriteTokens || 0),
  };
  sessions.set(id, row);
}

/**
 * Seed one session's ledger from the events it already has, so the "session"
 * number covers the whole open conversation and not just the turns observed
 * since this Host started. `snapshotEvents` is a deprecated read, used once
 * per session here on purpose; any failure just leaves the ledger at zero.
 */
export function seed(sessions, session, id, beforeSeq) {
  try {
    if (typeof session.snapshotEvents !== 'function' || typeof beforeSeq !== 'number') return;
    const events = session.snapshotEvents(0, beforeSeq);
    if (!Array.isArray(events)) return;
    for (const item of events) {
      if (item && item.type === 'assistant/message') accumulate(sessions, id, item);
    }
  } catch (error) {
    /* ledger starts from now */
  }
}
