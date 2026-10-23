import { h, useState } from '../runtime.js';
import { SIZES, SOUND_KEYS } from '../constants.js';
import { currencyOptions, currencyLabel, currencySymbol } from '../format.js';

export function SettingsPanel(state) {
  const [view, setView] = useState('main');
  const t = state.t;
  const settings = state.settings;
  const rates = state.rates || null;
  const box = state.box || { shift: 0 };

  // Human-readable quote of the live table for the active display unit.
  let quote = t('settings.rate.offline');
  if (rates && Number.isFinite(rates.USD)) {
    if (settings.currency === 'CNY') {
      quote = '1 $ = \u00a5' + (1 / rates.USD).toFixed(2);
    } else if (Number.isFinite(rates[settings.currency])) {
      const value = rates[settings.currency];
      const digits = value >= 100 ? 1 : value >= 1 ? 2 : 3;
      quote = '1 \u00a5 = ' + value.toFixed(digits) + ' ' + (currencySymbol(settings.currency) || settings.currency);
    }
  }

  const panel = {
    className: 'dpp-settings',
    role: 'dialog',
    'aria-label': t('settings.title'),
    ref: state.anchor,
    style: { transform: 'translateX(calc(-50% + ' + box.shift + 'px))' },
    onPointerDown: function (event) { event.stopPropagation(); },
    onDoubleClick: function (event) { event.stopPropagation(); },
    onClick: function (event) { event.stopPropagation(); },
  };

  if (view === 'sounds') {
    return h('div', panel,
      h('div', { className: 'dpp-settings-head' },
        h('button', {
          type: 'button',
          className: 'dpp-back',
          onClick: function () { setView('main'); },
          'aria-label': t('settings.back'),
        }, '\u2190'),
        h('span', { className: 'dpp-settings-title' }, t('settings.sound')),
        h('button', { type: 'button', className: 'dpp-close', onClick: state.onClose, 'aria-label': t('settings.close') }, '\u00d7'),
      ),
      SOUND_KEYS.map(function (key) {
        return h('div', { key: key, className: 'dpp-sound-row' },
          h('button', {
            type: 'button',
            className: 'dpp-play',
            onClick: function () { state.onPreview(key); },
            title: t('sound.preview'),
            'aria-label': t('sound.preview'),
          }, '\u25b6'),
          h('label', { className: 'dpp-sound-toggle' },
            h('span', null, t('sound.' + key)),
            h('input', {
              type: 'checkbox',
              checked: settings.sounds[key] !== false,
              onChange: function (event) { state.onSound(key, event.target.checked); },
            }),
          ),
        );
      }),
      h('div', { className: 'dpp-settings-label' }, t('settings.volume')),
      h('div', { className: 'dpp-volume' },
        h('input', {
          type: 'range',
          min: '0',
          max: '100',
          step: '5',
          value: String(Math.round(settings.volume * 100)),
          onChange: function (event) { state.onVolume(Number(event.target.value) / 100); },
          'aria-label': t('settings.volume'),
        }),
        h('span', null, Math.round(settings.volume * 100) + '%'),
      ),
      h('div', { className: 'dpp-settings-quote' }, t('settings.sound.hint')),
    );
  }

  return h('div', panel,
    h('div', { className: 'dpp-settings-head' },
      h('span', { className: 'dpp-settings-title' }, t('settings.title')),
      h('button', { type: 'button', className: 'dpp-close', onClick: state.onClose, 'aria-label': t('settings.close') }, '\u00d7'),
    ),
    h('div', { className: 'dpp-settings-label' }, t('settings.currency')),
    h('select', {
      className: 'dpp-select',
      value: settings.currency,
      onChange: function (event) { state.onCurrency(event.target.value); },
      'aria-label': t('settings.currency'),
    },
      currencyOptions(rates, settings.currency).map(function (code) {
        return h('option', { key: code, value: code }, currencyLabel(code));
      }),
    ),
    h('div', { className: 'dpp-settings-quote' }, quote),
    h('div', { className: 'dpp-settings-label' }, t('settings.language')),
    h('select', {
      className: 'dpp-select',
      value: settings.language,
      onChange: function (event) { state.onLanguage(event.target.value); },
      'aria-label': t('settings.language'),
    },
      [['en', 'English'], ['ru', '\u0420\u0443\u0441\u0441\u043a\u0438\u0439'], ['uk', '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430']].map(function (pair) {
        return h('option', { key: pair[0], value: pair[0] }, pair[1]);
      }),
    ),
    h('div', { className: 'dpp-settings-label' }, t('settings.size')),
    h('div', { className: 'dpp-seg' },
      SIZES.map(function (value) {
        return h('button', {
          key: String(value),
          type: 'button',
          className: 'dpp-seg-btn' + (state.scale === value ? ' dpp-seg-on' : ''),
          onClick: function () { state.onSize(value); },
        }, String(value) + '\u00d7');
      }),
    ),
    h('button', {
      type: 'button',
      className: 'dpp-settings-link',
      onClick: function () { setView('sounds'); },
    },
      h('span', null, t('settings.sound')),
      h('span', { className: 'dpp-settings-link-arrow' }, '\u2192'),
    ),
  );
}
