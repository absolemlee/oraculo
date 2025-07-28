// Enhanced TarotCard interface with image support
export interface TarotCard {
  id: number;
  name: string;
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'; // null for Major Arcana
  number?: number | string; // number for pip cards, 'page'|'knight'|'queen'|'king' for court
  arcana: 'major' | 'minor';
  element?: 'fire' | 'water' | 'air' | 'earth';
  keywords: string[];
  description: string;
  symbolism: string[];
  divination: {
    upright: string;
    reversed: string;
  };
  astrology?: string;
  kabbalah?: string;
  unicode?: string; // Unicode symbol if available
  imageUrl?: string; // URL to card image from API
}

// Image API integration for Tarot cards
const TAROT_API_BASE = 'https://sacred-texts.com/tarot/pkt/img';

export function getTarotCardImageUrl(card: TarotCard): string {
  // Using Sacred Texts public domain Rider-Waite images
  // Format: card name in lowercase, spaces replaced with hyphens
  const cardSlug = card.name.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  // Map specific cards to their image filenames
  const imageMap: { [key: string]: string } = {
    // Major Arcana
    'thefool': 'ar00.jpg',
    'themagician': 'ar01.jpg',
    'thehighpriestess': 'ar02.jpg',
    'theempress': 'ar03.jpg',
    'theemperor': 'ar04.jpg',
    'thehierophant': 'ar05.jpg',
    'thelovers': 'ar06.jpg',
    'thechariot': 'ar07.jpg',
    'strength': 'ar08.jpg',
    'thehermit': 'ar09.jpg',
    'wheeloffortune': 'ar10.jpg',
    'justice': 'ar11.jpg',
    'thehangedman': 'ar12.jpg',
    'death': 'ar13.jpg',
    'temperance': 'ar14.jpg',
    'thedevil': 'ar15.jpg',
    'thetower': 'ar16.jpg',
    'thestar': 'ar17.jpg',
    'themoon': 'ar18.jpg',
    'thesun': 'ar19.jpg',
    'judgement': 'ar20.jpg',
    'theworld': 'ar21.jpg',
    // Wands
    'aceofwands': 'waac.jpg',
    'twoofwands': 'wa02.jpg',
    'threeofwands': 'wa03.jpg',
    'fourofwands': 'wa04.jpg',
    'fiveofwands': 'wa05.jpg',
    'sixofwands': 'wa06.jpg',
    'sevenofwands': 'wa07.jpg',
    'eightofwands': 'wa08.jpg',
    'nineofwands': 'wa09.jpg',
    'tenofwands': 'wa10.jpg',
    'pageofwands': 'wapa.jpg',
    'knightofwands': 'wakn.jpg',
    'queenofwands': 'waqu.jpg',
    'kingofwands': 'waki.jpg',
    // Cups
    'aceofcups': 'cuac.jpg',
    'twoofcups': 'cu02.jpg',
    'threeofcups': 'cu03.jpg',
    'fourofcups': 'cu04.jpg',
    'fiveofcups': 'cu05.jpg',
    'sixofcups': 'cu06.jpg',
    'sevenofcups': 'cu07.jpg',
    'eightofcups': 'cu08.jpg',
    'nineofcups': 'cu09.jpg',
    'tenofcups': 'cu10.jpg',
    'pageofcups': 'cupa.jpg',
    'knightofcups': 'cukn.jpg',
    'queenofcups': 'cuqu.jpg',
    'kingofcups': 'cuki.jpg',
    // Swords
    'aceofswords': 'swac.jpg',
    'twoofswords': 'sw02.jpg',
    'threeofswords': 'sw03.jpg',
    'fourofswords': 'sw04.jpg',
    'fiveofswords': 'sw05.jpg',
    'sixofswords': 'sw06.jpg',
    'sevenofswords': 'sw07.jpg',
    'eightofswords': 'sw08.jpg',
    'nineofswords': 'sw09.jpg',
    'tenofswords': 'sw10.jpg',
    'pageofswords': 'swpa.jpg',
    'knightofswords': 'swkn.jpg',
    'queenofswords': 'swqu.jpg',
    'kingofswords': 'swki.jpg',
    // Pentacles
    'aceofpentacles': 'peac.jpg',
    'twoofpentacles': 'pe02.jpg',
    'threeofpentacles': 'pe03.jpg',
    'fourofpentacles': 'pe04.jpg',
    'fiveofpentacles': 'pe05.jpg',
    'sixofpentacles': 'pe06.jpg',
    'sevenofpentacles': 'pe07.jpg',
    'eightofpentacles': 'pe08.jpg',
    'nineofpentacles': 'pe09.jpg',
    'tenofpentacles': 'pe10.jpg',
    'pageofpentacles': 'pepa.jpg',
    'knightofpentacles': 'pekn.jpg',
    'queenofpentacles': 'pequ.jpg',
    'kingofpentacles': 'peki.jpg'
  };

  const filename = imageMap[cardSlug] || 'cardback.jpg'; // fallback to card back
  return `${TAROT_API_BASE}/${filename}`;
}

// Add image URLs to cards
export function enhanceCardWithImage(card: TarotCard): TarotCard {
  return {
    ...card,
    imageUrl: getTarotCardImageUrl(card)
  };
}

