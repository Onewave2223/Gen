"use client";

import React from "react";
import type { CellSpec, Question, ShapeSpec, VisualSpec } from "@/lib/iq-test/types";

interface Props {
  question: Question;
}

// ── Shared drawing primitives ────────────────────────────────────────────────
// Every visual question is described declaratively via `question.visual`
// (see lib/iq-test/types.ts). This generic renderer draws whatever shape
// data it is given — it never hand-encodes a specific question's answer,
// so the drawing and the answer key can never drift out of sync as the
// question bank grows.

const FILL = "var(--foreground)";
const STROKE = "var(--foreground)";
const BG = "var(--surface)";
const HOLLOW = "none";

function halfFillId(prefix: string, key: string) {
  return `half-${prefix}-${key}`.replace(/[^a-zA-Z0-9-]/g, "");
}

function Shape({ spec, cx, cy, box, idKey }: { spec: ShapeSpec; cx: number; cy: number; box: number; idKey: string }) {
  const size = box * (spec.size ?? 1);
  const r = size / 2;
  const rotate = spec.rotate ?? 0;
  const half = !!spec.half;
  const filled = !!spec.filled;
  const gradId = halfFillId(idKey, spec.shape);

  const halfDefs = half ? (
    <defs>
      <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor={FILL} />
        <stop offset="50%" stopColor={HOLLOW} stopOpacity="0" />
      </linearGradient>
    </defs>
  ) : null;

  const fillValue = half ? `url(#${gradId})` : filled ? FILL : HOLLOW;

  let node: React.ReactNode;
  switch (spec.shape) {
    case "circle":
      node = <circle cx={cx} cy={cy} r={r} fill={fillValue} stroke={STROKE} strokeWidth={2} />;
      break;
    case "square": {
      const x = cx - r;
      const y = cy - r;
      node = (
        <rect
          x={x} y={y} width={size} height={size}
          fill={fillValue} stroke={STROKE} strokeWidth={2}
          transform={rotate ? `rotate(${rotate},${cx},${cy})` : undefined}
        />
      );
      break;
    }
    case "diamond": {
      const pts = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
      node = (
        <polygon
          points={pts}
          fill={fillValue} stroke={STROKE} strokeWidth={2}
          transform={rotate ? `rotate(${rotate},${cx},${cy})` : undefined}
        />
      );
      break;
    }
    case "triangle": {
      const h = r * Math.sqrt(3);
      const pts = `${cx},${cy - h * 2 / 3} ${cx - r},${cy + h / 3} ${cx + r},${cy + h / 3}`;
      node = (
        <polygon
          points={pts}
          fill={fillValue} stroke={STROKE} strokeWidth={2}
          transform={rotate ? `rotate(${rotate},${cx},${cy})` : undefined}
        />
      );
      break;
    }
    case "pentagon": {
      const pts = Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(" ");
      node = (
        <polygon
          points={pts}
          fill={fillValue} stroke={STROKE} strokeWidth={2}
          transform={rotate ? `rotate(${rotate},${cx},${cy})` : undefined}
        />
      );
      break;
    }
    default:
      node = null;
  }

  const count = Math.min(4, Math.max(1, spec.count ?? 1));
  if (count === 1) {
    return <>{halfDefs}{node}</>;
  }

  // Render multiple small copies spaced horizontally within the cell.
  const miniR = r * 0.55;
  const spacing = miniR * 2.1;
  const offsets =
    count === 2 ? [-spacing / 2, spacing / 2] :
    count === 3 ? [-spacing, 0, spacing] :
    [-spacing * 1.5, -spacing / 2, spacing / 2, spacing * 1.5];

  return (
    <>
      {halfDefs}
      {offsets.map((dx, i) => (
        <Shape key={i} spec={{ ...spec, count: 1, size: (spec.size ?? 1) * 0.55 }} cx={cx + dx} cy={cy} box={box} idKey={`${idKey}-${i}`} />
      ))}
    </>
  );
}

function QuestionMark({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  return (
    <g>
      <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size}
        fill="var(--primary)" opacity={0.12} stroke="var(--primary)" strokeWidth={1.5} rx={4} />
      <text x={cx} y={cy + size * 0.18} textAnchor="middle" fontSize={size * 0.5}
        fill="var(--primary)" fontWeight="700">?</text>
    </g>
  );
}

function isBlank(cell: CellSpec): boolean {
  return cell === null || (typeof cell === "object" && "blank" in cell && cell.blank === true);
}

