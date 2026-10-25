const BALANCE_TTL_MS = 30000;

/**
 * Wallet balances from the DSH account login, cached for 30 seconds.
 * Returns `{ value, reason }` so the browser half can say *why* there is no
 * number: no account service, nobody signed in, or a request failure.
 */
export function createBalanceReader(ctx) {
  const cache = { at: 0, result: null };

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
      if (response && response.status === 'ready') {
        const wallets = [].concat(Array.isArray(response.value) ? response.value : []);
        const bonus = Array.isArray(response.bonusWallets) ? response.bonusWallets : [];
        const byCurrency = {};
        for (const wallet of wallets.concat(bonus)) {
          if (!wallet || !wallet.currency) continue;
          const amount = Number(wallet.balance);
          if (!Number.isFinite(amount)) continue;
          byCurrency[wallet.currency] = (byCurrency[wallet.currency] || 0) + amount;
        }
        const value = {
          CNY: Object.prototype.hasOwnProperty.call(byCurrency, 'CNY') ? byCurrency.CNY : null,
          USD: Object.prototype.hasOwnProperty.call(byCurrency, 'USD') ? byCurrency.USD : null,
        };
        result = { value: value, reason: 'ok' };
      } else {
        result = { value: null, reason: 'signed-out' };
      }
    } catch (error) {
      result = { value: null, reason: 'error' };
    }
    cache.at = Date.now();
    cache.result = result;
    return result;
  };
}