// Major Arcana (0-21)
export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    arcana: "major",
    keywords: ["new beginnings", "innocence", "spontaneity", "free spirit"],
    description: "A young figure steps toward a cliff edge, carrying a white rose and a small bag, with a loyal dog at their feet.",
    symbolism: ["white rose (purity)", "cliff (leap of faith)", "dog (loyalty)", "bag (possessions)", "mountains (challenges ahead)"],
    divination: {
      upright: "New beginnings, innocence, spontaneity, free spirit. A journey is about to begin. Take a leap of faith.",
      reversed: "Recklessness, taken advantage of, inconsideration. Poor judgment and bad decisions."
    },
    astrology: "Uranus",
    kabbalah: "Aleph",
    unicode: "🃏"
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "major",
    keywords: ["manifestation", "resourcefulness", "power", "inspired action"],
    description: "A figure stands before an altar with the four suit symbols, one hand pointing up, one down, with an infinity symbol overhead.",
    symbolism: ["infinity symbol (divine connection)", "wand raised (channeling energy)", "altar tools (mastery)", "red robe (desire)", "white robe (purity)"],
    divination: {
      upright: "Manifestation, resourcefulness, power, inspired action. You have the tools to succeed. Focus your will.",
      reversed: "Manipulation, poor planning, untapped talents. Misuse of power or lack of direction."
    },
    astrology: "Mercury",
    kabbalah: "Beth",
    unicode: "🔮"
  },
  {
    id: 2,
    name: "The High Priestess",
    arcana: "major",
    keywords: ["intuition", "sacred knowledge", "divine feminine", "subconscious mind"],
    description: "A serene figure sits between two pillars, holding a scroll, with the moon at her feet and a veil behind her.",
    symbolism: ["veil (hidden knowledge)", "pillars (duality)", "crescent moon (intuition)", "scroll (secret knowledge)", "pomegranates (fertility)"],
    divination: {
      upright: "Intuition, sacred knowledge, divine feminine, subconscious mind. Trust your inner voice and hidden knowledge.",
      reversed: "Secrets, disconnected from intuition, withdrawal. Repressed feelings or ignored inner wisdom."
    },
    astrology: "Moon",
    kabbalah: "Gimel",
    unicode: "🌙"
  },
  {
    id: 3,
    name: "The Empress",
    arcana: "major",
    keywords: ["femininity", "beauty", "nature", "nurturing", "abundance"],
    description: "A crowned figure reclines in nature, surrounded by wheat, with a heart-shaped shield and flowing water nearby.",
    symbolism: ["crown of stars (divine connection)", "wheat (abundance)", "venus symbol (love)", "flowing water (emotion)", "forest (fertility)"],
    divination: {
      upright: "Femininity, beauty, nature, nurturing, abundance. Creativity and fertility in all forms. Maternal energy.",
      reversed: "Creative block, dependence on others, smothering. Neglect of self or others."
    },
    astrology: "Venus",
    kabbalah: "Daleth",
    unicode: "👑"
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: "major",
    keywords: ["authority", "structure", "control", "father figure"],
    description: "A bearded figure sits on a stone throne, holding an ankh scepter, with ram's heads decorating the throne.",
    symbolism: ["stone throne (stability)", "ankh scepter (life)", "ram heads (Aries)", "armor (protection)", "red robe (passion)"],
    divination: {
      upright: "Authority, structure, control, father figure. Leadership and stability. Established power and order.",
      reversed: "Domination, excessive control, lack of discipline. Abuse of power or weak leadership."
    },
    astrology: "Aries",
    kabbalah: "Heh",
    unicode: "👑"
  },
  {
    id: 5,
    name: "The Hierophant",
    arcana: "major",
    keywords: ["spiritual wisdom", "religious beliefs", "conformity", "tradition"],
    description: "A religious figure sits between two pillars, holding up two fingers in blessing, with two acolytes kneeling before him.",
    symbolism: ["triple crown (divine wisdom)", "two keys (knowledge)", "two acolytes (teaching)", "pillars (stability)", "blessing hand (guidance)"],
    divination: {
      upright: "Spiritual wisdom, religious beliefs, conformity, tradition. Seeking guidance from established institutions.",
      reversed: "Personal beliefs, freedom, challenging the status quo. Rejection of tradition or dogma."
    },
    astrology: "Taurus",
    kabbalah: "Vav",
    unicode: "⛪"
  },
  {
    id: 6,
    name: "The Lovers",
    arcana: "major",
    keywords: ["love", "harmony", "relationships", "values alignment"],
    description: "A man and woman stand beneath an angel, with the Tree of Knowledge and Tree of Life behind them.",
    symbolism: ["angel (divine blessing)", "naked figures (vulnerability)", "tree of knowledge (temptation)", "tree of life (eternal)", "mountain (challenges)"],
    divination: {
      upright: "Love, harmony, relationships, values alignment. Important choices about relationships or values.",
      reversed: "Disharmony, imbalance, misalignment of values. Relationship problems or poor choices."
    },
    astrology: "Gemini",
    kabbalah: "Zayin",
    unicode: "💕"
  },
  {
    id: 7,
    name: "The Chariot",
    arcana: "major",
    keywords: ["control", "willpower", "success", "determination"],
    description: "A crowned figure drives a chariot pulled by two sphinxes, one black and one white, holding a wand.",
    symbolism: ["two sphinxes (opposing forces)", "star crown (divine guidance)", "city walls (civilization)", "wand (control)", "armor (protection)"],
    divination: {
      upright: "Control, willpower, success, determination. Victory through discipline and focus of will.",
      reversed: "Lack of control, lack of direction, aggression. Being pulled in different directions."
    },
    astrology: "Cancer",
    kabbalah: "Cheth",
    unicode: "🏛️"
  },
  {
    id: 8,
    name: "Strength",
    arcana: "major",
    keywords: ["strength", "courage", "patience", "control"],
    description: "A woman gently closes the mouth of a lion, with an infinity symbol above her head.",
    symbolism: ["infinity symbol (unlimited potential)", "lion (raw power)", "gentle touch (inner strength)", "white robe (purity)", "flowers (gentleness)"],
    divination: {
      upright: "Strength, courage, patience, control. Inner strength overcomes brute force. Gentle power.",
      reversed: "Self-doubt, lack of confidence, lack of self-discipline. Inner turmoil or abuse of power."
    },
    astrology: "Leo",
    kabbalah: "Teth",
    unicode: "🦁"
  },
  {
    id: 9,
    name: "The Hermit",
    arcana: "major",
    keywords: ["soul searching", "seeking truth", "inner guidance"],
    description: "An old figure holds up a lantern while standing on a mountain peak, leaning on a staff.",
    symbolism: ["lantern (inner light)", "six-pointed star (wisdom)", "mountain peak (spiritual height)", "staff (support)", "gray robes (knowledge)"],
    divination: {
      upright: "Soul searching, seeking truth, inner guidance. Time for introspection and seeking wisdom within.",
      reversed: "Isolation, loneliness, withdrawal. Too much introspection or refusing guidance."
    },
    astrology: "Virgo",
    kabbalah: "Yod",
    unicode: "🏮"
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    arcana: "major",
    keywords: ["good luck", "karma", "life cycles", "destiny"],
    description: "A large wheel with mysterious symbols, surrounded by four figures in the corners reading books.",
    symbolism: ["wheel (cycles)", "sphinx (riddles)", "snake (descent)", "Anubis (ascent)", "four creatures (fixed signs)", "TARO/ROTA (tarot/wheel)"],
    divination: {
      upright: "Good luck, karma, life cycles, destiny. A turning point. What goes around comes around.",
      reversed: "Bad luck, lack of control, clinging to control. Resistance to change or karmic lessons."
    },
    astrology: "Jupiter",
    kabbalah: "Kaph",
    unicode: "🎡"
  },
  {
    id: 11,
    name: "Justice",
    arcana: "major",
    keywords: ["justice", "fairness", "truth", "cause and effect"],
    description: "A figure sits on a throne holding scales in one hand and a sword in the other, with purple curtains behind.",
    symbolism: ["scales (balance)", "sword (truth)", "crown (authority)", "purple curtains (spirituality)", "square on crown (order)"],
    divination: {
      upright: "Justice, fairness, truth, cause and effect. Balance will be restored. Fair outcomes and accountability.",
      reversed: "Unfairness, lack of accountability, dishonesty. Avoiding consequences or biased judgment."
    },
    astrology: "Libra",
    kabbalah: "Lamed",
    unicode: "⚖️"
  },
  {
    id: 12,
    name: "The Hanged Man",
    arcana: "major",
    keywords: ["suspension", "restriction", "letting go", "sacrifice"],
    description: "A figure hangs upside down from a tree by one foot, with hands behind back and a halo around the head.",
    symbolism: ["upside down (new perspective)", "halo (enlightenment)", "tree (living wood)", "bound hands (restriction)", "peaceful expression (acceptance)"],
    divination: {
      upright: "Suspension, restriction, letting go, sacrifice. A time of waiting and seeing things differently.",
      reversed: "Delays, resistance, stalling. Unwillingness to make necessary sacrifices or learn lessons."
    },
    astrology: "Neptune",
    kabbalah: "Mem",
    unicode: "🙃"
  },
  {
    id: 13,
    name: "Death",
    arcana: "major",
    keywords: ["endings", "beginnings", "change", "transformation"],
    description: "A skeleton in armor rides a white horse, carrying a banner, while figures react to his presence.",
    symbolism: ["skeleton (permanence of change)", "white horse (purity)", "banner with rose (beauty survives)", "rising sun (rebirth)", "flowing water (life continues)"],
    divination: {
      upright: "Endings, beginnings, change, transformation. A major life transition. Death of the old, birth of the new.",
      reversed: "Resistance to change, personal transformation, inner purging. Fear of change or incomplete transformation."
    },
    astrology: "Scorpio",
    kabbalah: "Nun",
    unicode: "💀"
  },
  {
    id: 14,
    name: "Temperance",
    arcana: "major",
    keywords: ["balance", "moderation", "patience", "purpose"],
    description: "An angel pours water between two cups, with one foot on land and one in water, mountains in the background.",
    symbolism: ["pouring water (flow of life)", "one foot on land (material)", "one foot in water (subconscious)", "triangle (alchemy)", "iris flowers (messages)"],
    divination: {
      upright: "Balance, moderation, patience, purpose. Finding the middle way. Successful combinations and alchemy.",
      reversed: "Imbalance, excess, self-indulgence. Lack of long-term vision or poor timing."
    },
    astrology: "Sagittarius",
    kabbalah: "Samekh",
    unicode: "🏺"
  },
  {
    id: 15,
    name: "The Devil",
    arcana: "major",
    keywords: ["bondage", "addiction", "sexuality", "materialism"],
    description: "A horned figure sits above two chained human figures, with an inverted pentagram on the forehead.",
    symbolism: ["chains (bondage)", "inverted pentagram (material over spiritual)", "torch (false light)", "naked figures (raw desires)", "loose chains (choice)"],
    divination: {
      upright: "Bondage, addiction, sexuality, materialism. Being trapped by material desires or unhealthy relationships.",
      reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment. Breaking free from addictions or restrictions."
    },
    astrology: "Capricorn",
    kabbalah: "Ayin",
    unicode: "😈"
  },
  {
    id: 16,
    name: "The Tower",
    arcana: "major",
    keywords: ["sudden change", "upheaval", "chaos", "revelation"],
    description: "A tall tower is struck by lightning, with figures falling from it and a crown toppling from its peak.",
    symbolism: ["lightning (divine intervention)", "falling crown (false beliefs)", "falling figures (ego destruction)", "flames (purification)", "dark sky (crisis)"],
    divination: {
      upright: "Sudden change, upheaval, chaos, revelation. Destruction of false foundations. Shocking revelations.",
      reversed: "Personal transformation, fear of change, averting disaster. Internal upheaval or delayed crisis."
    },
    astrology: "Mars",
    kabbalah: "Peh",
    unicode: "🗼"
  },
  {
    id: 17,
    name: "The Star",
    arcana: "major",
    keywords: ["hope", "faith", "purpose", "renewal"],
    description: "A naked figure kneels by water, pouring water from two jugs under a star-filled sky.",
    symbolism: ["large star (hope)", "seven small stars (chakras)", "naked figure (vulnerability)", "pouring water (flow of consciousness)", "bird (spirit)"],
    divination: {
      upright: "Hope, faith, purpose, renewal. Spiritual guidance and inspiration. Healing and recovery.",
      reversed: "Lack of faith, despair, self-trust issues. Disconnection from higher purpose or guidance."
    },
    astrology: "Aquarius",
    kabbalah: "Tzaddi",
    unicode: "⭐"
  },
  {
    id: 18,
    name: "The Moon",
    arcana: "major",
    keywords: ["illusion", "fear", "anxiety", "subconscious"],
    description: "A full moon shines down on a path between two towers, with a crayfish emerging from water and two dogs howling.",
    symbolism: ["moon (illusion)", "path (journey)", "towers (known/unknown)", "dogs (conscious fears)", "crayfish (subconscious)", "drops (inspiration)"],
    divination: {
      upright: "Illusion, fear, anxiety, subconscious. Things are not as they seem. Trust your intuition through confusion.",
      reversed: "Release of fear, repressed memory, inner confusion. Overcoming self-deception or releasing anxiety."
    },
    astrology: "Pisces",
    kabbalah: "Qoph",
    unicode: "🌙"
  },
  {
    id: 19,
    name: "The Sun",
    arcana: "major",
    keywords: ["happiness", "success", "vitality", "enlightenment"],
    description: "A bright sun shines over a naked child on a white horse, with sunflowers and a brick wall in the background.",
    symbolism: ["bright sun (consciousness)", "naked child (innocence)", "white horse (purity)", "sunflowers (life)", "brick wall (civilization)"],
    divination: {
      upright: "Happiness, success, vitality, enlightenment. Joy and positive energy. Achievement and recognition.",
      reversed: "Inner child, feeling down, overly optimistic. Temporary setbacks or delayed happiness."
    },
    astrology: "Sun",
    kabbalah: "Resh",
    unicode: "☀️"
  },
  {
    id: 20,
    name: "Judgement",
    arcana: "major",
    keywords: ["judgement", "rebirth", "inner calling", "absolution"],
    description: "An angel blows a trumpet from the clouds while figures rise from coffins below with arms outstretched.",
    symbolism: ["trumpet (divine calling)", "angel (higher guidance)", "rising figures (resurrection)", "mountains (higher consciousness)", "cross banner (redemption)"],
    divination: {
      upright: "Judgement, rebirth, inner calling, absolution. Spiritual awakening and second chances. Hearing your calling.",
      reversed: "Self-doubt, harsh judgement, lack of self-awareness. Avoiding necessary life changes or self-criticism."
    },
    astrology: "Pluto",
    kabbalah: "Shin",
    unicode: "📯"
  },
  {
    id: 21,
    name: "The World",
    arcana: "major",
    keywords: ["completion", "integration", "accomplishment", "travel"],
    description: "A dancing figure surrounded by a laurel wreath, with the four creatures of the fixed signs in the corners.",
    symbolism: ["wreath (victory)", "dancing figure (joy)", "four creatures (completion)", "wands (balance)", "purple cloth (spirituality)"],
    divination: {
      upright: "Completion, integration, accomplishment, travel. The end of a journey and achievement of goals.",
      reversed: "Incomplete goals, lack of closure, seeking external validation. Almost there but not quite finished."
    },
    astrology: "Saturn",
    kabbalah: "Tav",
    unicode: "🌍"
  }
];

