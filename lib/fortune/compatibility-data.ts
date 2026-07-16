export type RelationshipType = "love" | "friendship" | "general";
export type CompatibilityLocale = "en" | "ru";

export interface MetricDef {
  id: string;
  labelEn: string;
  labelRu: string;
  /** Alternate label used for the "friendship" relationship type, where
   * a romantic-leaning word (e.g. "Passion") doesn't fit. */
  labelFriendshipEn?: string;
  labelFriendshipRu?: string;
}

/**
 * The six sub-metrics scored for every pair. Kept relationship-type
 * agnostic in structure (so scoring logic stays simple and the result
 * card always shows the same six rows), but a couple of labels adapt
 * their wording depending on the chosen relationship type.
 */
export const METRICS: readonly MetricDef[] = [
  { id: "emotional", labelEn: "Emotional Connection", labelRu: "Эмоциональная связь" },
  { id: "communication", labelEn: "Communication", labelRu: "Общение" },
  { id: "trust", labelEn: "Trust", labelRu: "Доверие" },
  { id: "values", labelEn: "Shared Values", labelRu: "Общие ценности" },
  {
    id: "chemistry",
    labelEn: "Chemistry",
    labelRu: "Химия",
    labelFriendshipEn: "Fun Together",
    labelFriendshipRu: "Веселье вместе",
  },
  {
    id: "potential",
    labelEn: "Long-Term Potential",
    labelRu: "Долгосрочный потенциал",
    labelFriendshipEn: "Lasting Bond",
    labelFriendshipRu: "Прочность связи",
  },
];

export function metricLabel(
  metric: MetricDef,
  locale: CompatibilityLocale,
  relationship: RelationshipType,
): string {
  if (relationship === "friendship") {
    if (locale === "ru" && metric.labelFriendshipRu) return metric.labelFriendshipRu;
    if (locale === "en" && metric.labelFriendshipEn) return metric.labelFriendshipEn;
  }
  return locale === "ru" ? metric.labelRu : metric.labelEn;
}

/** Score buckets used to select interpretation text. Bounds are
 * inclusive lower, exclusive upper (except the last). */
export const SCORE_BUCKETS = [
  { min: 0, max: 45, id: "low" },
  { min: 45, max: 62, id: "mixed" },
  { min: 62, max: 78, id: "good" },
  { min: 78, max: 91, id: "strong" },
  { min: 91, max: 101, id: "exceptional" },
] as const;

export type ScoreBucketId = (typeof SCORE_BUCKETS)[number]["id"];

export function bucketForScore(score: number): ScoreBucketId {
  const bucket = SCORE_BUCKETS.find((b) => score >= b.min && score < b.max);
  return bucket?.id ?? "mixed";
}

/**
 * Per-metric, per-bucket interpretation text. Every entry reads as a
 * grounded, non-absolute observation ("tends to", "often") rather than
 * a scientific claim, matching the entertainment-only framing used
 * throughout the fortune tools.
 */
type MetricTextBank = Record<ScoreBucketId, { en: string; ru: string }>;

