/**
 * Lazy React surface. The bundle is a classic script that runs before the
 * loader materializes it, so React is only imported through the factory's
 * `require` and every binding below is filled by `initRuntime()` before the
 * first render.
 */
export let h = null;
export let useState = null;
export let useEffect = null;
export let useRef = null;
export let useCallback = null;
export let useLayoutEffect = null;

let react = null;

export function initRuntime(require) {
  react = require('react');
  h = react.createElement;
  useState = react.useState;
  useEffect = react.useEffect;
  useRef = react.useRef;
  useCallback = react.useCallback;
  useLayoutEffect = react.useLayoutEffect || react.useEffect;
}

export function getReact() {
  if (!react) throw new Error('ledger-kitty: runtime is not initialized');
  return react;
}