// Minor Arcana Suits
export const wands: TarotCard[] = [
  // Ace through 10 of Wands
  {
    id: 22,
    name: "Ace of Wands",
    suit: "wands",
    number: 1,
    arcana: "minor",
    element: "fire",
    keywords: ["inspiration", "new opportunities", "growth"],
    description: "A hand emerges from a cloud, grasping a budding wand with leaves falling around it.",
    symbolism: ["sprouting wand (new growth)", "hand from cloud (divine gift)", "falling leaves (potential)"],
    divination: {
      upright: "Inspiration, new opportunities, growth. A spark of creative energy and new beginnings in career or projects.",
      reversed: "Lack of energy, delays, false starts. Creative blocks or missed opportunities."
    },
    unicode: "🔥"
  },
  {
    id: 23,
    name: "Two of Wands",
    suit: "wands",
    number: 2,
    arcana: "minor",
    element: "fire",
    keywords: ["planning", "making decisions", "leaving comfort zone"],
    description: "A figure holds a globe while standing between two wands, looking out from a castle.",
    symbolism: ["globe (world of possibilities)", "castle (security)", "distant mountains (future goals)"],
    divination: {
      upright: "Planning, making decisions, leaving comfort zone. Long-term planning and considering options.",
      reversed: "Fear of change, lack of planning, bad decisions. Staying in comfort zone or poor preparation."
    },
    unicode: "🏰"
  },
  {
    id: 24,
    name: "Three of Wands",
    suit: "wands",
    number: 3,
    arcana: "minor",
    element: "fire",
    keywords: ["expansion", "foresight", "overseas opportunities"],
    description: "A figure stands looking out at ships in the distance, with three wands planted in the ground.",
    symbolism: ["ships (distant opportunities)", "high vantage point (foresight)", "planted wands (established plans)"],
    divination: {
      upright: "Expansion, foresight, overseas opportunities. Long-term success and international opportunities.",
      reversed: "Delays in plans, lack of foresight, obstacles. Playing it too safe or lack of progress."
    },
    unicode: "🚢"
  },
  {
    id: 25,
    name: "Four of Wands",
    suit: "wands",
    number: 4,
    arcana: "minor",
    element: "fire",
    keywords: ["celebration", "joyful reunions", "home", "harmony"],
    description: "Four wands support a canopy of flowers, with figures dancing in celebration beneath.",
    symbolism: ["flower canopy (celebration)", "dancing figures (joy)", "castle in distance (stability)"],
    divination: {
      upright: "Celebration, joyful reunions, home, harmony. Achievement of goals and happy celebrations.",
      reversed: "Lack of support, instability, cancelled celebrations. Family disagreements or lack of harmony."
    },
    unicode: "🎉"
  },
  {
    id: 26,
    name: "Five of Wands",
    suit: "wands",
    number: 5,
    arcana: "minor",
    element: "fire",
    keywords: ["conflict", "disagreements", "competition", "tension"],
    description: "Five figures appear to be fighting or competing with wands, each pointing in different directions.",
    symbolism: ["conflicting directions (disagreement)", "multiple figures (different opinions)", "chaotic energy (tension)"],
    divination: {
      upright: "Conflict, disagreements, competition, tension. Minor conflicts and competitive situations.",
      reversed: "Avoiding conflict, inner conflict, compromise. Resolution of disputes or internal struggles."
    },
    unicode: "⚔️"
  },
  {
    id: 27,
    name: "Six of Wands",
    suit: "wands",
    number: 6,
    arcana: "minor",
    element: "fire",
    keywords: ["success", "public recognition", "progress", "self-confidence"],
    description: "A victorious figure on horseback holds a wand with a laurel wreath, surrounded by cheering crowds.",
    symbolism: ["laurel wreath (victory)", "white horse (success)", "cheering crowd (recognition)"],
    divination: {
      upright: "Success, public recognition, progress, self-confidence. Victory and acknowledgment of achievements.",
      reversed: "Private achievement, self-doubt, lack of recognition. Success without acknowledgment or ego issues."
    },
    unicode: "🏆"
  },
  {
    id: 28,
    name: "Seven of Wands",
    suit: "wands",
    number: 7,
    arcana: "minor",
    element: "fire",
    keywords: ["challenge", "competition", "perseverance"],
    description: "A figure stands on high ground defending against six wands attacking from below.",
    symbolism: ["high ground (advantage)", "defensive stance (perseverance)", "multiple attackers (challenges)"],
    divination: {
      upright: "Challenge, competition, perseverance. Standing your ground against opposition and maintaining your position.",
      reversed: "Exhaustion, giving up, overwhelmed. Lack of confidence or being worn down by challenges."
    },
    unicode: "🛡️"
  },
  {
    id: 29,
    name: "Eight of Wands",
    suit: "wands",
    number: 8,
    arcana: "minor",
    element: "fire",
    keywords: ["movement", "speed", "progress", "quick decisions"],
    description: "Eight wands fly through the air above a landscape, moving swiftly toward their destination.",
    symbolism: ["flying wands (swift action)", "clear sky (clarity)", "rural landscape (journey)"],
    divination: {
      upright: "Movement, speed, progress, quick decisions. Rapid developments and swift progress toward goals.",
      reversed: "Delays, frustration, resisting change. Impatience or things moving too slowly."
    },
    unicode: "💨"
  },
  {
    id: 30,
    name: "Nine of Wands",
    suit: "wands",
    number: 9,
    arcana: "minor",
    element: "fire",
    keywords: ["persistence", "test of faith", "boundaries", "resilience"],
    description: "A wounded figure leans on a wand while eight others stand behind him like a fence.",
    symbolism: ["bandaged head (battle wounds)", "defensive wands (boundaries)", "watchful stance (vigilance)"],
    divination: {
      upright: "Persistence, test of faith, boundaries, resilience. Almost at the finish line but facing final challenges.",
      reversed: "Inner resources, struggle, overwhelm. Feeling defeated or lacking the strength to continue."
    },
    unicode: "🔋"
  },
  {
    id: 31,
    name: "Ten of Wands",
    suit: "wands",
    number: 10,
    arcana: "minor",
    element: "fire",
    keywords: ["burden", "extra responsibility", "hard work", "completion"],
    description: "A figure carries ten heavy wands while walking toward a distant village.",
    symbolism: ["heavy burden (responsibility)", "bent figure (strain)", "distant village (goal in sight)"],
    divination: {
      upright: "Burden, extra responsibility, hard work, completion. Carrying heavy responsibilities but success is near.",
      reversed: "Inability to delegate, burnt out, doing it all. Overwhelm or refusing help from others."
    },
    unicode: "🎒"
  },
  // Court Cards - Wands
  {
    id: 32,
    name: "Page of Wands",
    suit: "wands",
    number: "page",
    arcana: "minor",
    element: "fire",
    keywords: ["exploration", "excitement", "freedom"],
    description: "A young figure holds a wand and looks at it with curiosity, desert landscape behind.",
    symbolism: ["budding wand (potential)", "desert (new territory)", "colorful clothing (enthusiasm)"],
    divination: {
      upright: "Exploration, excitement, freedom. New ideas and enthusiastic beginnings. A free spirit.",
      reversed: "Lack of direction, procrastination, creating conflict. Scattered energy or unrealistic plans."
    },
    unicode: "👦"
  },
  {
    id: 33,
    name: "Knight of Wands",
    suit: "wands",
    number: "knight",
    arcana: "minor",
    element: "fire",
    keywords: ["action", "adventure", "fearlessness", "confidence"],
    description: "A knight in armor charges forward on a rearing horse, holding a wand like a lance.",
    symbolism: ["rearing horse (impulsiveness)", "forward motion (action)", "desert landscape (adventure)"],
    divination: {
      upright: "Action, adventure, fearlessness, confidence. Bold action and adventurous spirit. Taking risks.",
      reversed: "Recklessness, haste, rivarly. Acting without thinking or being overly aggressive."
    },
    unicode: "🐎"
  },
  {
    id: 34,
    name: "Queen of Wands",
    suit: "wands",
    number: "queen",
    arcana: "minor",
    element: "fire",
    keywords: ["courage", "confidence", "independence", "social butterfly"],
    description: "A confident queen sits on a throne decorated with lions, holding a wand and sunflower.",
    symbolism: ["sunflower (happiness)", "lions (courage)", "black cat (intuition)", "wand (authority)"],
    divination: {
      upright: "Courage, confidence, independence, social butterfly. Strong leadership and warm personality.",
      reversed: "Selfishness, jealousy, insecurities. Demanding attention or being overly controlling."
    },
    unicode: "👸"
  },
  {
    id: 35,
    name: "King of Wands",
    suit: "wands",
    number: "king",
    arcana: "minor",
    element: "fire",
    keywords: ["leadership", "vision", "honour", "determination"],
    description: "A king sits confidently on his throne, holding a budding wand, with salamanders decorating his robes.",
    symbolism: ["budding wand (growth)", "salamanders (transformation)", "confident posture (leadership)"],
    divination: {
      upright: "Leadership, vision, honour, determination. Natural leader with clear vision and strong will.",
      reversed: "Impulsiveness, haste, ruthless. Abuse of power or lack of direction in leadership."
    },
    unicode: "🤴"
  }
];