export const METRIC_TEXT: Record<string, MetricTextBank> = {
  emotional: {
    low: {
      en: "You two may read each other's feelings differently right now — worth checking in more openly.",
      ru: "Сейчас вы можете по-разному считывать чувства друг друга — стоит чаще проговаривать их открыто.",
    },
    mixed: {
      en: "There's a real emotional thread here, even if it takes a bit of effort to stay in sync.",
      ru: "Эмоциональная связь есть, хотя иногда требует усилий, чтобы оставаться на одной волне.",
    },
    good: {
      en: "You tend to notice when something's off with each other, which goes a long way.",
      ru: "Вы обычно замечаете, если с другим что-то не так, а это уже немало.",
    },
    strong: {
      en: "There's an easy emotional understanding between you that doesn't need many words.",
      ru: "Между вами есть лёгкое эмоциональное понимание, которому не нужно много слов.",
    },
    exceptional: {
      en: "You two seem to feel the room the same way — a rare kind of emotional shorthand.",
      ru: "Вы будто чувствуете обстановку одинаково — редкая эмоциональная синхронность.",
    },
  },
  communication: {
    low: {
      en: "Conversations may need a little more patience — clarifying instead of assuming helps a lot here.",
      ru: "Разговорам иногда не хватает терпения — здесь очень помогает уточнять, а не додумывать.",
    },
    mixed: {
      en: "You communicate well on some topics and talk past each other on others — worth noticing which is which.",
      ru: "В одних темах вы понимаете друг друга легко, в других — расходитесь во мнениях, стоит замечать разницу.",
    },
    good: {
      en: "Most things get said clearly enough, and misunderstandings don't tend to linger.",
      ru: "Большинство вещей проговаривается достаточно ясно, а недопонимания не задерживаются надолго.",
    },
    strong: {
      en: "You explain things to each other in a way that actually lands — a real strength.",
      ru: "Вы объясняете друг другу так, что это действительно доходит — настоящая сильная сторона.",
    },
    exceptional: {
      en: "Conversation between you flows with very little friction, even on tricky topics.",
      ru: "Разговор между вами течёт почти без трения, даже на непростые темы.",
    },
  },
  trust: {
    low: {
      en: "Trust here is still being built — small, consistent follow-through matters more than grand promises.",
      ru: "Доверие здесь ещё формируется — маленькая, но постоянная надёжность важнее громких обещаний.",
    },
    mixed: {
      en: "There's a reasonable baseline of trust, with room to grow through consistency over time.",
      ru: "Есть разумная база доверия, которая может расти через постоянство со временем.",
    },
    good: {
      en: "You generally take each other at your word, which keeps things simple.",
      ru: "Вы, как правило, верите друг другу на слово, и это многое упрощает.",
    },
    strong: {
      en: "There's a dependable trust here — you don't second-guess each other's intentions often.",
      ru: "Здесь есть надёжное доверие — вы редко сомневаетесь в намерениях друг друга.",
    },
    exceptional: {
      en: "The kind of trust where you don't have to explain yourself twice.",
      ru: "Такое доверие, при котором не нужно объяснять себя дважды.",
    },
  },
  values: {
    low: {
      en: "Your priorities may point in different directions right now — worth naming them plainly to each other.",
      ru: "Ваши приоритеты сейчас могут указывать в разные стороны — стоит прямо назвать их друг другу.",
    },
    mixed: {
      en: "You share some core values and differ on others — a normal, workable mix.",
      ru: "У вас общие некоторые ключевые ценности, а в других вы расходитесь — нормальное, рабочее сочетание.",
    },
    good: {
      en: "You tend to agree on what actually matters, even if the details differ.",
      ru: "Вы обычно сходитесь в том, что действительно важно, даже если детали различаются.",
    },
    strong: {
      en: "Your sense of what's important in life lines up more often than not.",
      ru: "Ваше понимание того, что важно в жизни, совпадает чаще, чем нет.",
    },
    exceptional: {
      en: "A genuinely rare alignment in what you both want out of life.",
      ru: "По-настоящему редкое совпадение в том, чего вы оба хотите от жизни.",
    },
  },
  chemistry: {
    low: {
      en: "The spark here may need more shared time to build — it's not always instant.",
      ru: "Искре здесь может понадобиться больше совместного времени — она не всегда мгновенна.",
    },
    mixed: {
      en: "There's a noticeable spark, though it comes and goes rather than staying constant.",
      ru: "Искра заметна, хотя она скорее приходит и уходит, чем горит постоянно.",
    },
    good: {
      en: "There's a comfortable, genuine energy when you're together.",
      ru: "Когда вы вместе, ощущается тёплая и настоящая энергия.",
    },
    strong: {
      en: "The energy between you is hard to miss — things feel easy and alive.",
      ru: "Энергию между вами трудно не заметить — всё ощущается легко и живо.",
    },
    exceptional: {
      en: "A rare, magnetic kind of energy that people around you probably notice too.",
      ru: "Редкая, притягательная энергия, которую наверняка замечают и окружающие.",
    },
  },
  potential: {
    low: {
      en: "Long-term potential here depends a lot on how you both handle the next few conversations.",
      ru: "Долгосрочный потенциал здесь сильно зависит от того, как пройдут следующие важные разговоры.",
    },
    mixed: {
      en: "There's real potential, but it will likely need patience and intentional effort to build.",
      ru: "Потенциал реален, но, скорее всего, потребует терпения и осознанных усилий.",
    },
    good: {
      en: "The foundations for something lasting are there, if you keep investing in them.",
      ru: "Основа для чего-то длительного уже есть, если продолжать в неё вкладываться.",
    },
    strong: {
      en: "This looks like the kind of connection that tends to get stronger with time.",
      ru: "Это похоже на связь, которая со временем обычно становится только крепче.",
    },
    exceptional: {
      en: "A connection with genuinely strong long-term potential, if you both keep showing up for it.",
      ru: "Связь с по-настоящему сильным долгосрочным потенциалом, если вы оба будете вкладываться в неё.",
    },
  },
};

