// ============================================================
// Verse of the Day — seasonal curation
// 52 verses (one per week), organised by the rough Christian
// calendar: New Year / Ordinary · Lent · Easter · Pentecost ·
// Summer / Wisdom · Harvest / Gratitude · Advent · Christmas.
//
// Selection: weekOfYear (0–51) → verse index.
// No API call — zero cost, zero latency, always available.
// ============================================================

export interface DailyVerse {
  reference: string;
  text: string;
  season: string; // label shown in the ticker
}

const VERSES: DailyVerse[] = [
  // ── New Year & Ordinary Time (weeks 0–7, Jan) ────────────
  {
    reference: "Lamentations 3:22–23",
    text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.",
    season: "New Year",
  },
  {
    reference: "Isaiah 40:31",
    text: "Those who wait for the Lord shall renew their strength; they shall mount up with wings like eagles.",
    season: "New Year",
  },
  {
    reference: "2 Corinthians 5:17",
    text: "If anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
    season: "New Year",
  },
  {
    reference: "Psalm 119:105",
    text: "Your word is a lamp to my feet and a light to my path.",
    season: "Ordinary Time",
  },
  {
    reference: "Romans 8:28",
    text: "We know that for those who love God all things work together for good, for those who are called according to his purpose.",
    season: "Ordinary Time",
  },
  {
    reference: "Psalm 46:10",
    text: "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth.",
    season: "Ordinary Time",
  },
  {
    reference: "John 1:1",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    season: "Ordinary Time",
  },
  {
    reference: "Matthew 5:6",
    text: "Blessed are those who hunger and thirst for righteousness, for they shall be satisfied.",
    season: "Ordinary Time",
  },

  // ── Lent — reflection, repentance (weeks 8–13, Feb–Mar) ──
  {
    reference: "Psalm 51:10",
    text: "Create in me a clean heart, O God, and renew a right spirit within me.",
    season: "Lent",
  },
  {
    reference: "Joel 2:12–13",
    text: "Return to me with all your heart. Rend your hearts and not your garments. Return to the Lord your God, for he is gracious and merciful.",
    season: "Lent",
  },
  {
    reference: "Matthew 4:4",
    text: "Man shall not live by bread alone, but by every word that comes from the mouth of God.",
    season: "Lent",
  },
  {
    reference: "Hebrews 12:1–2",
    text: "Let us run with endurance the race that is set before us, looking to Jesus, the founder and perfecter of our faith.",
    season: "Lent",
  },
  {
    reference: "Isaiah 53:5",
    text: "He was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace.",
    season: "Holy Week",
  },
  {
    reference: "1 John 1:9",
    text: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
    season: "Lent",
  },

  // ── Easter — resurrection, hope (weeks 14–17, Apr) ───────
  {
    reference: "John 11:25",
    text: "Jesus said to her, 'I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live.'",
    season: "Easter",
  },
  {
    reference: "1 Corinthians 15:55",
    text: "O death, where is your victory? O death, where is your sting? Thanks be to God, who gives us the victory through our Lord Jesus Christ.",
    season: "Easter",
  },
  {
    reference: "Romans 6:4",
    text: "We were buried therefore with him by baptism into death, in order that, just as Christ was raised from the dead, we too might walk in newness of life.",
    season: "Easter",
  },
  {
    reference: "Matthew 28:6",
    text: "He is not here, for he has risen, as he said. Come, see the place where he lay.",
    season: "Easter",
  },

  // ── Pentecost — Spirit, love, growth (weeks 18–25, May–Jun) ─
  {
    reference: "John 14:26",
    text: "The Helper, the Holy Spirit, whom the Father will send in my name, he will teach you all things.",
    season: "Pentecost",
  },
  {
    reference: "Galatians 5:22–23",
    text: "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
    season: "Pentecost",
  },
  {
    reference: "1 Corinthians 13:4–7",
    text: "Love is patient and kind; love does not envy or boast; it is not arrogant or rude. Love bears all things, believes all things, hopes all things, endures all things.",
    season: "Pentecost",
  },
  {
    reference: "Romans 5:5",
    text: "Hope does not put us to shame, because God's love has been poured into our hearts through the Holy Spirit who has been given to us.",
    season: "Pentecost",
  },
  {
    reference: "John 15:5",
    text: "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.",
    season: "Pentecost",
  },
  {
    reference: "Ephesians 2:8–9",
    text: "By grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.",
    season: "Pentecost",
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through him who strengthens me.",
    season: "Pentecost",
  },
  {
    reference: "Acts 2:17",
    text: "In the last days it shall be, God declares, that I will pour out my Spirit on all flesh.",
    season: "Pentecost",
  },

  // ── Summer / Wisdom (weeks 26–35, Jun–Sep) ───────────────
  {
    reference: "Proverbs 3:5–6",
    text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    season: "Ordinary Time",
  },
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want.",
    season: "Ordinary Time",
  },
  {
    reference: "Matthew 11:28–30",
    text: "Come to me, all who labour and are heavy laden, and I will give you rest. My yoke is easy, and my burden is light.",
    season: "Ordinary Time",
  },
  {
    reference: "Joshua 1:9",
    text: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
    season: "Ordinary Time",
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    season: "Ordinary Time",
  },
  {
    reference: "Romans 12:2",
    text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God.",
    season: "Ordinary Time",
  },
  {
    reference: "Hebrews 11:1",
    text: "Now faith is the assurance of things hoped for, the conviction of things not seen.",
    season: "Ordinary Time",
  },
  {
    reference: "Matthew 22:37–39",
    text: "You shall love the Lord your God with all your heart and with all your soul and with all your mind. And you shall love your neighbour as yourself.",
    season: "Ordinary Time",
  },
  {
    reference: "James 1:5",
    text: "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him.",
    season: "Ordinary Time",
  },
  {
    reference: "Psalm 1:1–2",
    text: "Blessed is the man who walks not in the counsel of the wicked. His delight is in the law of the Lord, and on his law he meditates day and night.",
    season: "Ordinary Time",
  },

  // ── Harvest / Gratitude (weeks 36–43, Sep–Oct) ───────────
  {
    reference: "Philippians 4:6–7",
    text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    season: "Gratitude",
  },
  {
    reference: "1 Thessalonians 5:16–18",
    text: "Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
    season: "Gratitude",
  },
  {
    reference: "Psalm 100:4",
    text: "Enter his gates with thanksgiving, and his courts with praise! Give thanks to him; bless his name!",
    season: "Gratitude",
  },
  {
    reference: "Galatians 6:9",
    text: "Let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
    season: "Gratitude",
  },
  {
    reference: "Ephesians 3:20",
    text: "Now to him who is able to do far more abundantly than all that we ask or think, according to the power at work within us — to him be glory.",
    season: "Gratitude",
  },
  {
    reference: "Psalm 34:8",
    text: "Oh, taste and see that the Lord is good! Blessed is the man who takes refuge in him!",
    season: "Gratitude",
  },
  {
    reference: "James 1:2–4",
    text: "Count it all joy, my brothers, when you meet trials of various kinds, for the testing of your faith produces steadfastness.",
    season: "Gratitude",
  },
  {
    reference: "2 Corinthians 9:8",
    text: "God is able to make all grace abound to you, so that having all sufficiency in all things at all times, you may abound in every good work.",
    season: "Gratitude",
  },

  // ── Perseverance / Waiting (weeks 44–47, Nov) ────────────
  {
    reference: "Isaiah 41:10",
    text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you.",
    season: "Waiting",
  },
  {
    reference: "Psalm 27:14",
    text: "Wait for the Lord; be strong, and let your heart take courage; wait for the Lord!",
    season: "Waiting",
  },
  {
    reference: "Romans 8:38–39",
    text: "Neither death nor life, nor angels nor rulers, nor things present nor things to come, nor anything else in all creation, will be able to separate us from the love of God.",
    season: "Waiting",
  },
  {
    reference: "Lamentations 3:25–26",
    text: "The Lord is good to those who wait for him, to the soul who seeks him. It is good that one should wait quietly for the salvation of the Lord.",
    season: "Waiting",
  },

  // ── Advent & Christmas (weeks 48–52, Dec) ────────────────
  {
    reference: "Isaiah 9:6",
    text: "For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counsellor, Mighty God, Everlasting Father, Prince of Peace.",
    season: "Advent",
  },
  {
    reference: "Luke 2:10–11",
    text: "Fear not, for behold, I bring you good news of great joy that will be for all the people. For unto you is born this day in the city of David a Saviour, who is Christ the Lord.",
    season: "Christmas",
  },
  {
    reference: "John 1:14",
    text: "The Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.",
    season: "Christmas",
  },
  {
    reference: "Isaiah 7:14",
    text: "Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel — God with us.",
    season: "Advent",
  },
  {
    reference: "Micah 5:2",
    text: "But you, O Bethlehem Ephrathah, who are too little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel.",
    season: "Advent",
  },
];

/**
 * Returns today's verse based on the week of the year.
 * Deterministic per day — same verse for everyone on the same day.
 */
export function getDailyVerse(): DailyVerse {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );
  const weekIndex = Math.floor(dayOfYear / 7) % VERSES.length;
  return VERSES[weekIndex];
}