// Complete Cups suit (36-49)
export const cups: TarotCard[] = [
  {
    id: 36,
    name: "Ace of Cups",
    suit: "cups",
    number: 1,
    arcana: "minor",
    element: "water",
    keywords: ["love", "intuition", "spirituality", "new relationships"],
    description: "A hand emerges from clouds holding a cup overflowing with water, with a dove above.",
    symbolism: ["overflowing cup (abundance)", "dove (peace)", "lotus (purity)", "streams (emotion)"],
    divination: {
      upright: "Love, intuition, spirituality, new relationships. New emotional beginnings and spiritual insights.",
      reversed: "Emotional loss, blocked creativity, emptiness. Repressed emotions or spiritual disconnection."
    },
    unicode: "💙"
  },
  {
    id: 37,
    name: "Two of Cups",
    suit: "cups",
    number: 2,
    arcana: "minor",
    element: "water",
    keywords: ["unified love", "partnership", "mutual attraction"],
    description: "A man and woman exchange cups beneath a winged lion's head, with a caduceus between them.",
    symbolism: ["exchanging cups (partnership)", "caduceus (healing)", "winged lion (passionate love)"],
    divination: {
      upright: "Unified love, partnership, mutual attraction. Balanced relationships and romantic connections.",
      reversed: "Self-love, break-ups, disharmony. Imbalanced relationships or self-worth issues."
    },
    unicode: "💕"
  },
  {
    id: 38,
    name: "Three of Cups",
    suit: "cups",
    number: 3,
    arcana: "minor",
    element: "water",
    keywords: ["celebration", "friendship", "creativity", "community"],
    description: "Three women raise their cups in celebration, with fruits scattered at their feet.",
    symbolism: ["raised cups (celebration)", "three figures (community)", "fruits (abundance)"],
    divination: {
      upright: "Celebration, friendship, creativity, community. Joyful gatherings and social harmony.",
      reversed: "Independence, alone time, hardcore partying. Social isolation or overindulgence."
    },
    unicode: "🍻"
  },
  {
    id: 39,
    name: "Four of Cups",
    suit: "cups",
    number: 4,
    arcana: "minor",
    element: "water",
    keywords: ["meditation", "contemplation", "apathy", "reevaluation"],
    description: "A figure sits under a tree with arms crossed, ignoring a cup offered by a hand from a cloud.",
    symbolism: ["crossed arms (rejection)", "tree (stability)", "offered cup (opportunity)", "meditation pose (contemplation)"],
    divination: {
      upright: "Meditation, contemplation, apathy, reevaluation. Feeling disconnected or missing opportunities.",
      reversed: "Retreat, withdrawal, checking out. Depression or complete disengagement from life."
    },
    unicode: "🧘"
  },
  {
    id: 40,
    name: "Five of Cups",
    suit: "cups",
    number: 5,
    arcana: "minor",
    element: "water",
    keywords: ["regret", "failure", "disappointment", "pessimism"],
    description: "A cloaked figure looks at three spilled cups while two remain upright behind, with a bridge in the distance.",
    symbolism: ["spilled cups (loss)", "upright cups (hope)", "bridge (moving forward)", "black cloak (mourning)"],
    divination: {
      upright: "Regret, failure, disappointment, pessimism. Dwelling on loss while ignoring what remains.",
      reversed: "Personal setbacks, self-forgiveness, moving on. Recovery from loss and renewed optimism."
    },
    unicode: "😢"
  },
  {
    id: 41,
    name: "Six of Cups",
    suit: "cups",
    number: 6,
    arcana: "minor",
    element: "water",
    keywords: ["revisiting the past", "childhood memories", "innocence"],
    description: "A child hands a cup filled with flowers to another child, with more cups in the foreground.",
    symbolism: ["children (innocence)", "flowers in cups (pure joy)", "past setting (nostalgia)"],
    divination: {
      upright: "Revisiting the past, childhood memories, innocence. Nostalgia and simple pleasures.",
      reversed: "Living in the past, forgiveness, lacking playfulness. Stuck in old patterns or immaturity."
    },
    unicode: "🌸"
  },
  {
    id: 42,
    name: "Seven of Cups",
    suit: "cups",
    number: 7,
    arcana: "minor",
    element: "water",
    keywords: ["opportunities", "choices", "wishful thinking", "illusion"],
    description: "A figure looks at seven cups floating in clouds, each containing different symbols and treasures.",
    symbolism: ["floating cups (illusions)", "various symbols (choices)", "clouds (fantasy)", "dark silhouette (confusion)"],
    divination: {
      upright: "Opportunities, choices, wishful thinking, illusion. Many options but difficulty choosing reality.",
      reversed: "Alignment, personal values, overwhelmed by choices. Clarity about what truly matters."
    },
    unicode: "☁️"
  },
  {
    id: 43,
    name: "Eight of Cups",
    suit: "cups",
    number: 8,
    arcana: "minor",
    element: "water",
    keywords: ["disappointment", "abandonment", "withdrawal", "escapism"],
    description: "A figure walks away from eight cups toward mountains, with a crescent moon overhead.",
    symbolism: ["walking away (abandonment)", "mountains (spiritual journey)", "moon (intuition)", "arranged cups (leaving behind)"],
    divination: {
      upright: "Disappointment, abandonment, withdrawal, escapism. Leaving behind what no longer serves you.",
      reversed: "Trying one more time, indecision, aimless drifting. Fear of moving on or avoiding growth."
    },
    unicode: "🌙"
  },
  {
    id: 44,
    name: "Nine of Cups",
    suit: "cups",
    number: 9,
    arcana: "minor",
    element: "water",
    keywords: ["contentment", "satisfaction", "gratitude", "wish fulfillment"],
    description: "A satisfied figure sits with arms crossed before nine cups arranged like a feast.",
    symbolism: ["crossed arms (satisfaction)", "nine cups (abundance)", "feast setting (contentment)"],
    divination: {
      upright: "Contentment, satisfaction, gratitude, wish fulfillment. Emotional and material satisfaction.",
      reversed: "Inner happiness, materialism, dissatisfaction. Seeking external validation or never satisfied."
    },
    unicode: "😊"
  },
  {
    id: 45,
    name: "Ten of Cups",
    suit: "cups",
    number: 10,
    arcana: "minor",
    element: "water",
    keywords: ["divine love", "blissful relationships", "harmony", "alignment"],
    description: "A family looks up at a rainbow of ten cups arcing across the sky above their home.",
    symbolism: ["rainbow (divine blessing)", "family (harmony)", "ten cups (emotional fulfillment)", "home (security)"],
    divination: {
      upright: "Divine love, blissful relationships, harmony, alignment. Perfect emotional and family harmony.",
      reversed: "Shattered dreams, broken family, bad communication. Disrupted harmony or unrealistic expectations."
    },
    unicode: "🌈"
  },
  {
    id: 46,
    name: "Page of Cups",
    suit: "cups",
    number: "page",
    arcana: "minor",
    element: "water",
    keywords: ["creative opportunities", "intuitive messages", "curiosity"],
    description: "A young figure holds a cup with a fish emerging from it, standing by calm waters.",
    symbolism: ["fish in cup (imagination)", "calm waters (emotions)", "decorative clothing (creativity)"],
    divination: {
      upright: "Creative opportunities, intuitive messages, curiosity. New emotional or creative beginnings.",
      reversed: "Emotional immaturity, lack of creativity, bad news. Moodiness or unrealistic expectations."
    },
    unicode: "🐠"
  },
  {
    id: 47,
    name: "Knight of Cups",
    suit: "cups",
    number: "knight",
    arcana: "minor",
    element: "water",
    keywords: ["creativity", "romance", "charm", "imagination"],
    description: "A knight in armor rides slowly forward, holding a cup as if offering it, with water flowing nearby.",
    symbolism: ["offered cup (romance)", "flowing water (emotion)", "slow horse (contemplation)", "winged helmet (inspiration)"],
    divination: {
      upright: "Creativity, romance, charm, imagination. Following your heart and romantic pursuits.",
      reversed: "Moodiness, disappointment, withdrawn. Being overly emotional or unrealistic in romance."
    },
    unicode: "💝"
  },
  {
    id: 48,
    name: "Queen of Cups",
    suit: "cups",
    number: "queen",
    arcana: "minor",
    element: "water",
    keywords: ["compassion", "warmth", "kindness", "intuition"],
    description: "A queen sits on a throne at the water's edge, holding an ornate cup and gazing into it.",
    symbolism: ["ornate cup (emotions)", "water's edge (subconscious)", "throne (stability)", "contemplative gaze (intuition)"],
    divination: {
      upright: "Compassion, warmth, kindness, intuition. Emotional maturity and nurturing leadership.",
      reversed: "Martyrdom, insecurity, dependence. Being overly emotional or manipulative with feelings."
    },
    unicode: "👸"
  },
  {
    id: 49,
    name: "King of Cups",
    suit: "cups",
    number: "king",
    arcana: "minor",
    element: "water",
    keywords: ["emotional balance", "compassion", "diplomacy"],
    description: "A king sits on a throne floating on water, holding a cup while a fish jumps nearby.",
    symbolism: ["floating throne (emotional mastery)", "calm demeanor (balance)", "jumping fish (subconscious)", "cup (controlled emotions)"],
    divination: {
      upright: "Emotional balance, compassion, diplomacy. Mastery over emotions and wise counseling.",
      reversed: "Moodiness, emotional manipulation, volatility. Suppressed emotions or using emotions to control."
    },
    unicode: "👑"
  }
];

