import { h, getReact } from '../runtime.js';
import { writeStore } from '../store.js';
import { CSS } from '../styles.js';

function recordFailure(scope, error) {
  const message = String((error && error.message) || error).slice(0, 300);
  writeStore('dsh-ledger-kitty:error', { scope: scope, message: message, at: Date.now() });
  if (window.console && window.console.error) window.console.error('[dsh-ledger-kitty] ' + scope, error);
  return message;
}

let cached = null;

/**
 * Error boundaries have to extend React.Component, which only exists after
 * `initRuntime()`, so the classes are built on first use instead of at module
 * evaluation time.
 */
export function getBoundaries() {
  if (cached) return cached;
  const React = getReact();

  class ReactionBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { failed: false };
    }

    static getDerivedStateFromError() {
      return { failed: true };
    }

    componentDidCatch(error) {
      recordFailure('reactions', error);
    }

    render() {
      return this.state.failed ? null : this.props.children;
    }
  }

  class PetBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { failed: false, message: '' };
    }

    static getDerivedStateFromError(error) {
      return { failed: true, message: recordFailure('pet', error) };
    }

    componentDidCatch(error) {
      recordFailure('pet', error);
    }

    render() {
      if (this.state.failed) {
        return h('div', { className: 'dpp-root' },
          h('style', null, CSS),
          h('div', { className: 'dpp-fallback' }, 'котёнок не запустился: ' + this.state.message),
        );
      }
      return this.props.children;
    }
  }

  cached = { ReactionBoundary, PetBoundary };
  return cached;
}
