"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  UNIT_CATEGORIES,
  UNITS_BY_CATEGORY,
  convertUnit,
  type UnitCategory,
} from "@/lib/tools/unit-converter";

export function UnitConverter() {
  const [category, setCategory] = React.useState<UnitCategory>("length");
  const units = UNITS_BY_CATEGORY[category];

  const [fromUnit, setFromUnit] = React.useState(units[0].id);
  const [toUnit, setToUnit] = React.useState(units[1]?.id ?? units[0].id);
  const [value, setValue] = React.useState("1");

  const handleCategoryChange = (next: UnitCategory) => {
    setCategory(next);
    const nextUnits = UNITS_BY_CATEGORY[next];
    setFromUnit(nextUnits[0].id);
    setToUnit(nextUnits[1]?.id ?? nextUnits[0].id);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const numericValue = parseFloat(value);
  const converted =
    value.trim() !== "" && !isNaN(numericValue)
      ? convertUnit(numericValue, category, fromUnit, toUnit)
      : null;

  const formattedResult =
    converted === null
      ? "—"
      : parseFloat(converted.toFixed(6)).toLocaleString("en-US", {
          maximumFractionDigits: 6,
        });

  const categoryOptions = UNIT_CATEGORIES.map((c) => ({ value: c.id, label: c.label }));
  const unitOptions = units.map((u) => ({ value: u.id, label: u.label }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--foreground)]">Category</label>
        <Select
          options={categoryOptions}
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value as UnitCategory)}
        />
      </div>

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">From</label>
          <Select
            options={unitOptions}
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          />
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1"
          />
        </div>

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap units"
          className="mb-1 flex h-10 w-10 items-center justify-center self-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          ⇄
        </button>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">To</label>
          <Select
            options={unitOptions}
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          />
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

UnitConverter.displayName = "UnitConverter";