// Complete Swords suit (50-63)
export const swords: TarotCard[] = [
  {
    id: 50,
    name: "Ace of Swords",
    suit: "swords",
    number: 1,
    arcana: "minor",
    element: "air",
    keywords: ["breakthrough", "clarity", "sharp mind"],
    description: "A hand emerges from clouds grasping a sword crowned with a wreath, with mountains below.",
    symbolism: ["crowned sword (mental victory)", "wreath (success)", "mountains (challenges)", "clouds (divine inspiration)"],
    divination: {
      upright: "Breakthrough, clarity, sharp mind. Mental clarity and breakthrough moments. New ideas.",
      reversed: "Confusion, brutality, chaos. Mental confusion or using intellect destructively."
    },
    unicode: "⚔️"
  },
  {
    id: 51,
    name: "Two of Swords",
    suit: "swords",
    number: 2,
    arcana: "minor",
    element: "air",
    keywords: ["difficult decisions", "weighing options", "indecision"],
    description: "A blindfolded figure sits holding two crossed swords, with water and rocks behind.",
    symbolism: ["blindfold (blocked intuition)", "crossed swords (stalemate)", "water (emotions)", "rocks (obstacles)"],
    divination: {
      upright: "Difficult decisions, weighing options, indecision. Being stuck between two choices.",
      reversed: "Indecision, confusion, information overload. Paralyzed by too many options or fear."
    },
    unicode: "⚖️"
  },
  {
    id: 52,
    name: "Three of Swords",
    suit: "swords",
    number: 3,
    arcana: "minor",
    element: "air",
    keywords: ["heartbreak", "suffering", "grief", "sorrow"],
    description: "Three swords pierce a red heart against a stormy sky with heavy rain.",
    symbolism: ["pierced heart (emotional pain)", "three swords (betrayal)", "storm clouds (turmoil)", "rain (tears)"],
    divination: {
      upright: "Heartbreak, suffering, grief, sorrow. Emotional pain and betrayal. Necessary release.",
      reversed: "Recovery, forgiveness, moving on. Healing from heartbreak and emotional recovery."
    },
    unicode: "💔"
  },
  {
    id: 53,
    name: "Four of Swords",
    suit: "swords",
    number: 4,
    arcana: "minor",
    element: "air",
    keywords: ["rest", "relaxation", "meditation", "contemplation"],
    description: "A figure lies in peaceful repose on a tomb with three swords hanging above and one beneath.",
    symbolism: ["peaceful repose (rest)", "tomb (temporary death)", "stained glass (hope)", "hands in prayer (meditation)"],
    divination: {
      upright: "Rest, relaxation, meditation, contemplation. Taking time to recharge and reflect.",
      reversed: "Restlessness, burnout, stress. Unable to rest or pushing through exhaustion."
    },
    unicode: "🧘"
  },
  {
    id: 54,
    name: "Five of Swords",
    suit: "swords",
    number: 5,
    arcana: "minor",
    element: "air",
    keywords: ["conflict", "disagreements", "competition", "defeat"],
    description: "A figure collects swords while two others walk away dejected, under a turbulent sky.",
    symbolism: ["collecting swords (hollow victory)", "departing figures (defeat)", "turbulent sky (conflict)", "smug expression (selfish win)"],
    divination: {
      upright: "Conflict, disagreements, competition, defeat. Winning at others' expense or hollow victories.",
      reversed: "Reconciliation, making amends, past resentment. Moving past conflict or learning from defeat."
    },
    unicode: "🥊"
  },
  {
    id: 55,
    name: "Six of Swords",
    suit: "swords",
    number: 6,
    arcana: "minor",
    element: "air",
    keywords: ["transition", "change", "rite of passage", "releasing baggage"],
    description: "A figure ferries passengers across calm water with six swords standing in the boat.",
    symbolism: ["boat journey (transition)", "calm water (peace)", "swords upright (carrying burdens)", "passengers (responsibility)"],
    divination: {
      upright: "Transition, change, rite of passage, releasing baggage. Moving toward better times.",
      reversed: "Personal transition, resistance to change, unfinished business. Difficulty letting go of the past."
    },
    unicode: "⛵"
  },
  {
    id: 56,
    name: "Seven of Swords",
    suit: "swords",
    number: 7,
    arcana: "minor",
    element: "air",
    keywords: ["betrayal", "deception", "getting away with something"],
    description: "A figure sneaks away from a camp carrying five swords, leaving two behind.",
    symbolism: ["sneaking figure (deception)", "stolen swords (betrayal)", "camp (community)", "left behind swords (incomplete theft)"],
    divination: {
      upright: "Betrayal, deception, getting away with something. Acting alone or taking shortcuts.",
      reversed: "Imposter syndrome, self-deceit, keeping secrets. Feeling like a fraud or hiding your true self."
    },
    unicode: "🥷"
  },
  {
    id: 57,
    name: "Eight of Swords",
    suit: "swords",
    number: 8,
    arcana: "minor",
    element: "air",
    keywords: ["imprisonment", "entrapment", "self-victimization"],
    description: "A blindfolded and bound figure stands surrounded by eight swords, with a castle in the distance.",
    symbolism: ["blindfold (limited perspective)", "bound hands (helplessness)", "surrounding swords (mental prison)", "distant castle (freedom)"],
    divination: {
      upright: "Imprisonment, entrapment, self-victimization. Feeling trapped by circumstances or thoughts.",
      reversed: "Self-acceptance, new perspective, freedom. Breaking free from limiting beliefs."
    },
    unicode: "🔒"
  },
  {
    id: 58,
    name: "Nine of Swords",
    suit: "swords",
    number: 9,
    arcana: "minor",
    element: "air",
    keywords: ["anxiety", "worry", "fear", "depression"],
    description: "A figure sits up in bed with head in hands, with nine swords hanging on the wall above.",
    symbolism: ["head in hands (despair)", "bed (vulnerability)", "nine swords (overwhelming thoughts)", "dark setting (depression)"],
    divination: {
      upright: "Anxiety, worry, fear, depression. Mental anguish and overwhelming negative thoughts.",
      reversed: "Inner turmoil, deep-seated fears, shame. Facing your darkest fears or seeking help."
    },
    unicode: "😰"
  },
  {
    id: 59,
    name: "Ten of Swords",
    suit: "swords",
    number: 10,
    arcana: "minor",
    element: "air",
    keywords: ["painful endings", "deep wounds", "betrayal", "rock bottom"],
    description: "A figure lies face down with ten swords in their back, with dawn breaking on the horizon.",
    symbolism: ["ten swords (complete defeat)", "prone figure (surrender)", "dawn horizon (new beginning)", "red cloak (passion ended)"],
    divination: {
      upright: "Painful endings, deep wounds, betrayal, rock bottom. Complete defeat but also completion.",
      reversed: "Recovery, regeneration, resisting an inevitable end. Refusing to let go or gradual healing."
    },
    unicode: "🗡️"
  },
  {
    id: 60,
    name: "Page of Swords",
    suit: "swords",
    number: "page",
    arcana: "minor",
    element: "air",
    keywords: ["curiosity", "restlessness", "mental energy"],
    description: "A young figure holds a sword upright while standing on uneven ground with clouds swirling.",
    symbolism: ["upright sword (mental clarity)", "uneven ground (instability)", "swirling clouds (mental activity)", "alert stance (vigilance)"],
    divination: {
      upright: "Curiosity, restlessness, mental energy. New ideas and intellectual pursuits.",
      reversed: "Haste, unfocused energy, confusion. Scattered thoughts or impulsive communication."
    },
    unicode: "📚"
  },
  {
    id: 61,
    name: "Knight of Swords",
    suit: "swords",
    number: "knight",
    arcana: "minor",
    element: "air",
    keywords: ["ambition", "drive", "fast thinking", "impulsiveness"],
    description: "A knight charges forward on a galloping horse, sword raised, with storm clouds behind.",
    symbolism: ["galloping horse (speed)", "raised sword (action)", "storm clouds (turbulence)", "forward motion (ambition)"],
    divination: {
      upright: "Ambition, drive, fast thinking, impulsiveness. Quick action and determination.",
      reversed: "Reckless, unfocused, unpredictable. Acting without thinking or scattered energy."
    },
    unicode: "🏇"
  },
  {
    id: 62,
    name: "Queen of Swords",
    suit: "swords",
    number: "queen",
    arcana: "minor",
    element: "air",
    keywords: ["complexity", "perceptive", "clear mindedness"],
    description: "A stern queen sits on a throne holding a sword upright, with her other hand extended.",
    symbolism: ["upright sword (clarity)", "extended hand (fairness)", "stern expression (judgment)", "clouds (mental realm)"],
    divination: {
      upright: "Complexity, perceptive, clear mindedness. Independent thinking and direct communication.",
      reversed: "Cold hearted, cruel, bitterness. Using intellect to hurt others or emotional detachment."
    },
    unicode: "⚔️"
  },
  {
    id: 63,
    name: "King of Swords",
    suit: "swords",
    number: "king",
    arcana: "minor",
    element: "air",
    keywords: ["mental clarity", "intellectual power", "authority"],
    description: "A king sits on a throne holding a sword, with butterflies and crescent moons decorating his robe.",
    symbolism: ["upright sword (justice)", "butterflies (transformation)", "crescent moons (intuition)", "stern expression (authority)"],
    divination: {
      upright: "Mental clarity, intellectual power, authority. Clear thinking and fair judgment.",
      reversed: "Manipulative, cruel, weakness. Abuse of intellectual power or poor judgment."
    },
    unicode: "👑"
  }
];

