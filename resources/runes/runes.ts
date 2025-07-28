// Elder Futhark Runes - Complete set of 24 runes
export interface Rune {
  id: number;
  name: string;
  symbol: string;
  meaning: string;
  description: string;
  keywords: string[];
  element?: string;
  aett: 'freyr' | 'hagal' | 'tyr'; // The three aetts (groups of 8)
  divination: {
    upright: string;
    reversed: string;
  };
}

export const elderFutharkRunes: Rune[] = [
  // First Aett - Freyr's Aett (Agricultural/Material)
  {
    id: 1,
    name: "Fehu",
    symbol: "ᚠ",
    meaning: "Cattle, Wealth",
    description: "Represents wealth, abundance, and material possessions. The foundation of prosperity.",
    keywords: ["wealth", "prosperity", "abundance", "material success", "resources"],
    element: "Fire",
    aett: "freyr",
    divination: {
      upright: "Financial gain, abundance flowing your way, new opportunities for prosperity. Your efforts are about to bear fruit.",
      reversed: "Financial loss, greed, poverty consciousness, missed opportunities. Be careful with money and possessions."
    }
  },
  {
    id: 2,
    name: "Uruz",
    symbol: "ᚢ",
    meaning: "Aurochs, Strength",
    description: "The wild ox represents raw strength, vitality, and untamed power.",
    keywords: ["strength", "vitality", "courage", "determination", "primal power"],
    element: "Earth",
    aett: "freyr",
    divination: {
      upright: "Physical strength, good health, courage to face challenges. Raw power and determination will see you through.",
      reversed: "Weakness, poor health, lack of motivation. Misdirected force or brutality. Take care of your health."
    }
  },
  {
    id: 3,
    name: "Thurisaz",
    symbol: "ᚦ",
    meaning: "Giant, Thorn",
    description: "Represents conflict, destruction, but also protection and defense.",
    keywords: ["conflict", "protection", "defense", "destruction", "challenge"],
    element: "Fire",
    aett: "freyr",
    divination: {
      upright: "Conflict ahead, but also protection. A challenge that strengthens you. Consider your defenses.",
      reversed: "Malicious gossip, betrayal, danger from enemies. Avoid confrontation and be diplomatic."
    }
  },
  {
    id: 4,
    name: "Ansuz",
    symbol: "ᚨ",
    meaning: "Divine Breath, Odin",
    description: "The breath of the gods, divine communication, wisdom, and inspiration.",
    keywords: ["communication", "wisdom", "inspiration", "divine message", "truth"],
    element: "Air",
    aett: "freyr",
    divination: {
      upright: "Divine wisdom coming through, important message or communication. Listen carefully to advice.",
      reversed: "Miscommunication, lies, manipulation. Be wary of false prophets and misinformation."
    }
  },
  {
    id: 5,
    name: "Raidho",
    symbol: "ᚱ",
    meaning: "Journey, Wheel",
    description: "Represents travel, journey, both physical and spiritual movement.",
    keywords: ["journey", "travel", "movement", "progress", "rhythm"],
    element: "Air",
    aett: "freyr",
    divination: {
      upright: "A journey is beginning, progress and forward movement. Trust the process and enjoy the ride.",
      reversed: "Delays in travel, stagnation, missed connections. Internal journey needed before external movement."
    }
  },
  {
    id: 6,
    name: "Kenaz",
    symbol: "ᚲ",
    meaning: "Torch, Knowledge",
    description: "The torch that illuminates darkness, representing knowledge, creativity, and inspiration.",
    keywords: ["knowledge", "creativity", "inspiration", "illumination", "skill"],
    element: "Fire",
    aett: "freyr",
    divination: {
      upright: "New knowledge or skill, creative inspiration, enlightenment. Your talents are recognized.",
      reversed: "False knowledge, creative blocks, ignorance. Arrogance or misuse of skills."
    }
  },
  {
    id: 7,
    name: "Gebo",
    symbol: "ᚷ",
    meaning: "Gift, Exchange",
    description: "Represents gifts, generosity, and the balance of giving and receiving.",
    keywords: ["gift", "generosity", "balance", "partnership", "exchange"],
    element: "Air",
    aett: "freyr",
    divination: {
      upright: "Gifts coming your way, generous partnerships, balanced exchange. Harmony in relationships.",
      reversed: "Greed, selfishness, imbalance in giving/receiving. Obligations and debts."
    }
  },
  {
    id: 8,
    name: "Wunjo",
    symbol: "ᚹ",
    meaning: "Joy, Perfection",
    description: "Pure joy, happiness, and the fulfillment that comes from harmony.",
    keywords: ["joy", "happiness", "harmony", "fulfillment", "success"],
    element: "Earth",
    aett: "freyr",
    divination: {
      upright: "Joy and happiness, success and fulfillment. A time of harmony and well-being.",
      reversed: "Sorrow, disappointment, delays in happiness. Discord and disharmony."
    }
  },

  // Second Aett - Hagal's Aett (Cosmic/Elemental)
  {
    id: 9,
    name: "Hagalaz",
    symbol: "ᚺ",
    meaning: "Hail, Destruction",
    description: "Destructive forces of nature, but also cleansing and renewal.",
    keywords: ["destruction", "cleansing", "renewal", "disruption", "natural forces"],
    element: "Water",
    aett: "hagal",
    divination: {
      upright: "Sudden disruption, but necessary change. Destruction leads to renewal and growth.",
      reversed: "Natural disaster, uncontrolled destruction, chaos. Stagnation and inability to change."
    }
  },
  {
    id: 10,
    name: "Nauthiz",
    symbol: "ᚾ",
    meaning: "Need, Necessity",
    description: "Constraint, need, and the lessons learned through hardship.",
    keywords: ["need", "constraint", "hardship", "lessons", "endurance"],
    element: "Fire",
    aett: "hagal",
    divination: {
      upright: "Needs must be met through effort, constraints teach valuable lessons. Endurance brings wisdom.",
      reversed: "Want, deprivation, poverty. Freedom without responsibility leads to problems."
    }
  },
  {
    id: 11,
    name: "Isa",
    symbol: "ᛁ",
    meaning: "Ice, Stillness",
    description: "Ice represents stillness, stagnation, but also preservation and clarity.",
    keywords: ["stillness", "stagnation", "preservation", "clarity", "patience"],
    element: "Water",
    aett: "hagal",
    divination: {
      upright: "A time of waiting, stillness before action. Preservation of current state. Be patient.",
      reversed: "Blocked progress, emotional coldness, isolation. Thaw is needed for growth."
    }
  },
  {
    id: 12,
    name: "Jera",
    symbol: "ᛃ",
    meaning: "Year, Harvest",
    description: "The cycle of seasons, harvest time, and rewards for past efforts.",
    keywords: ["harvest", "cycles", "reward", "completion", "seasons"],
    element: "Earth",
    aett: "hagal",
    divination: {
      upright: "Harvest time, rewards for past efforts, natural cycles completing. Patience pays off.",
      reversed: "Poor harvest, bad timing, lack of progress. Seasons out of sync."
    }
  },
  {
    id: 13,
    name: "Eihwaz",
    symbol: "ᛇ",
    meaning: "Yew Tree, Death/Rebirth",
    description: "The yew tree, symbol of death and rebirth, endurance through hardship.",
    keywords: ["endurance", "death", "rebirth", "transformation", "strength"],
    element: "Earth",
    aett: "hagal",
    divination: {
      upright: "Endurance through difficulty, death and rebirth, spiritual transformation. Stay strong.",
      reversed: "Confusion, destruction without renewal, inability to adapt to change."
    }
  },
  {
    id: 14,
    name: "Perthro",
    symbol: "ᛈ",
    meaning: "Dice Cup, Mystery",
    description: "The mysteries of fate, hidden things, and the unknowable.",
    keywords: ["mystery", "fate", "hidden knowledge", "divination", "secrets"],
    element: "Water",
    aett: "hagal",
    divination: {
      upright: "Hidden knowledge revealed, mysteries unveiled, fate working in your favor. Trust your intuition.",
      reversed: "Secrets and deception, bad luck, hidden enemies. Addiction or negative occult influences."
    }
  },
  {
    id: 15,
    name: "Algiz",
    symbol: "ᛉ",
    meaning: "Elk, Protection",
    description: "Divine protection, connection to higher powers, sanctuary.",
    keywords: ["protection", "divine connection", "sanctuary", "defense", "higher self"],
    element: "Air",
    aett: "hagal",
    divination: {
      upright: "Divine protection surrounds you, connection to higher self, sanctuary and safety.",
      reversed: "Vulnerability, lack of protection, disconnection from divine. Hidden enemies."
    }
  },
  {
    id: 16,
    name: "Sowilo",
    symbol: "ᛊ",
    meaning: "Sun, Wholeness",
    description: "The sun's power, wholeness, success, and life force energy.",
    keywords: ["success", "wholeness", "life force", "victory", "enlightenment"],
    element: "Fire",
    aett: "hagal",
    divination: {
      upright: "Success and victory, wholeness and healing, life force energy strong. Enlightenment comes.",
      reversed: "False goals, lack of energy, defeat. Misguided efforts toward success."
    }
  },

  // Third Aett - Tyr's Aett (Social/Spiritual)
  {
    id: 17,
    name: "Tiwaz",
    symbol: "ᛏ",
    meaning: "Tyr, Justice",
    description: "The god Tyr, representing justice, honor, and warrior spirit.",
    keywords: ["justice", "honor", "courage", "victory", "sacrifice"],
    element: "Air",
    aett: "tyr",
    divination: {
      upright: "Justice will prevail, honor and courage rewarded, victory through right action.",
      reversed: "Injustice, dishonor, cowardice, defeat. Imbalance in giving and receiving."
    }
  },
  {
    id: 18,
    name: "Berkano",
    symbol: "ᛒ",
    meaning: "Birch, Growth",
    description: "The birch tree, symbol of new growth, fertility, and renewal.",
    keywords: ["growth", "fertility", "renewal", "new beginnings", "nurturing"],
    element: "Earth",
    aett: "tyr",
    divination: {
      upright: "New growth and beginnings, fertility and creativity, nurturing energy. Birth of new ideas.",
      reversed: "Stagnation, infertility, lack of growth. Family problems or domestic discord."
    }
  },
  {
    id: 19,
    name: "Ehwaz",
    symbol: "ᛖ",
    meaning: "Horse, Partnership",
    description: "The horse, representing partnership, trust, and cooperation.",
    keywords: ["partnership", "trust", "cooperation", "loyalty", "movement"],
    element: "Earth",
    aett: "tyr",
    divination: {
      upright: "Successful partnerships, trust and loyalty, cooperation brings progress. Marriage or business partnership.",
      reversed: "Betrayal, broken trust, failed partnerships. Restlessness and unreliability."
    }
  },
  {
    id: 20,
    name: "Mannaz",
    symbol: "ᛗ",
    meaning: "Human, Humanity",
    description: "Humanity, the self, and our place in the community.",
    keywords: ["humanity", "self", "community", "cooperation", "identity"],
    element: "Air",
    aett: "tyr",
    divination: {
      upright: "Cooperation with others, understanding your place in community, self-awareness and growth.",
      reversed: "Isolation, selfishness, inability to cooperate. Delusions about self or others."
    }
  },
  {
    id: 21,
    name: "Laguz",
    symbol: "ᛚ",
    meaning: "Lake, Flow",
    description: "Water, intuition, and the flow of life and emotions.",
    keywords: ["intuition", "flow", "emotions", "psychic abilities", "adaptation"],
    element: "Water",
    aett: "tyr",
    divination: {
      upright: "Trust your intuition, go with the flow, psychic abilities heightened. Emotional healing.",
      reversed: "Confusion, lack of intuition, emotional turmoil. Blocked creativity and poor judgment."
    }
  },
  {
    id: 22,
    name: "Ingwaz",
    symbol: "ᛜ",
    meaning: "Ing, Fertility",
    description: "The god Ing, representing male fertility, completion, and potential.",
    keywords: ["fertility", "completion", "potential", "gestation", "inner work"],
    element: "Earth",
    aett: "tyr",
    divination: {
      upright: "Completion of projects, fertility and new life, potential realized. Internal growth bearing fruit.",
      reversed: "Incomplete projects, lack of fertility, unrealized potential. Stagnation in personal growth."
    }
  },
  {
    id: 23,
    name: "Dagaz",
    symbol: "ᛞ",
    meaning: "Day, Awakening",
    description: "Dawn, awakening, breakthrough, and transformation.",
    keywords: ["awakening", "breakthrough", "transformation", "clarity", "new day"],
    element: "Fire",
    aett: "tyr",
    divination: {
      upright: "Major breakthrough, awakening to new possibilities, transformation and clarity. A new day dawns.",
      reversed: "Lack of clarity, missed opportunities, resistance to change. Staying in darkness."
    }
  },
  {
    id: 24,
    name: "Othala",
    symbol: "ᛟ",
    meaning: "Inheritance, Home",
    description: "Ancestral property, inheritance, and the wisdom of tradition.",
    keywords: ["inheritance", "tradition", "home", "ancestry", "legacy"],
    element: "Earth",
    aett: "tyr",
    divination: {
      upright: "Inheritance or property, connection to ancestry, traditional wisdom. Family prosperity.",
      reversed: "Loss of inheritance, exile from family, abandonment of tradition. Poverty and homelessness."
    }
  }
];

