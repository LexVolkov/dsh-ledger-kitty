import { h } from '../runtime.js';
import { cnyToUnit, balanceToCny, formatTokens, formatMoney } from '../format.js';

function formatDuration(ms, t) {
  const total = Math.max(1, Math.round(ms / 60000));
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return hours > 0
    ? t('time.hm').replace('{h}', hours).replace('{m}', minutes)
    : t('time.m').replace('{m}', minutes);
}

export function PetCard(state) {
  const t = state.t;
  const unit = typeof state.unit === 'string' && state.unit ? state.unit : 'CNY';
  const rates = state.rates || null;
  const data = state.data || {};
  const session = data.session || {};
  const last = session.last || {};
  const balance = data.balance || {};
  const cashCny = balanceToCny(balance, rates);
  const cash = cnyToUnit(cashCny, unit, rates);
  const box = state.box || { shift: 0, tail: 80 };
  const rows = [];

  const saved = Number(session.saved) || 0;
  const contextTokens = Number(last.context) || 0;
  const windowTokens = Number(data.contextWindow) || 1e6;
  const percent = windowTokens > 0 ? Math.min(100, Math.round((contextTokens / windowTokens) * 100)) : 0;

  function pushPeak() {
    const nextAt = Number(data.nextChangeAt);
    const remain = Number.isFinite(nextAt) ? nextAt - Date.now() : null;
    const status = data.peak ? t('peak.peak') : t('peak.off');
    const text = remain == null ? status : status + ' \u00b7 ' + t('peak.in').replace('{time}', formatDuration(remain, t));
    rows.push(h('div', { key: 'pk', className: 'dpp-card-foot' }, text));
  }

  if (state.mode === 'receipt') {
    rows.push(h('div', { key: 'a1', className: 'dpp-card-label' }, t('card.answer')));
    rows.push(h('div', { key: 'a2', className: 'dpp-card-row' },
      h('span', null, formatTokens(last.tokens) + ' ' + t('card.tokens')),
      h('span', { className: 'dpp-card-sum' }, formatMoney(cnyToUnit(last.cost, unit, rates), unit)),
    ));
    rows.push(h('div', { key: 's1', className: 'dpp-card-label dpp-card-gap' }, t('card.session')));
    rows.push(h('div', { key: 's2', className: 'dpp-card-row' },
      h('span', null, formatTokens(session.tokens) + ' ' + t('card.tokens')),
      h('span', { className: 'dpp-card-sum' }, formatMoney(cnyToUnit(session.cost, unit, rates), unit)),
    ));
    if (saved > 0) {
      rows.push(h('div', { key: 'sv', className: 'dpp-card-row' },
        h('span', null, t('card.saved')),
        h('span', { className: 'dpp-card-saved' }, '\u2212' + formatMoney(cnyToUnit(saved, unit, rates), unit)),
      ));
    }
    rows.push(h('div', { key: 'cx', className: 'dpp-card-row' },
      h('span', null, t('card.context')),
      h('span', { className: 'dpp-card-sum' }, formatTokens(contextTokens) + ' \u00b7 ' + percent + '%'),
    ));
    rows.push(h('div', { key: 'sep', className: 'dpp-card-sep' }));
    rows.push(h('div', { key: 'b1', className: 'dpp-card-total' },
      h('span', null, t('card.balance')),
      h('span', null, cash == null ? t('card.unavailable') : formatMoney(cash, unit)),
    ));
    pushPeak();
  } else {
    rows.push(h('div', { key: 'label', className: 'dpp-card-label' }, t('card.balance')));
    rows.push(h('div', { key: 'value', className: 'dpp-card-value' },
      cash == null ? t('card.unavailable') : formatMoney(cash, unit)));
    if (session.tokens || session.cost) {
      rows.push(h('div', { key: 'sep', className: 'dpp-card-sep' }));
      rows.push(h('div', { key: 's1', className: 'dpp-card-label' }, t('card.session')));
      rows.push(h('div', { key: 's2', className: 'dpp-card-row' },
        h('span', null, formatTokens(session.tokens) + ' ' + t('card.tokens')),
        h('span', { className: 'dpp-card-sum' }, formatMoney(cnyToUnit(session.cost, unit, rates), unit)),
      ));
    }
    pushPeak();
  }

  return h('div', {
    className: 'dpp-card',
    ref: state.anchor,
    style: { transform: 'translateX(calc(-50% + ' + box.shift + 'px))' },
    onPointerDown: function (event) { event.stopPropagation(); },
    onClick: function (event) { event.stopPropagation(); },
  },
    rows,
    h('button', {
      key: 'close',
      type: 'button',
      className: 'dpp-card-close',
      'aria-label': t('card.close'),
      onClick: function () { state.onClose(); },
    }, '\u00d7'),
    h('div', { key: 'tail', className: 'dpp-card-tail', style: { left: box.tail + 'px' } }),
  );
}