// Complete Pentacles suit (64-77)
export const pentacles: TarotCard[] = [
  {
    id: 64,
    name: "Ace of Pentacles",
    suit: "pentacles",
    number: 1,
    arcana: "minor",
    element: "earth",
    keywords: ["opportunity", "prosperity", "new venture"],
    description: "A hand emerges from clouds holding a large pentacle, with a garden path below leading to mountains.",
    symbolism: ["golden pentacle (material opportunity)", "garden path (growth)", "mountains (goals)", "lush garden (abundance)"],
    divination: {
      upright: "Opportunity, prosperity, new venture. New financial or career opportunities. Material success.",
      reversed: "Lost opportunity, lack of planning, bad investment. Missed chances or poor financial decisions."
    },
    unicode: "💰"
  },
  {
    id: 65,
    name: "Two of Pentacles",
    suit: "pentacles",
    number: 2,
    arcana: "minor",
    element: "earth",
    keywords: ["multiple priorities", "time management", "prioritization"],
    description: "A figure juggles two pentacles connected by an infinity symbol, with ships on rough seas behind.",
    symbolism: ["juggling pentacles (balance)", "infinity symbol (endless cycle)", "rough seas (challenges)", "dancing posture (adaptability)"],
    divination: {
      upright: "Multiple priorities, time management, prioritization. Balancing different areas of life.",
      reversed: "Over-committed, disorganization, reprioritization. Dropping the ball or losing balance."
    },
    unicode: "🤹"
  },
  {
    id: 66,
    name: "Three of Pentacles",
    suit: "pentacles",
    number: 3,
    arcana: "minor",
    element: "earth",
    keywords: ["teamwork", "collaboration", "learning"],
    description: "A stonemason works on a cathedral while an architect and monk observe and discuss the plans.",
    symbolism: ["cathedral (grand project)", "three figures (collaboration)", "pentacles in architecture (material creation)", "plans (preparation)"],
    divination: {
      upright: "Teamwork, collaboration, learning. Working with others toward common goals.",
      reversed: "Disharmony, alignment issues, lack of teamwork. Poor collaboration or conflicts at work."
    },
    unicode: "🏗️"
  },
  {
    id: 67,
    name: "Four of Pentacles",
    suit: "pentacles",
    number: 4,
    arcana: "minor",
    element: "earth",
    keywords: ["saving money", "security", "conservatism"],
    description: "A figure sits holding tightly to a pentacle, with one under each foot and one balanced on their head.",
    symbolism: ["tight grip (possessiveness)", "multiple pentacles (security)", "rigid posture (inflexibility)", "city behind (material world)"],
    divination: {
      upright: "Saving money, security, conservatism. Holding onto resources but perhaps too tightly.",
      reversed: "Over-spending, greed, self-protection. Either hoarding resources or spending recklessly."
    },
    unicode: "🏦"
  },
  {
    id: 68,
    name: "Five of Pentacles",
    suit: "pentacles",
    number: 5,
    arcana: "minor",
    element: "earth",
    keywords: ["financial loss", "poverty", "lack mindset"],
    description: "Two figures trudge through snow past a lighted church window showing five pentacles.",
    symbolism: ["snow (hardship)", "church window (help available)", "crutches (support needed)", "five pentacles (spiritual wealth)"],
    divination: {
      upright: "Financial loss, poverty, lack mindset. Material hardship but help is available.",
      reversed: "Recovery from loss, spiritual poverty. Improving finances or realizing non-material wealth."
    },
    unicode: "❄️"
  },
  {
    id: 69,
    name: "Six of Pentacles",
    suit: "pentacles",
    number: 6,
    arcana: "minor",
    element: "earth",
    keywords: ["generosity", "charity", "sharing"],
    description: "A wealthy figure gives coins to two beggars while holding scales, with six pentacles above.",
    symbolism: ["giving coins (generosity)", "scales (balance)", "wealthy robes (abundance)", "grateful recipients (charity)"],
    divination: {
      upright: "Generosity, charity, sharing. Giving and receiving in balance. Fair exchange.",
      reversed: "Self-care, unpaid debts, one-sided charity. Giving too much or strings attached to generosity."
    },
    unicode: "🤝"
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    suit: "pentacles",
    number: 7,
    arcana: "minor",
    element: "earth",
    keywords: ["assessment", "reward", "perseverance"],
    description: "A figure leans on a hoe while contemplating seven pentacles growing on a bush.",
    symbolism: ["growing pentacles (investment results)", "hoe (hard work)", "contemplative pose (assessment)", "lush growth (progress)"],
    divination: {
      upright: "Assessment, reward, perseverance. Evaluating progress and long-term investments.",
      reversed: "Lack of reward, impatience, poor investment. Not seeing results or wanting quick returns."
    },
    unicode: "🌱"
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    suit: "pentacles",
    number: 8,
    arcana: "minor",
    element: "earth",
    keywords: ["apprenticeship", "repetitive tasks", "skill development"],
    description: "A craftsman diligently works on pentacles, with six completed ones displayed and tools nearby.",
    symbolism: ["focused work (dedication)", "completed pentacles (mastery)", "tools (skill)", "isolated setting (concentration)"],
    divination: {
      upright: "Apprenticeship, repetitive tasks, skill development. Dedicating yourself to mastering a skill.",
      reversed: "Lack of focus, perfectionism, misdirected activity. Poor craftsmanship or wasted effort."
    },
    unicode: "🔨"
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    suit: "pentacles",
    number: 9,
    arcana: "minor",
    element: "earth",
    keywords: ["abundance", "luxury", "self-reliance"],
    description: "An elegant figure in fine robes stands in a vineyard with a hooded falcon, nine pentacles adorning the vines.",
    symbolism: ["fine robes (luxury)", "vineyard (abundance)", "falcon (independence)", "nine pentacles (material success)"],
    divination: {
      upright: "Abundance, luxury, self-reliance. Financial independence and enjoying the fruits of labor.",
      reversed: "Self-worth, over-investment in work, hustling. Working too hard or tying worth to wealth."
    },
    unicode: "🍇"
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    suit: "pentacles",
    number: 10,
    arcana: "minor",
    element: "earth",
    keywords: ["legacy", "culmination", "inheritance"],
    description: "An elderly figure watches a family scene under an archway decorated with ten pentacles and family crests.",
    symbolism: ["elderly figure (wisdom)", "family scene (legacy)", "archway (tradition)", "family crests (heritage)"],
    divination: {
      upright: "Legacy, culmination, inheritance. Long-term success and family wealth. Generational prosperity.",
      reversed: "Fleeting success, lack of stability, family disputes. Temporary wealth or family financial problems."
    },
    unicode: "🏰"
  },
  {
    id: 74,
    name: "Page of Pentacles",
    suit: "pentacles",
    number: "page",
    arcana: "minor",
    element: "earth",
    keywords: ["ambition", "desire", "diligence"],
    description: "A young figure holds a pentacle up for examination, standing in a field with mountains behind.",
    symbolism: ["examining pentacle (study)", "field (potential)", "mountains (goals)", "focused attention (dedication)"],
    divination: {
      upright: "Ambition, desire, diligence. New opportunities for learning and material growth.",
      reversed: "Lack of commitment, procrastination, distraction. Poor planning or lack of follow-through."
    },
    unicode: "🎓"
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    suit: "pentacles",
    number: "knight",
    arcana: "minor",
    element: "earth",
    keywords: ["efficiency", "hard work", "routine"],
    description: "A knight sits motionless on a heavy work horse, holding a pentacle, with plowed fields around.",
    symbolism: ["heavy horse (steady progress)", "plowed fields (hard work)", "motionless pose (patience)", "pentacle (material focus)"],
    divination: {
      upright: "Efficiency, hard work, routine. Methodical progress toward material goals.",
      reversed: "Laziness, obsessiveness, work without reward. Being a workaholic or avoiding responsibility."
    },
    unicode: "🐎"
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    suit: "pentacles",
    number: "queen",
    arcana: "minor",
    element: "earth",
    keywords: ["practicality", "creature comforts", "financial security"],
    description: "A queen sits on a throne decorated with fruit and flowers, holding a large pentacle and surrounded by abundance.",
    symbolism: ["fruit and flowers (abundance)", "comfortable throne (security)", "large pentacle (wealth)", "rabbit (fertility)"],
    divination: {
      upright: "Practicality, creature comforts, financial security. Nurturing abundance and practical wisdom.",
      reversed: "Financial independence, self-care, work-home conflict. Neglecting self or family for material gain."
    },
    unicode: "👸"
  },
  {
    id: 77,
    name: "King of Pentacles",
    suit: "pentacles",
    number: "king",
    arcana: "minor",
    element: "earth",
    keywords: ["abundance", "financial success", "leadership"],
    description: "A king sits on a throne in a garden, holding a pentacle, surrounded by grapes, flowers, and luxury.",
    symbolism: ["garden setting (cultivation)", "grapes (abundance)", "pentacle (mastery)", "bull (Taurus/earth)", "luxury robes (success)"],
    divination: {
      upright: "Abundance, financial success, leadership. Mastery of the material world and generous leadership.",
      reversed: "Stubborn, controlling, cheap. Misusing wealth or being overly materialistic."
    },
    unicode: "👑"
  }
];

