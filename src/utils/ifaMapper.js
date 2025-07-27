import { extractTrigrams, applyTransform, hasMoving } from './hexagramUtils';
import { trigramToIfa } from './ifaMapping';
import { renderIfaPattern } from './ifaRenderer';

/**
 * Return primary and secondary odù with names & glyphs
 * @param {{value:0|1,moving:boolean}[]} cells
 */
export function mapHexagramToIfaPair(cells) {
  // original
  const bits = cells.map(c => c.value);
  const [low1, up1] = extractTrigrams(bits);
  const o1 = trigramToIfa[low1];
  const o2 = trigramToIfa[up1];
  const first = {
    name: `${o1.name} + ${o2.name}`,
    glyph: `${renderIfaPattern(o1.pattern)}\n---\n${renderIfaPattern(o2.pattern)}`
  };

  // secondary
  let second;
  if (hasMoving(cells)) {
    const tBits = applyTransform(cells);
    const [low2, up2] = extractTrigrams(tBits);
    const p1 = trigramToIfa[low2];
    const p2 = trigramToIfa[up2];
    second = {
      name: `${p1.name} + ${p2.name}`,
      glyph: `${renderIfaPattern(p1.pattern)}\n---\n${renderIfaPattern(p2.pattern)}`
    };
  } else {
    second = first;
  }

  return { primary: first, secondary: second };
}
