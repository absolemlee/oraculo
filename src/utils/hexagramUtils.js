/**
 * Convert 6-bit array to lower/upper trigram keys.
 * @param {number[]} bits - [bit1,...,bit6]
 */
export function extractTrigrams(bits) {
  const keys = ['kun','kan','gen','xun','li','dui','zhen','qian'];
  function toKey(arr) {
    const idx = arr[0]*4 + arr[1]*2 + arr[2]*1;
    return keys[idx];
  }
  return [ toKey(bits.slice(0,3)), toKey(bits.slice(3,6)) ];
}

/** Flip bits marked as moving */
export function applyTransform(cells) {
  return cells.map(c => c.moving ? (c.value ^ 1) : c.value);
}

/** Check for any moving lines */
export function hasMoving(cells) {
  return cells.some(c => c.moving);
}