// Helper functions for deck management
export function getFullTarotDeck(): TarotCard[] {
  // Return all 78 cards with image URLs
  const allCards = [...majorArcana, ...wands, ...cups, ...swords, ...pentacles];
  return allCards.map(card => enhanceCardWithImage(card));
}

export function drawSingleTarotCard(): { card: TarotCard; reversed: boolean } {
  const fullDeck = getFullTarotDeck();
  const randomIndex = Math.floor(Math.random() * fullDeck.length);
  const card = fullDeck[randomIndex];
  const reversed = isTarotCardReversed();
  
  return { card, reversed };
}

export function drawTarotCardsWithoutReplacement(count: number): Array<{ card: TarotCard; reversed: boolean }> {
  const fullDeck = getFullTarotDeck();
  if (count > fullDeck.length) {
    throw new Error(`Cannot draw ${count} cards from a deck of ${fullDeck.length}`);
  }

  const shuffledDeck = [...fullDeck];
  const drawnCards: Array<{ card: TarotCard; reversed: boolean }> = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledDeck.length);
    const drawnCard = shuffledDeck[randomIndex];
    const reversed = isTarotCardReversed();
    
    drawnCards.push({ card: drawnCard, reversed });
    shuffledDeck.splice(randomIndex, 1);
  }

  return drawnCards;
}