// Helper function to get a random rune
export function drawSingleRune(): Rune {
  const randomIndex = Math.floor(Math.random() * elderFutharkRunes.length);
  return elderFutharkRunes[randomIndex];
}

// Enhanced function to draw multiple runes without replacement (like removing stones from a bag)
export function drawRunesWithoutReplacement(count: number): Rune[] {
  if (count > elderFutharkRunes.length) {
    throw new Error(`Cannot draw ${count} runes from a set of ${elderFutharkRunes.length}`);
  }

  // Create a copy of the runes array to avoid modifying the original
  const availableRunes = [...elderFutharkRunes];
  const drawnRunes: Rune[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * availableRunes.length);
    const drawnRune = availableRunes[randomIndex];
    drawnRunes.push(drawnRune);
    
    // Remove the drawn rune from available runes (like removing a stone from the bag)
    availableRunes.splice(randomIndex, 1);
  }

  return drawnRunes;
}

// Specific function for Norns spread (Past, Present, Future)
export function drawNornsSpread(): {
  past: Rune;
  present: Rune;
  future: Rune;
} {
  const [past, present, future] = drawRunesWithoutReplacement(3);
  return { past, present, future };
}

// Helper function to get rune by ID
export function getRuneById(id: number): Rune | undefined {
  return elderFutharkRunes.find(rune => rune.id === id);
}

// Helper function to get runes by aett
export function getRunesByAett(aett: 'freyr' | 'hagal' | 'tyr'): Rune[] {
  return elderFutharkRunes.filter(rune => rune.aett === aett);
}

// Helper function to simulate reversed rune (50% chance)
export function isRuneReversed(): boolean {
  return Math.random() < 0.5;
}

// Generate reversals for multiple runes
export function generateReversals(count: number): boolean[] {
  return Array.from({ length: count }, () => isRuneReversed());
}
