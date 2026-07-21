"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

const COLORS = [
  "#6366f1","#8b5cf6","#ec4899","#f43f5e","#f97316",
  "#eab308","#22c55e","#14b8a6","#3b82f6","#06b6d4",
];

function drawWheel(
  canvas: HTMLCanvasElement,
  items: string[],
  rotation: number,
  winnerIndex: number | null,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const size = canvas.width;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  const arc = (2 * Math.PI) / items.length;

  ctx.clearRect(0, 0, size, size);

  items.forEach((item, i) => {
    const startAngle = rotation + i * arc;
    const endAngle = startAngle + arc;
    const color = COLORS[i % COLORS.length];
    const isWinner = winnerIndex === i;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = isWinner ? "#ffffff" : color;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = isWinner ? color : "#fff";
    ctx.font = `bold ${Math.max(10, Math.min(14, 200 / items.length))}px sans-serif`;
    const maxLen = 14;
    const label =
      item.length > maxLen ? item.slice(0, maxLen - 1) + "…" : item;
    ctx.fillText(label, r - 10, 5);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 2;
  ctx.stroke();

  const pSize = 14;
  ctx.beginPath();
  ctx.moveTo(size - 2, cy);
  ctx.lineTo(size - 2 - pSize, cy - pSize / 2);
  ctx.lineTo(size - 2 - pSize, cy + pSize / 2);
  ctx.closePath();
  ctx.fillStyle = "#1f2937";
  ctx.fill();
}

export function WheelSpinner() {
  const inputId = React.useId();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rafRef = React.useRef<number>(0);

  const [optionsText, setOptionsText] = React.useState(
    "Option 1\nOption 2\nOption 3\nOption 4\nOption 5",
  );
  const [spinning, setSpinning] = React.useState(false);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [winnerIndex, setWinnerIndex] = React.useState<number | null>(null);
  const [rotation, setRotation] = React.useState(0);
  const [items, setItems] = React.useState<string[]>([
    "Option 1","Option 2","Option 3","Option 4","Option 5",
  ]);

  const rotationRef = React.useRef(rotation);
  rotationRef.current = rotation;

  const canvasSize = 300;

  const redraw = React.useCallback(
    (rot: number, wi: number | null, currentItems: string[]) => {
      if (canvasRef.current && currentItems.length > 0) {
        drawWheel(canvasRef.current, currentItems, rot, wi);
      }
    },
    [],
  );

  React.useEffect(() => {
    redraw(rotation, winnerIndex, items);
  }, [items, rotation, winnerIndex, redraw]);

  const handleApply = () => {
    const parsed = optionsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parsed.length < 2) return;
    setItems(parsed);
    setWinner(null);
    setWinnerIndex(null);
    setRotation(0);
  };

  const handleSpin = () => {
    if (spinning || items.length < 2) return;
    setWinner(null);
    setWinnerIndex(null);
    setSpinning(true);

    const extraSpins = 5 + Math.random() * 5;
    const extraAngle = Math.random() * 2 * Math.PI;
    const totalRotation = extraSpins * 2 * Math.PI + extraAngle;
    const duration = 3000;
    const start = performance.now();
    const startRot = rotationRef.current;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const newRot = startRot + totalRotation * easeOut(t);
      rotationRef.current = newRot;
      setRotation(newRot);
      redraw(newRot, null, items);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const arc = (2 * Math.PI) / items.length;
        const normalizedRot = ((newRot % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const pointerAngle = (2 * Math.PI - normalizedRot) % (2 * Math.PI);
        const wi = Math.floor(pointerAngle / arc) % items.length;
        setWinnerIndex(wi);
        setWinner(items[wi]);
        redraw(newRot, wi, items);
        setSpinning(false);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  const handleRemoveWinner = () => {
    if (winner === null) return;
    const newItems = items.filter((_, i) => i !== winnerIndex);
    setItems(newItems);
    setOptText(newItems);
    setWinner(null);
    setWinnerIndex(null);
    setRotation(0);
  };

  const setOptText = (it: string[]) => {
    setOptionsText(it.join("\n"));
  };

  const parsedCount = optionsText.split("\n").filter((s) => s.trim()).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
          Options (one per line)
        </label>
        <textarea
          id={inputId}
          value={optionsText}
          onChange={(e) => setOptionsText(e.target.value)}
          rows={5}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-none"
        />
        <Button type="button" variant="secondary" size="sm" onClick={handleApply} className="self-start">
          Apply ({parsedCount} options)
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="max-w-full"
          aria-label="Wheel spinner"
        />

        <Button
          type="button"
          onClick={handleSpin}
          disabled={spinning || items.length < 2}
          size="lg"
        >
          {spinning ? "Spinning…" : "Spin"}
        </Button>
      </div>

      {winner && (
        <div
          aria-live="polite"
          className="flex flex-col items-center gap-3 rounded-[var(--radius)] border border-[var(--primary)] bg-[var(--surface)] p-5 text-center"
        >
          <span className="text-sm font-medium text-[var(--muted)]">Winner</span>
          <span className="text-2xl font-bold text-[var(--foreground)]">{winner}</span>
          <Button type="button" variant="secondary" size="sm" onClick={handleRemoveWinner}>
            Remove &amp; Spin Again
          </Button>
        </div>
      )}
    </div>
  );
}

WheelSpinner.displayName = "WheelSpinner";