export function getTarotCardById(id: number): TarotCard | undefined {
  const fullDeck = getFullTarotDeck();
  return fullDeck.find(card => card.id === id);
}

export function getMajorArcana(): TarotCard[] {
  return majorArcana.map(card => enhanceCardWithImage(card));
}

export function getMinorArcana(): TarotCard[] {
  const minorCards = [...wands, ...cups, ...swords, ...pentacles];
  return minorCards.map(card => enhanceCardWithImage(card));
}

export function getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): TarotCard[] {
  const suitArrays = { wands, cups, swords, pentacles };
  return suitArrays[suit].map(card => enhanceCardWithImage(card));
}

// Tarot card reversal (traditional 50% chance)  
export function isTarotCardReversed(): boolean {
  return Math.random() < 0.5;
}

export function generateTarotReversals(count: number): boolean[] {
  return Array.from({ length: count }, () => isTarotCardReversed());
}

// Common Tarot spreads
export interface TarotSpread {
  name: string;
  positions: string[];
  description: string;
}

export const tarotSpreads: TarotSpread[] = [
  {
    name: "Single Card",
    positions: ["Present Situation"],
    description: "A simple one-card draw for daily guidance or quick insight."
  },
  {
    name: "Three-Card Spread",
    positions: ["Past", "Present", "Future"],
    description: "The classic past-present-future spread for understanding timeline and progression."
  },
  {
    name: "Celtic Cross",
    positions: [
      "Present Situation", 
      "Challenge/Cross", 
      "Distant Past/Foundation", 
      "Recent Past", 
      "Possible Outcome", 
      "Immediate Future", 
      "Your Approach", 
      "External Influences", 
      "Hopes and Fears", 
      "Final Outcome"
    ],
    description: "The most comprehensive 10-card spread for deep life questions and complex situations."
  },
  {
    name: "Relationship Spread",
    positions: ["You", "Partner", "Relationship Dynamic", "Challenge", "Outcome"],
    description: "A 5-card spread specifically designed for relationship questions and dynamics."
  }
];

export function drawTarotSpread(spreadName: string): Array<{ position: string; card: TarotCard; reversed: boolean }> {
  const spread = tarotSpreads.find(s => s.name === spreadName);
  if (!spread) {
    throw new Error(`Spread "${spreadName}" not found`);
  }

  const cards = drawTarotCardsWithoutReplacement(spread.positions.length);
  
  return spread.positions.map((position, index) => ({
    position,
    card: cards[index].card,
    reversed: cards[index].reversed
  }));
}
