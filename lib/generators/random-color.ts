export type RGBColor = {
  r: number;
  g: number;
  b: number;
};

export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type RandomColor = {
  hex: string;
  rgb: RGBColor;
  hsl: HSLColor;
};

function randomByte(): number {
  return Math.floor(Math.random() * 256);
}

function toHexByte(value: number): string {
  return value.toString(16).padStart(2, "0").toUpperCase();
}

export function rgbToHex(rgb: RGBColor): string {
  return `#${toHexByte(rgb.r)}${toHexByte(rgb.g)}${toHexByte(rgb.b)}`;
}

export function rgbToHsl(rgb: RGBColor): HSLColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;

  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

export function formatRgb(rgb: RGBColor): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function formatHsl(hsl: HSLColor): string {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

export function generateRandomColor(): RandomColor {
  const rgb: RGBColor = {
    r: randomByte(),
    g: randomByte(),
    b: randomByte(),
  };

  return {
    hex: rgbToHex(rgb),
    rgb,
    hsl: rgbToHsl(rgb),
  };
}

export function formatColorResult(color: RandomColor): string {
  return `HEX: ${color.hex}\nRGB: ${formatRgb(color.rgb)}\nHSL: ${formatHsl(color.hsl)}`;
}