// ── Sequence renderer (1 row of frames) ─────────────────────────────────────
function SequenceRenderer({ cells }: { cells: CellSpec[] }) {
  const n = cells.length;
  const cellW = 60;
  const W = cellW * n;
  const H = 90;
  const cy = H / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="Visual sequence puzzle">
      {cells.map((cell, i) => {
        const cx = cellW * i + cellW / 2;
        const blank = isBlank(cell);
        return (
          <g key={i}>
            <rect x={cellW * i + 3} y={5} width={cellW - 6} height={H - 10}
              fill={BG} stroke={STROKE} strokeWidth={1} opacity={0.35} rx={4} />
            {blank ? (
              <QuestionMark cx={cx} cy={cy} size={34} />
            ) : (
              <Shape spec={cell as ShapeSpec} cx={cx} cy={cy} box={40} idKey={`seq-${i}`} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Matrix renderer (3x3 grid) ──────────────────────────────────────────────
function MatrixRenderer({ rows }: { rows: CellSpec[][] }) {
  const cellSize = 84;
  const numRows = rows.length;
  const numCols = rows[0]?.length ?? 3;
  const W = cellSize * numCols;
  const H = cellSize * numRows;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[320px]" role="img" aria-label="Visual matrix puzzle">
      {rows.map((row, ri) =>
        row.map((cell, ci) => {
          const x = ci * cellSize;
          const y = ri * cellSize;
          const cx = x + cellSize / 2;
          const cy = y + cellSize / 2;
          const blank = isBlank(cell);
          return (
            <g key={`${ri}-${ci}`}>
              <rect x={x + 2} y={y + 2} width={cellSize - 4} height={cellSize - 4}
                fill={BG} stroke={STROKE} strokeWidth={1} opacity={0.35} />
              {blank ? (
                <QuestionMark cx={cx} cy={cy} size={cellSize * 0.42} />
              ) : (
                <Shape spec={cell as ShapeSpec} cx={cx} cy={cy} box={cellSize * 0.55} idKey={`mtx-${ri}-${ci}`} />
              )}
            </g>
          );
        }),
      )}
    </svg>
  );
}

// ── Arrow rotation renderer ──────────────────────────────────────────────────
function ArrowRotationRenderer({ steps }: { steps: (number | "blank")[] }) {
  const n = steps.length;
  const cellW = 62;
  const W = cellW * n;
  const H = 70;
  const cy = H / 2;
  const r = 20;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="Arrow rotation sequence">
      {steps.map((step, i) => {
        const cx = cellW * i + cellW / 2;
        const blank = step === "blank";
        return (
          <g key={i}>
            <rect x={cellW * i + 4} y={4} width={cellW - 8} height={H - 8}
              fill={BG} stroke={STROKE} strokeWidth={1} opacity={0.35} rx={4} />
            {blank ? (
              <QuestionMark cx={cx} cy={cy} size={36} />
            ) : (
              <g transform={`translate(${cx},${cy}) rotate(${step})`}>
                <line x1={-r + 4} y1={0} x2={r - 8} y2={0} stroke={STROKE} strokeWidth={2.5} strokeLinecap="round" />
                <polygon points={`${r - 4},0 ${r - 14},-6 ${r - 14},6`} fill={STROKE} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Hand-illustrated diagrams for genuinely unique spatial questions ────────
function PaperFold2x() {
  return (
    <svg viewBox="0 0 300 130" className="mx-auto w-full max-w-xs" role="img" aria-label="Paper folded twice with a punched hole">
      <g transform="translate(10,10)">
        <rect width={80} height={80} fill={BG} stroke={STROKE} strokeWidth={2} />
        <line x1={40} y1={0} x2={40} y2={80} stroke="var(--primary)" strokeWidth={1} strokeDasharray="4,3" opacity={0.5} />
        <line x1={0} y1={40} x2={80} y2={40} stroke="var(--primary)" strokeWidth={1} strokeDasharray="4,3" opacity={0.5} />
        <text x={40} y={94} textAnchor="middle" fontSize={10} fill="var(--muted)">Original</text>
      </g>
      <text x={100} y={55} fontSize={18} fill="var(--muted)" textAnchor="middle">→</text>
      <g transform="translate(115,25)">
        <rect width={40} height={40} fill="var(--surface-hover)" stroke={STROKE} strokeWidth={2} />
        <circle cx={32} cy={8} r={5} fill="var(--primary)" opacity={0.75} />
        <text x={20} y={54} textAnchor="middle" fontSize={10} fill="var(--muted)">Folded + hole</text>
      </g>
      <text x={175} y={55} fontSize={18} fill="var(--muted)" textAnchor="middle">→</text>
      <g transform="translate(195,10)">
        <rect width={80} height={80} fill={BG} stroke={STROKE} strokeWidth={2} />
        <QuestionMark cx={40} cy={40} size={30} />
        <text x={40} y={94} textAnchor="middle" fontSize={10} fill="var(--muted)">Unfolded = ?</text>
      </g>
    </svg>
  );
}

function CubeNetCross() {
  const s = 32;
  const faces = [
    { x: s, y: 0, label: "1" },
    { x: s, y: s, label: "2" },
    { x: 0, y: s, label: "3" },
    { x: s, y: s * 2, label: "4" },
    { x: s * 2, y: s, label: "5" },
    { x: s, y: s * 3, label: "6" },
  ];
  return (
    <svg viewBox="0 0 130 140" className="mx-auto w-full max-w-[180px]" role="img" aria-label="Cross-shaped cube net with numbered faces">
      {faces.map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={f.y} width={s} height={s} fill={BG} stroke={STROKE} strokeWidth={1.5} />
          <text x={f.x + s / 2} y={f.y + s / 2 + 5} textAnchor="middle" fontSize={14} fill="var(--foreground)" fontWeight="600">{f.label}</text>
        </g>
      ))}
    </svg>
  );
}

function StandardDie() {
  return (
    <svg viewBox="0 0 200 140" className="mx-auto w-full max-w-[220px]" role="img" aria-label="Isometric die showing face 2 in front and 3 on top">
      <g transform="translate(40,10)">
        <polygon points="60,0 110,25 60,50 10,25" fill="var(--surface-hover)" stroke={STROKE} strokeWidth={1.5} />
        <text x={60} y={30} textAnchor="middle" fontSize={16} fontWeight="700" fill="var(--foreground)">3</text>
        <polygon points="10,25 60,50 60,100 10,75" fill={BG} stroke={STROKE} strokeWidth={1.5} />
        <text x={32} y={68} textAnchor="middle" fontSize={16} fontWeight="700" fill="var(--foreground)">2</text>
        <polygon points="60,50 110,25 110,75 60,100" fill="var(--surface)" stroke={STROKE} strokeWidth={1.5} />
        <text x={88} y={68} textAnchor="middle" fontSize={16} fontWeight="700" fill="var(--foreground)">?</text>
      </g>
    </svg>
  );
}

function MirrorF() {
  return (
    <svg viewBox="0 0 220 100" className="mx-auto w-full max-w-[220px]" role="img" aria-label="Letter F reflected through a pane of glass">
      <g transform="translate(20,15)">
        <rect width={70} height={70} fill={BG} stroke={STROKE} strokeWidth={1.5} opacity={0.5} />
        <text x={35} y={52} textAnchor="middle" fontSize={40} fontWeight="700" fill="var(--foreground)">F</text>
      </g>
      <line x1={110} y1={5} x2={110} y2={95} stroke="var(--primary)" strokeWidth={2} strokeDasharray="4,3" />
      <text x={110} y={100} textAnchor="middle" fontSize={9} fill="var(--muted)">glass</text>
      <g transform="translate(130,15)">
        <rect width={70} height={70} fill={BG} stroke={STROKE} strokeWidth={1.5} opacity={0.5} />
        <QuestionMark cx={35} cy={35} size={30} />
      </g>
    </svg>
  );
}

function LShapeRotation() {
  const s = 26;
  function LShape({ x, y, rotate }: { x: number; y: number; rotate: number }) {
    return (
      <g transform={`translate(${x},${y}) rotate(${rotate},${s},${s})`}>
        <rect x={0} y={s} width={s} height={s} fill="var(--surface-hover)" stroke={STROKE} strokeWidth={2} />
        <rect x={s} y={s} width={s} height={s} fill="var(--surface-hover)" stroke={STROKE} strokeWidth={2} />
        <rect x={0} y={0} width={s} height={s} fill="var(--surface-hover)" stroke={STROKE} strokeWidth={2} />
      </g>
    );
  }
  return (
    <svg viewBox="0 0 260 90" className="mx-auto w-full max-w-xs" role="img" aria-label="L-shaped tile rotation problem">
      <LShape x={20} y={5} rotate={0} />
      <text x={125} y={50} textAnchor="middle" fontSize={16} fill="var(--muted)">90° × 3 →</text>
      <QuestionMark cx={210} cy={45} size={46} />
    </svg>
  );
}

function TetrahedronNet() {
  return (
    <svg viewBox="0 0 120 110" className="mx-auto w-full max-w-[160px]" role="img" aria-label="Large triangle divided into 4 smaller triangles">
      <polygon points="60,5 115,100 5,100" fill="none" stroke={STROKE} strokeWidth={2} />
      <line x1={60} y1={5} x2={60} y2={100} stroke={STROKE} strokeWidth={1} opacity={0.4} />
      <line x1={32.5} y1={52.5} x2={87.5} y2={52.5} stroke={STROKE} strokeWidth={1} opacity={0.4} />
      <line x1={5} y1={100} x2={87.5} y2={52.5} stroke={STROKE} strokeWidth={1} opacity={0.4} />
      <line x1={115} y1={100} x2={32.5} y2={52.5} stroke={STROKE} strokeWidth={1} opacity={0.4} />
    </svg>
  );
}

const CUSTOM_RENDERERS: Record<string, React.ComponentType> = {
  paperFold2x: PaperFold2x,
  cubeNetCross: CubeNetCross,
  standardDie: StandardDie,
  mirrorF: MirrorF,
  lShapeRotation: LShapeRotation,
  tetrahedronNet: TetrahedronNet,
};

export function VisualPuzzle({ question }: Props) {
  const visual: VisualSpec | undefined = question.visual;
  if (!visual) return null;

  switch (visual.kind) {
    case "sequence":
      return <SequenceRenderer cells={visual.cells} />;
    case "matrix":
      return <MatrixRenderer rows={visual.rows} />;
    case "arrowRotation":
      return <ArrowRotationRenderer steps={visual.steps} />;
    case "custom": {
      const Renderer = CUSTOM_RENDERERS[visual.id];
      return Renderer ? <Renderer /> : null;
    }
    default:
      return null;
  }
}

VisualPuzzle.displayName = "VisualPuzzle";
