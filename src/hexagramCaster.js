import { mapHexagramToIfaPair } from './utils/ifaMapper';

// Example: generateLines() should return [{value, moving}, ...]
export function castHexagram(generateLines, interpretHexagram) {
  const cells = generateLines(); // [{value, moving},...]
  const hex = interpretHexagram(cells);
  const { primary, secondary } = mapHexagramToIfaPair(cells);

  return {
    hexagram: hex,
    ifa: {
      primaryName: primary.name,
      primaryGlyph: primary.glyph,
      secondaryName: secondary.name,
      secondaryGlyph: secondary.glyph
    }
  };
}
