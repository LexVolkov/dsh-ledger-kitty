import { h, initRuntime } from './runtime.js';
import { STRINGS } from './i18n/index.js';
import { getBoundaries } from './ui/boundaries.js';
import { LedgerKitty } from './ui/pet.js';

export function createPlugin(require) {
  initRuntime(require);
  const { PetBoundary } = getBoundaries();

  return {
    inject: ['slots', 'locale'],
    apply(ctx) {
      ctx.locale.register('ledger-kitty', 'en', STRINGS.en);
      ctx.locale.register('ledger-kitty', 'ru', STRINGS.ru);
      try {
        ctx.locale.register('ledger-kitty', 'uk', STRINGS.uk);
      } catch (error) {
        /* the picker still works: STRINGS is read directly */
      }
      try {
        ctx.locale.register('ledger-kitty', 'zh', STRINGS.zh);
      } catch (error) {
        /* the picker still works: STRINGS is read directly */
      }
      const t = ctx.locale.bind('ledger-kitty');
      // The pet follows the app language until the user picks one in settings.
      let defaultLang = 'en';
      try {
        const active = String(ctx.locale.getLocale().active || '').toLowerCase();
        if (active.indexOf('ru') === 0) defaultLang = 'ru';
        else if (active.indexOf('uk') === 0) defaultLang = 'uk';
        else if (active.indexOf('zh') === 0) defaultLang = 'zh';
      } catch (error) {
        /* keep English */
      }

      ctx.slots.inject('shell.overlay', function () {
        return ctx.slots.register({
          name: 'shell.overlay',
          id: 'dsh-ledger-kitty',
          order: 20,
          label: function () {
            return t('aria');
          },
        }, function (slotProps) {
          // Only the two Standard hooks are forwarded: everything else the kit
          // carries is not the pet's business, and a narrower surface is less
          // likely to collide with a future prop name.
          return h(PetBoundary, null,
            h(LedgerKitty, {
              t: t,
              defaultLang: defaultLang,
              useSessions: slotProps.useSessions,
              useSessionStatus: slotProps.useSessionStatus,
            }),
          );
        });
      });
    },
  };
}
