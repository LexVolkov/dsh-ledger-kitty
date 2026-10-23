import { useEffect, useRef } from './runtime.js';

export function readAgentState(list, statuses) {
  const state = { running: false, waiting: false, anyRunning: false, sessionId: null };
  const mainIds = [];
  const rows = [];
  if (list && list.byId) {
    const ids = Array.isArray(list.ids) ? list.ids : Object.keys(list.byId);
    for (let index = 0; index < ids.length; index += 1) {
      const row = list.byId[ids[index]];
      if (!row) continue;
      rows.push({ id: ids[index], running: Boolean(row.running) });
      if (row.retainedBy && row.retainedBy.mainView > 0) mainIds.push(ids[index]);
    }
  }
  state.sessionId = mainIds.length > 0 ? mainIds[0] : null;
  if (!state.sessionId && rows.length > 0) state.sessionId = rows[0].id;
  function isMain(id) {
    return mainIds.length === 0 || mainIds.indexOf(id) !== -1;
  }
  if (statuses && typeof statuses.forEach === 'function') {
    statuses.forEach(function (status, id) {
      if (!status) return;
      if (status.running) {
        state.anyRunning = true;
        if (isMain(id)) state.running = true;
      }
      if (status.pendingInteraction && isMain(id)) state.waiting = true;
    });
  }
  for (let index = 0; index < rows.length; index += 1) {
    if (!rows[index].running) continue;
    state.anyRunning = true;
    if (isMain(rows[index].id)) state.running = true;
  }
  return state;
}

/* ------------------------------------------------------------------ *
 *  Accountant card: numbers come from the Host route below.
 * ------------------------------------------------------------------ */

const noopHook = function () {
  return null;
};

// The Standard hooks are selector hooks: they REQUIRE a selector and call
// `selector(snapshot)` through uSES. Calling them with no argument throws
// "selector is not a function", which is exactly what took the cat down.
const selectSnapshot = function (snapshot) {
  return snapshot;
};

/**
 * Subscribes to the host's Standard hooks and reports the derived agent
 * state upward. Kept in a child so a hook failure cannot take down the cat.
 */
export function AgentWatcher(props) {
  const useSessions = props.useSessions || noopHook;
  const useSessionStatus = props.useSessionStatus || noopHook;
  const list = useSessions(selectSnapshot);
  const statuses = useSessionStatus(selectSnapshot);
  const last = useRef(null);

  useEffect(function () {
    let next;
    try {
      next = readAgentState(list, statuses);
    } catch (error) {
      return;
    }
    const previous = last.current;
    last.current = next;
    if (
      previous &&
      previous.running === next.running &&
      previous.waiting === next.waiting &&
      previous.anyRunning === next.anyRunning &&
      previous.sessionId === next.sessionId
    ) {
      return;
    }
    props.onChange(next);
  }, [list, statuses, props.onChange]);

  return null;
}
