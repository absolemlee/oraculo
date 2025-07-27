import { extractTrigrams, applyTransform, hasMoving, HexagramCell } from './hexagramUtils';
import { trigramToIfa, TrigramKey } from './ifaMapping';
import { renderIfaPattern } from './ifaRenderer';

export interface IfaOdu {
  name: string;
  glyph: string;
}

export interface IfaPair {
  primary: IfaOdu;
  secondary: IfaOdu;
}

/**
 * Return primary and secondary odù with names & glyphs
 * @param {HexagramCell[]} cells
 */
export function mapHexagramToIfaPair(cells: HexagramCell[]): IfaPair {
  // original
  const bits = cells.map(c => c.value);
  const [low1, up1] = extractTrigrams(bits);
  const o1 = trigramToIfa[low1 as TrigramKey];
  const o2 = trigramToIfa[up1 as TrigramKey];
  const first = {
    name: `${o1.name} + ${o2.name}`,
    glyph: `${renderIfaPattern(o1.pattern)}\n---\n${renderIfaPattern(o2.pattern)}`
  };

  // secondary
  let second: IfaOdu;
  if (hasMoving(cells)) {
    const tBits = applyTransform(cells);
    const [low2, up2] = extractTrigrams(tBits);
    const p1 = trigramToIfa[low2 as TrigramKey];
    const p2 = trigramToIfa[up2 as TrigramKey];
    second = {
      name: `${p1.name} + ${p2.name}`,
      glyph: `${renderIfaPattern(p1.pattern)}\n---\n${renderIfaPattern(p2.pattern)}`
    };
  } else {
    second = first;
  }

  return { primary: first, secondary: second };
}
