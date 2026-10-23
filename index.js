/**
 * Host half of the ledger-kitty bundle.
 *
 * The implementation lives in `src/host/`: a per-session cost ledger folded
 * from `assistant/message` usage, the wallet balance and the FX table, all
 * served on one read-only route so the browser half never sees a credential.
 */
export { apply, inject } from './src/host/index.js';
