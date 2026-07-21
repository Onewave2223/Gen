"use client";

import * as React from "react";
import {
  convertUnit,
  type UnitCategory,
} from "@/lib/tools/unit-converter";

const CATEGORY_LABELS: Record<UnitCategory, string> = {
  length: "Длина",
  weight: "Вес",
  temperature: "Температура",
  volume: "Объём",
};

const UNITS_RU: Record<UnitCategory, { id: string; label: string }[]> = {
  length: [
    { id: "mm", label: "Миллиметры (мм)" },
    { id: "cm", label: "Сантиметры (см)" },
    { id: "m", label: "Метры (м)" },
    { id: "km", label: "Километры (км)" },
    { id: "in", label: "Дюймы (in)" },
    { id: "ft", label: "Футы (ft)" },
    { id: "yd", label: "Ярды (yd)" },
    { id: "mi", label: "Мили (mi)" },
  ],
  weight: [
    { id: "mg", label: "Миллиграммы (мг)" },
    { id: "g", label: "Граммы (г)" },
    { id: "kg", label: "Килограммы (кг)" },
    { id: "oz", label: "Унции (oz)" },
    { id: "lb", label: "Фунты (lb)" },
    { id: "st", label: "Стоуны (st)" },
  ],
  temperature: [
    { id: "c", label: "Цельсий (°C)" },
    { id: "f", label: "Фаренгейт (°F)" },
    { id: "k", label: "Кельвин (K)" },
  ],
  volume: [
    { id: "ml", label: "Миллилитры (мл)" },
    { id: "l", label: "Литры (л)" },
    { id: "gal", label: "Галлоны США (gal)" },
    { id: "qt", label: "Кварты США (qt)" },
    { id: "pt", label: "Пинты США (pt)" },
    { id: "cup", label: "Чашки США (cup)" },
    { id: "flOz", label: "Жидкие унции США (fl oz)" },
  ],
};

const CATEGORY_IDS: UnitCategory[] = ["length", "weight", "temperature", "volume"];

export function UnitConverterRu() {
  const [category, setCategory] = React.useState<UnitCategory>("length");
  const units = UNITS_RU[category];

  const [fromUnit, setFromUnit] = React.useState(units[0].id);
  const [toUnit, setToUnit] = React.useState(units[1]?.id ?? units[0].id);
  const [value, setValue] = React.useState("1");

  const handleCategoryChange = (next: UnitCategory) => {
    setCategory(next);
    const nextUnits = UNITS_RU[next];
    setFromUnit(nextUnits[0].id);
    setToUnit(nextUnits[1]?.id ?? nextUnits[0].id);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const numericValue = parseFloat(value.replace(",", "."));
  const converted =
    value.trim() !== "" && !isNaN(numericValue)
      ? convertUnit(numericValue, category, fromUnit, toUnit)
      : null;

  const formattedResult =
    converted === null
      ? "—"
      : parseFloat(converted.toFixed(6)).toLocaleString("ru-RU", {
          maximumFractionDigits: 6,
        });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--foreground)]">Категория</label>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value as UnitCategory)}
          className="flex h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          {CATEGORY_IDS.map((id) => (
            <option key={id} value={id}>
              {CATEGORY_LABELS[id]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">Из</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="flex h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          />
        </div>

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Поменять единицы"
          className="mb-1 flex h-10 w-10 items-center justify-center self-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          ⇄
        </button>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">В</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="flex h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
          <div className="mt-1 flex h-10 items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--foreground)]">
            {formattedResult}
          </div>
        </div>
      </div>

      {converted !== null && (
        <p className="text-sm text-[var(--muted)]">
          {value} {units.find((u) => u.id === fromUnit)?.label} = {formattedResult}{" "}
          {units.find((u) => u.id === toUnit)?.label}
        </p>
      )}
    </div>
  );
}

UnitConverterRu.displayName = "UnitConverterRu";
