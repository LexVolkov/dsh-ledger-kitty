import { h } from '../runtime.js';
import { PET_W, PET_H } from '../constants.js';
import { CSS } from '../styles.js';
import { CatArt } from './cat.js';
import { PetCard } from './card.js';
import { SettingsPanel } from './settings.js';
import { AgentWatcher } from '../agent.js';
import { previewSound } from '../audio.js';
import { getBoundaries } from './boundaries.js';

/**
 * The pet's render tree. Everything below comes from the container component:
 * this module only decides what is on screen, never what the pet does.
 */
export function PetView(props) {
  const {
    t, className, pos, scale, card, cardBox, settings, rates, settingsOpen, menuOpen,
    bubble, agent, sleeping, hearts, symbols, hop, gaze, pleased,
    cardAnchor, settingsAnchor, menuAnchor, sessionIdRef, cardRef,
    useSessions, useSessionStatus, onAgent,
    onPointerDown, onPointerMove, onFinishDrag, onKeyDown, onContextMenu,
    onHeadEnter, onHeadMove, onHeadLeave,
    onUpdateSettings, onApplySize, onRefreshCard,
    onOpenSettings, onCloseSettings, onCloseMenu, onCloseCard,
  } = props;
  const { ReactionBoundary } = getBoundaries();

  return h('div', { className: 'dpp-root' },
    h('style', null, CSS),
    h(ReactionBoundary, null,
      h(AgentWatcher, {
        useSessions: useSessions,
        useSessionStatus: useSessionStatus,
        onChange: onAgent,
      }),
    ),
    h('div', {
      className: className,
      style: {
        left: pos.left + 'px',
        top: pos.top + 'px',
        width: PET_W * scale + 'px',
        height: PET_H * scale + 'px',
      },
      role: 'button',
      tabIndex: 0,
      'aria-label': t('aria'),
      title: t('hint'),
      onPointerDown: onPointerDown,
      onPointerMove: onPointerMove,
      onPointerUp: onFinishDrag,
      onPointerCancel: onFinishDrag,
      onContextMenu: onContextMenu,
      onKeyDown: onKeyDown,
    },
      settingsOpen
        ? h(SettingsPanel, {
          t: t,
          settings: settings,
          scale: scale,
          rates: rates,
          box: cardBox,
          anchor: settingsAnchor,
          onCurrency: function (currency) {
            onUpdateSettings({ currency: currency });
          },
          onLanguage: function (language) {
            onUpdateSettings({ language: language });
          },
          onSize: onApplySize,
          onClose: onCloseSettings,
          onSound: function (name, enabled) {
            const next = Object.assign({}, settings.sounds);
            next[name] = enabled;
            onUpdateSettings({ sounds: next });
          },
          onVolume: function (volume) {
            onUpdateSettings({ volume: volume });
          },
          onPreview: function (name) {
            previewSound(name);
          },
        })
        : menuOpen
          ? h('div', {
            className: 'dpp-menu',
            ref: menuAnchor,
            role: 'menu',
            style: { transform: 'translateX(calc(-50% + ' + cardBox.shift + 'px))' },
            onPointerDown: function (event) { event.stopPropagation(); },
            onClick: function (event) { event.stopPropagation(); },
          },
            h('button', {
              type: 'button',
              className: 'dpp-menu-item',
              role: 'menuitem',
              onClick: function () {
                onCloseMenu();
                onRefreshCard('balance', sessionIdRef.current);
              },
            }, t('menu.balance')),
            h('button', {
              type: 'button',
              className: 'dpp-menu-item',
              role: 'menuitem',
              onClick: function () {
                onCloseMenu();
                onOpenSettings();
              },
            }, t('menu.settings')),
          )
          : card
            ? h(PetCard, {
              mode: card.mode,
              data: card.data,
              t: t,
              unit: settings.currency,
              rates: rates,
              box: cardBox,
              anchor: cardAnchor,
              onClose: onCloseCard,
            })
            : bubble
              ? h('div', { className: 'dpp-bubble', role: 'status' }, bubble)
              : null,
      agent.waiting ? h('span', { className: 'dpp-alert', 'aria-hidden': 'true' }, '!') : null,
      h('div', { className: 'dpp-idle' },
        h('div', { key: hop, className: 'dpp-hop' + (hop ? ' dpp-jump' : '') },
          CatArt({
            gaze: gaze,
            sleeping: sleeping,
            busy: agent.running,
            waiting: agent.waiting,
          }),
        ),
      ),
      h('div', {
        className: 'dpp-head',
        onPointerEnter: onHeadEnter,
        onPointerMove: onHeadMove,
        onPointerLeave: onHeadLeave,
      }),
      symbols.map(function (item) {
        return h('span', {
          key: 'sym-' + item.id,
          className: 'dpp-symbol',
          style: { marginLeft: item.dx + 'px' },
        }, item.glyph);
      }),
      hearts.map(function (heart) {
        return h('span', {
          key: heart.id,
          className: 'dpp-heart',
          style: { marginLeft: heart.dx + 'px' },
        }, '\u2665');
      }),
      sleeping ? h('span', { className: 'dpp-zzz' }, 'z z') : null,
    ),
  );
}
