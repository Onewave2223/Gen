export type UnitCategory = "length" | "weight" | "temperature" | "volume";

export interface UnitDefinition {
  id: string;
  label: string;
}

export const UNIT_CATEGORIES: readonly { id: UnitCategory; label: string }[] = [
  { id: "length", label: "Length" },
  { id: "weight", label: "Weight" },
  { id: "temperature", label: "Temperature" },
  { id: "volume", label: "Volume" },
];

export const UNITS_BY_CATEGORY: Record<UnitCategory, readonly UnitDefinition[]> = {
  length: [
    { id: "mm", label: "Millimeters (mm)" },
    { id: "cm", label: "Centimeters (cm)" },
    { id: "m", label: "Meters (m)" },
    { id: "km", label: "Kilometers (km)" },
    { id: "in", label: "Inches (in)" },
    { id: "ft", label: "Feet (ft)" },
    { id: "yd", label: "Yards (yd)" },
    { id: "mi", label: "Miles (mi)" },
  ],
  weight: [
    { id: "mg", label: "Milligrams (mg)" },
    { id: "g", label: "Grams (g)" },
    { id: "kg", label: "Kilograms (kg)" },
    { id: "oz", label: "Ounces (oz)" },
    { id: "lb", label: "Pounds (lb)" },
    { id: "st", label: "Stone (st)" },
  ],
  temperature: [
    { id: "c", label: "Celsius (°C)" },
    { id: "f", label: "Fahrenheit (°F)" },
    { id: "k", label: "Kelvin (K)" },
  ],
  volume: [
    { id: "ml", label: "Milliliters (mL)" },
    { id: "l", label: "Liters (L)" },
    { id: "gal", label: "US Gallons (gal)" },
    { id: "qt", label: "US Quarts (qt)" },
    { id: "pt", label: "US Pints (pt)" },
    { id: "cup", label: "US Cups (cup)" },
    { id: "flOz", label: "US Fluid Ounces (fl oz)" },
  ],
};

// Base units for linear conversion: length -> meters, weight -> grams,
// volume -> milliliters. Temperature requires its own formula (handled
// separately) since it is not a simple multiplicative conversion.
const LENGTH_TO_METERS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

const WEIGHT_TO_GRAMS: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  oz: 28.349523125,
  lb: 453.59237,
  st: 6350.29318,
};

const VOLUME_TO_ML: Record<string, number> = {
  ml: 1,
  l: 1000,
  gal: 3785.411784,
  qt: 946.352946,
  pt: 473.176473,
  cup: 236.5882365,
  flOz: 29.5735295625,
};

function convertLinear(value: number, from: string, to: string, table: Record<string, number>): number {
  const base = value * table[from];
  return base / table[to];
}

function celsiusToUnit(celsius: number, unit: string): number {
  if (unit === "c") return celsius;
  if (unit === "f") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

function unitToCelsius(value: number, unit: string): number {
  if (unit === "c") return value;
  if (unit === "f") return ((value - 32) * 5) / 9;
  return value - 273.15;
}

export function convertUnit(
  value: number,
  category: UnitCategory,
  from: string,
  to: string,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Enter a valid number.");
  }

  switch (category) {
    case "length":
      return convertLinear(value, from, to, LENGTH_TO_METERS);
    case "weight":
      return convertLinear(value, from, to, WEIGHT_TO_GRAMS);
    case "volume":
      return convertLinear(value, from, to, VOLUME_TO_ML);
    case "temperature":
      return celsiusToUnit(unitToCelsius(value, from), to);
    default:
      throw new Error("Unknown category.");
  }
}
