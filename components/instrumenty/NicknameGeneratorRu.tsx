"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

type NickStyle = "adj-noun" | "gaming" | "number";

const STYLE_LABELS: Record<NickStyle, string> = {
  "adj-noun": "Прилагательное + существительное",
  "gaming": "Игровой стиль",
  "number": "С числовым суффиксом",
};

const ADJECTIVES = [
  "Быстрый","Хитрый","Смелый","Мощный","Тихий","Острый","Дерзкий","Ловкий",
  "Стальной","Ледяной","Огненный","Тёмный","Золотой","Серебряный","Железный",
  "Дикий","Скрытный","Яростный","Безмолвный","Вечный","Бешеный","Лихой",
  "Сумрачный","Блестящий","Суровый","Свирепый","Молниеносный","Призрачный",
];

const NOUNS = [
  "Волк","Орёл","Тигр","Дракон","Ворон","Лис","Сокол","Медведь",
  "Пантера","Кобра","Ягуар","Рысь","Лев","Акула","Ястреб","Гепард",
  "Буйвол","Скорпион","Вепрь","Страж","Воин","Охотник","Рейдер","Призрак",
];

const GAMING_PREFIXES = [
  "x","xx","xX","pro","mega","dark","shadow","neo","ultra","gg","ez",
  "epic","real","true","last","lone","cool","n1","l33t",
];

const GAMING_WORDS = [
  "Wolf","Eagle","Tiger","Dragon","Raven","Ghost","Sniper","Ninja",
  "Blade","Storm","Frost","Blaze","Void","Apex","Viper","Titan",
  "Reaper","Wraith","Phantom","Savage","Hunter","Slayer","Boss",
];

const GAMING_SUFFIXES = [
  "_RU","_Pro","Gaming","Play","TV","Live","_Real","HD","4K","Official",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNick(style: NickStyle): string {
  switch (style) {
    case "adj-noun": {
      const adj = pick(ADJECTIVES);
      const noun = pick(NOUNS);
      return `${adj}${noun}`;
    }
    case "gaming": {
      const prefix = pick(GAMING_PREFIXES);
      const word = pick(GAMING_WORDS);
      const suffix = Math.random() > 0.5 ? pick(GAMING_SUFFIXES) : "";
      return `${prefix}${word}${suffix}`;
    }
    case "number": {
      const adj = pick(ADJECTIVES);
      const noun = pick(NOUNS);
      const num = Math.floor(Math.random() * 9000) + 100;
      return `${adj}${noun}${num}`;
    }
  }
}

export function NicknameGeneratorRu() {
  const countId = React.useId();
  const [style, setStyle] = React.useState<NickStyle>("adj-noun");
  const [count, setCount] = React.useState(5);
  const [nicks, setNicks] = React.useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const generate = () => {
    setNicks(Array.from({ length: count }, () => generateNick(style)));
  };

  const copyOne = async (nick: string, i: number) => {
    try {
      await navigator.clipboard.writeText(nick);
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--foreground)]">Стиль никнейма</span>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {(Object.keys(STYLE_LABELS) as NickStyle[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors ${
                style === s
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {STYLE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
          Количество (1–20)
        </label>
        <input
          id={countId}
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-32 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      <Button onClick={generate}>Сгенерировать</Button>

      {nicks.length > 0 && (
        <ul className="flex flex-col gap-2">
          {nicks.map((nick, i) => (
            <li
              key={`${nick}-${i}`}
              className="flex items-center justify-between gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-2"
            >
              <span className="font-mono text-sm font-medium text-[var(--foreground)]">{nick}</span>
              <button
                type="button"
                onClick={() => copyOne(nick, i)}
                className="shrink-0 rounded-[var(--radius)] border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {copiedIndex === i ? "✓" : "Копировать"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

NicknameGeneratorRu.displayName = "NicknameGeneratorRu";
