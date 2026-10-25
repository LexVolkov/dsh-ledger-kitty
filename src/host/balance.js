const BALANCE_TTL_MS = 30000;

/**
 * Wallet balances from the DSH account login.
 *
 * The account service reports several different situations and they must not be
 * conflated: no stored credential (`null`), a rejected/expired credential
 * (`error.code === 'expired'`), or a failed request (`{ status: 'failed' }`).
 * Only the first two mean "sign in"; the rest are temporary problems that the
 * next poll can fix, so they are never cached.
 */
export function createBalanceReader(ctx) {
  const cache = { at: 0, result: null };

  async function stateReason(account) {
    try {
      const state = await account.getState();
      return state && state.status === 'signed-out' ? 'signed-out' : 'error';
    } catch (error) {
      return 'error';
    }
  }

  return async function readBalance() {
    const account = ctx.get('deepseekAccount');
    if (!account) return { value: null, reason: 'no-account' };
    if (cache.result && Date.now() - cache.at < BALANCE_TTL_MS) return cache.result;

    let result;
    try {
      const meta = {
        version: '0.1.0',
        locale: 'en-US',
        timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60,
      };
      const response = await account.getBalance(meta);
      if (response == null) {
        result = { value: null, reason: await stateReason(account) };
      } else if (response.status === 'ready') {
        const wallets = [].concat(Array.isArray(response.value) ? response.value : []);
        const bonus = Array.isArray(response.bonusWallets) ? response.bonusWallets : [];
        const byCurrency = {};
        for (const wallet of wallets.concat(bonus)) {
          if (!wallet || !wallet.currency) continue;
          const amount = Number(wallet.balance);
          if (!Number.isFinite(amount)) continue;
          byCurrency[wallet.currency] = (byCurrency[wallet.currency] || 0) + amount;
        }
        result = {
          value: {
            CNY: Object.prototype.hasOwnProperty.call(byCurrency, 'CNY') ? byCurrency.CNY : null,
            USD: Object.prototype.hasOwnProperty.call(byCurrency, 'USD') ? byCurrency.USD : null,
          },
          reason: 'ok',
        };
      } else {
        // `{ status: 'failed' }`: the request did not go through; not a sign-out.
        result = { value: null, reason: 'error' };
      }
    } catch (error) {
      result = {
        value: null,
        reason: error && error.code === 'expired' ? 'signed-out' : await stateReason(account),
      };
    }

    // Cache only a real answer: a failure must be retried on the next poll.
    if (result.reason === 'ok') {
      cache.at = Date.now();
      cache.result = result;
    }
    return result;
  };
}
