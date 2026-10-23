import { h } from '../runtime.js';

const SVG_PROPS = {
  viewBox: '0 0 120 140',
  className: 'dpp-svg',
  'aria-hidden': 'true',
  focusable: 'false',
};

const OUTLINE = '#C9D4E3';

export function CatArt(state) {
  const gazeX = state.sleeping ? 0 : state.gaze.x;
  const focusY = state.busy ? 1.4 : 0;
  const waitingY = state.waiting ? -1.2 : 0;
  const gazeY = (state.sleeping ? 0 : state.gaze.y) + focusY + waitingY;
  const pupilShift = 'translate(' + gazeX + ' ' + gazeY + ')';

  return h('svg', SVG_PROPS,
    h('defs', null,
      h('linearGradient', { id: 'dpp-fur', x1: '0', y1: '0', x2: '0', y2: '1' },
        h('stop', { offset: '0', stopColor: '#FFFFFF' }),
        h('stop', { offset: '1', stopColor: '#E9EFF8' }),
      ),
      h('linearGradient', { id: 'dpp-iris', x1: '0', y1: '0', x2: '0', y2: '1' },
        h('stop', { offset: '0', stopColor: '#A9DCF7' }),
        h('stop', { offset: '1', stopColor: '#4E93D8' }),
      ),
      h('radialGradient', { id: 'dpp-belly', cx: '50%', cy: '45%', r: '70%' },
        h('stop', { offset: '0', stopColor: '#FFFFFF' }),
        h('stop', { offset: '1', stopColor: '#F2F6FB' }),
      ),
    ),

    h('ellipse', { className: 'dpp-shadow', cx: 60, cy: 134, rx: 31, ry: 5.5, fill: '#000000', opacity: 0.14 }),

    h('g', { className: 'dpp-tail' },
      h('path', {
        d: 'M84 114 C104 112 114 98 110 80 C107 66 96 60 88 68 C96 74 101 82 99 91 C97 101 90 106 83 106 Z',
        fill: 'url(#dpp-fur)', stroke: OUTLINE, strokeWidth: 1.4, strokeLinejoin: 'round',
      }),
      h('path', {
        d: 'M101 102 C107 95 107 84 101 77',
        fill: 'none', stroke: '#E6ECF6', strokeWidth: 2.2, strokeLinecap: 'round',
      }),
    ),

    h('g', { className: 'dpp-leg-bl' },
      h('ellipse', { cx: 43, cy: 124, rx: 11, ry: 9, fill: '#F5F8FD', stroke: OUTLINE, strokeWidth: 1.2 }),
      h('ellipse', { cx: 43, cy: 128, rx: 9.4, ry: 5, fill: '#C9D3E1' }),
    ),
    h('g', { className: 'dpp-leg-br' },
      h('ellipse', { cx: 77, cy: 124, rx: 11, ry: 9, fill: '#F5F8FD', stroke: OUTLINE, strokeWidth: 1.2 }),
      h('ellipse', { cx: 77, cy: 128, rx: 9.4, ry: 5, fill: '#C9D3E1' }),
    ),

    h('g', { className: 'dpp-body-g' },
      h('ellipse', {
        cx: 60, cy: 104, rx: 28, ry: 29,
        fill: 'url(#dpp-fur)', stroke: OUTLINE, strokeWidth: 1.4,
      }),
      h('ellipse', { cx: 60, cy: 108, rx: 17, ry: 16, fill: 'url(#dpp-belly)' }),

      h('g', { className: 'dpp-leg-fl' },
        h('rect', {
          x: 45, y: 109, width: 9, height: 23, rx: 4.5,
          fill: '#FFFFFF', stroke: OUTLINE, strokeWidth: 1.2,
        }),
        h('rect', { x: 45, y: 123.4, width: 9, height: 8.6, rx: 4.2, fill: '#C9D3E1' }),
        h('ellipse', { cx: 49.5, cy: 132, rx: 6, ry: 3.4, fill: '#C9D3E1', stroke: OUTLINE, strokeWidth: 1.1 }),
      ),
      h('g', { className: 'dpp-leg-fr' },
        h('rect', {
          x: 66, y: 109, width: 9, height: 23, rx: 4.5,
          fill: '#FFFFFF', stroke: OUTLINE, strokeWidth: 1.2,
        }),
        h('rect', { x: 66, y: 123.4, width: 9, height: 8.6, rx: 4.2, fill: '#C9D3E1' }),
        h('ellipse', { cx: 70.5, cy: 132, rx: 6, ry: 3.4, fill: '#C9D3E1', stroke: OUTLINE, strokeWidth: 1.1 }),
      ),
    ),

    h('g', { className: 'dpp-ear-l' },
      h('path', {
        d: 'M36 40 C31 30 26 20 22 12 C33 15 46 25 53 33 Z',
        fill: 'url(#dpp-fur)', stroke: OUTLINE, strokeWidth: 1.4, strokeLinejoin: 'round',
      }),
      h('path', { d: 'M38 37 C34 30 31 24 28 18 C36 21 45 28 50 34 Z', fill: '#F7B8C4' }),
    ),
    h('g', { className: 'dpp-ear-r' },
      h('path', {
        d: 'M84 40 C89 30 94 20 98 12 C87 15 74 25 67 33 Z',
        fill: 'url(#dpp-fur)', stroke: OUTLINE, strokeWidth: 1.4, strokeLinejoin: 'round',
      }),
      h('path', { d: 'M82 37 C86 30 89 24 92 18 C84 21 75 28 70 34 Z', fill: '#F7B8C4' }),
    ),

    h('circle', {
      cx: 60, cy: 58, r: 33,
      fill: 'url(#dpp-fur)', stroke: OUTLINE, strokeWidth: 1.4,
    }),
    h('ellipse', { cx: 60, cy: 74, rx: 25, ry: 15, fill: '#FBFDFF', opacity: 0.85 }),

    h('path', {
      d: 'M28 70 L14 67 M28 74 L13 76 M92 70 L106 67 M92 74 L107 76',
      fill: 'none', stroke: '#DCE4EF', strokeWidth: 1.3, strokeLinecap: 'round',
    }),

    h('g', { className: 'dpp-eyes-open' },
      h('ellipse', { cx: 46, cy: 60, rx: 9.6, ry: 10.8, fill: '#FFFFFF', stroke: OUTLINE, strokeWidth: 1.3 }),
      h('ellipse', { cx: 74, cy: 60, rx: 9.6, ry: 10.8, fill: '#FFFFFF', stroke: OUTLINE, strokeWidth: 1.3 }),
      h('g', { transform: pupilShift },
        h('circle', { cx: 46, cy: 61, r: 7.3, fill: 'url(#dpp-iris)' }),
        h('circle', { cx: 74, cy: 61, r: 7.3, fill: 'url(#dpp-iris)' }),
        h('circle', { cx: 46, cy: 61, r: 3.5, fill: '#22344A' }),
        h('circle', { cx: 74, cy: 61, r: 3.5, fill: '#22344A' }),
        h('circle', { cx: 43.3, cy: 57.4, r: 2.9, fill: '#FFFFFF' }),
        h('circle', { cx: 71.3, cy: 57.4, r: 2.9, fill: '#FFFFFF' }),
        h('circle', { cx: 48.8, cy: 64.6, r: 1.3, fill: '#FFFFFF', opacity: 0.9 }),
        h('circle', { cx: 76.8, cy: 64.6, r: 1.3, fill: '#FFFFFF', opacity: 0.9 }),
      ),
    ),
    h('g', { className: 'dpp-eyes-closed' },
      h('path', { d: 'M37 60 Q46 67 55 60', fill: 'none', stroke: '#3A4A5E', strokeWidth: 2.2, strokeLinecap: 'round' }),
      h('path', { d: 'M65 60 Q74 67 83 60', fill: 'none', stroke: '#3A4A5E', strokeWidth: 2.2, strokeLinecap: 'round' }),
    ),

    h('ellipse', { cx: 33, cy: 74, rx: 6, ry: 3.2, fill: '#F9C6D0', opacity: 0.65 }),
    h('ellipse', { cx: 87, cy: 74, rx: 6, ry: 3.2, fill: '#F9C6D0', opacity: 0.65 }),

    h('path', { d: 'M57 73 Q60 71 63 73 Q60 77 57 73 Z', fill: '#F2A0AE' }),
    h('path', {
      d: 'M60 77 Q56.5 81 53 78 M60 77 Q63.5 81 67 78',
      fill: 'none', stroke: '#B9C6D6', strokeWidth: 1.4, strokeLinecap: 'round',
    }),
  );
}
