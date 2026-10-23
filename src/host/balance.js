const BALANCE_TTL_MS = 30000;

/**
 * Wallet balances from the DSH account login, cached for 30 seconds.
 * Returns null when the account service is absent or nobody is signed in.
 */
export function createBalanceReader(ctx) {
  const cache = { at: 0, value: null };

  return async function readBalance() {
    const account = ctx.get('deepseekAccount');
    if (!account) return null;
    if (Date.now() - cache.at < BALANCE_TTL_MS) return cache.value;
    let value = null;
    try {
      const meta = {
        version: '0.1.0',
        locale: 'en-US',
        timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60,
      };
      const result = await account.getBalance(meta);
      if (result && result.status === 'ready') {
        const wallets = [].concat(Array.isArray(result.value) ? result.value : []);
        const bonus = Array.isArray(result.bonusWallets) ? result.bonusWallets : [];
        const byCurrency = {};
        for (const wallet of wallets.concat(bonus)) {
          if (!wallet || !wallet.currency) continue;
          const amount = Number(wallet.balance);
          if (!Number.isFinite(amount)) continue;
          byCurrency[wallet.currency] = (byCurrency[wallet.currency] || 0) + amount;
        }
        value = {
          CNY: Object.prototype.hasOwnProperty.call(byCurrency, 'CNY') ? byCurrency.CNY : null,
          USD: Object.prototype.hasOwnProperty.call(byCurrency, 'USD') ? byCurrency.USD : null,
        };
      }
    } catch (error) {
      value = null;
    }
    cache.at = Date.now();
    cache.value = value;
    return value;
  };
}