/** Headline text keyed by overall score bucket and relationship type. */
export const OVERALL_TEXT: Record<
  ScoreBucketId,
  Record<RelationshipType, { en: string; ru: string }>
> = {
  low: {
    love: {
      en: "There are real differences to work through here — not a dead end, but it will take honest effort from both sides.",
      ru: "Здесь есть реальные различия, которые стоит проработать — это не тупик, но потребует честных усилий с обеих сторон.",
    },
    friendship: {
      en: "This friendship may need a bit more common ground to really click — worth giving it time.",
      ru: "Этой дружбе может не хватать общей почвы, чтобы по-настоящему заладиться — стоит дать ей время.",
    },
    general: {
      en: "This pairing has some friction points worth being aware of before reading too much into it.",
      ru: "В этой паре есть моменты трения, о которых стоит знать, не придавая им слишком большого значения.",
    },
  },
  mixed: {
    love: {
      en: "A mixed but workable match — the strong points are worth building on, and the gaps are worth talking about.",
      ru: "Смешанная, но рабочая совместимость — сильные стороны стоит развивать, а различия — обсуждать.",
    },
    friendship: {
      en: "A solid, ordinary friendship with room to grow closer over time.",
      ru: "Крепкая, обычная дружба, у которой есть пространство для сближения со временем.",
    },
    general: {
      en: "A balanced mix of ease and effort — pretty typical for two different people.",
      ru: "Сбалансированное сочетание лёгкости и усилий — довольно типично для двух разных людей.",
    },
  },
  good: {
    love: {
      en: "A genuinely good match — the fundamentals are solid, with normal room to keep growing together.",
      ru: "По-настоящему хорошая пара — основа крепкая, с обычным пространством для совместного роста.",
    },
    friendship: {
      en: "An easy, comfortable friendship that seems to work without much forcing.",
      ru: "Лёгкая, комфортная дружба, которая, кажется, складывается без особых усилий.",
    },
    general: {
      en: "A good overall dynamic — more ease than friction in how you relate to each other.",
      ru: "Хорошая общая динамика — больше лёгкости, чем трения в том, как вы общаетесь.",
    },
  },
  strong: {
    love: {
      en: "A strong match with a lot going for it — the kind of connection worth genuinely investing in.",
      ru: "Сильная пара с множеством плюсов — связь, в которую действительно стоит вкладываться.",
    },
    friendship: {
      en: "A close, reliable friendship — the kind you can pick back up after time apart.",
      ru: "Близкая, надёжная дружба — из тех, что легко продолжить даже после долгого перерыва.",
    },
    general: {
      en: "A strong overall connection with a lot of natural ease between you.",
      ru: "Сильная общая связь с большой естественной лёгкостью между вами.",
    },
  },
  exceptional: {
    love: {
      en: "An exceptional match on paper — rare alignment across nearly everything measured here.",
      ru: "Исключительная пара по всем меркам — редкое совпадение почти по всем показателям.",
    },
    friendship: {
      en: "A rare kind of friendship — the sort people describe as finding a lifelong friend.",
      ru: "Редкая дружба — из тех, что называют настоящей дружбой на всю жизнь.",
    },
    general: {
      en: "An exceptionally strong connection across the board — genuinely rare.",
      ru: "Исключительно сильная связь по всем параметрам — действительно редкая.",
    },
  },
};
