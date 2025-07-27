export interface HexagramCell {
  value: 0 | 1;
  moving: boolean;
}

/**
 * Convert 6-bit array to lower/upper trigram keys.
 * @param {number[]} bits - [bit1,...,bit6]
 */
export function extractTrigrams(bits: number[]): [string, string] {
  const keys = ['kun','kan','gen','xun','li','dui','zhen','qian'];
  function toKey(arr: number[]): string {
    const idx = arr[0]*4 + arr[1]*2 + arr[2]*1;
    return keys[idx];
  }
  return [ toKey(bits.slice(0,3)), toKey(bits.slice(3,6)) ];
}

/** Flip bits marked as moving */
export function applyTransform(cells: HexagramCell[]): number[] {
  return cells.map(c => c.moving ? (c.value ^ 1) : c.value);
}

/** Check for any moving lines */
export function hasMoving(cells: HexagramCell[]): boolean {
  return cells.some(c => c.moving);
}

/** Convert traditional I-Ching line values to cell format */
export function convertLinesToCells(lines: number[]): HexagramCell[] {
  const CHANGING_YANG = 9;
  const YANG = 7;
  const YIN = 6;
  const CHANGING_YIN = 8;

  return lines.map(line => ({
    value: (line === YANG || line === CHANGING_YANG) ? 1 : 0,
    moving: (line === CHANGING_YANG || line === CHANGING_YIN)
  })) as HexagramCell[];
}
