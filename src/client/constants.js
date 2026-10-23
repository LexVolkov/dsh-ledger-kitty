

export const PET_W = 120;
export const PET_H = 140;
export const SIZES = [0.5, 1, 1.25, 1.5];
export const MARGIN = 8;
export const SNAP_ZONE = 54;
export const FLOOR_MARGIN = 4;
export const SLEEP_AFTER_MS = 60000;
// v2: the cat now lives on the floor. A stored v1 position was mid-air, so it
// is deliberately ignored once instead of being clamped somewhere odd.
export const POS_KEY = 'dsh-ledger-kitty:pos:v2';
export const SIZE_KEY = 'dsh-ledger-kitty:size';
export const SETTINGS_KEY = 'dsh-ledger-kitty:settings';
export const POPULAR_CURRENCIES = ['CNY', 'USD', 'EUR', 'RUB', 'KZT', 'UAH', 'GBP', 'JPY', 'KRW', 'TRY', 'INR', 'BRL'];
export const SOUND_KEYS = ['meow', 'typing', 'receipt', 'question', 'purr'];
export const SYMBOLS = {
  CNY: '\u00a5', USD: '$', EUR: '\u20ac', RUB: '\u20bd', KZT: '\u20b8', UAH: '\u20b4',
  GBP: '\u00a3', JPY: 'JP\u00a5', KRW: '\u20a9', TRY: '\u20ba', INR: '\u20b9', BRL: 'R$',
  CAD: 'C$', AUD: 'A$', CHF: 'CHF', PLN: 'z\u0142', CZK: 'K\u010d', SEK: 'kr', NOK: 'kr', DKK: 'kr',
  SGD: 'S$', HKD: 'HK$', NZD: 'NZ$', THB: '\u0e3f', VND: '\u20ab', IDR: 'Rp', MYR: 'RM',
  PHP: '\u20b1', ILS: '\u20aa', AED: 'AED', SAR: 'SAR', ZAR: 'R', MXN: 'MX$', ARS: 'AR$',
  CLP: 'CL$', COP: 'CO$', PEN: 'S/', EGP: 'E\u00a3', NGN: '\u20a6', PKR: '\u20a8', BDT: '\u09f3',
  LKR: 'Rs', NPR: 'Rs', TWD: 'NT$', HUF: 'Ft', RON: 'lei', BGN: 'lv', HRK: 'kn', ISK: 'kr',
};
