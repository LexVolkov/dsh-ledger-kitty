import { PET_W, PET_H, MARGIN, SNAP_ZONE, FLOOR_MARGIN } from './constants.js';

export function clampPos(pos, scale) {
  const width = PET_W * scale;
  const height = PET_H * scale;
  const maxLeft = Math.max(MARGIN, window.innerWidth - width - MARGIN);
  const maxTop = Math.max(MARGIN, window.innerHeight - height - MARGIN);
  const left = Number(pos && pos.left);
  const top = Number(pos && pos.top);
  return {
    left: Math.min(Math.max(MARGIN, Number.isFinite(left) ? left : maxLeft), maxLeft),
    top: Math.min(Math.max(MARGIN, Number.isFinite(top) ? top : maxTop), maxTop),
  };
}

export function defaultPos(scale) {
  // Bottom edge: the cat stands on the "floor" of the window instead of
  // hovering in the middle of the conversation.
  return {
    left: Math.max(MARGIN, window.innerWidth - PET_W * scale - 16),
    top: Math.max(MARGIN, window.innerHeight - PET_H * scale - FLOOR_MARGIN),
  };
}

export function snapToEdge(pos, scale) {
  const width = PET_W * scale;
  const height = PET_H * scale;
  let left = pos.left;
  let top = pos.top;
  const rightGap = window.innerWidth - (left + width);
  if (left <= SNAP_ZONE) left = MARGIN + 2;
  else if (rightGap <= SNAP_ZONE) left = Math.max(MARGIN, window.innerWidth - width - MARGIN - 2);
  if (window.innerHeight - (top + height) <= SNAP_ZONE) {
    top = Math.max(MARGIN, window.innerHeight - height - FLOOR_MARGIN);
  }
  return { left: left, top: top };
}
