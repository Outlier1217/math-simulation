"use client";

import { useState, useMemo } from "react";
import { limitFunctions, LimitFunctionConfig } from "@/lib/limit-functions";
import { mapRange } from "@/lib/math-utils";

const X_MIN = -5, X_MAX = 5;
const Y_MIN = -5, Y_MAX = 5;
const PAD = 40;
const W = 450, H = 400;
const PLOT_W = W - PAD * 2;
const PLOT_H = H - PAD * 2;

function toSvgX(x: number) {
  return PAD + mapRange(x, X_MIN, X_MAX, 0, PLOT_W);
}
function toSvgY(y: number) {
  return PAD + PLOT_H - mapRange(y, Y_MIN, Y_MAX, 0, PLOT_H);
}

function buildSegments(fn: LimitFunctionConfig, samples = 400) {
  const segments: { x: number; y: number }[][] = [];
  let current: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = X_MIN + ((X_MAX - X_MIN) * i) / samples;
    const y = fn.evaluate(x);
    if (y === null || y < Y_MIN - 1 || y > Y_MAX + 1) {
      if (current.length > 1) segments.push(current);
      current = [];
      continue;
    }
    current.push({ x, y });
  }
  if (current.length > 1) segments.push(current);
  return segments;
}

export default function LimitsSimulator() {
  const [fnIndex, setFnIndex] = useState(0);
  const fn = limitFunctions[fnIndex];
  const [dragX, setDragX] = useState(fn.targetX - 2);
  const [dragging, setDragging] = useState(false);

  const segments = useMemo(() => buildSegments(fn), [fn]);
  const dragY = fn.evaluate(dragX);

  const handleDrag = (clientX: number, svg: SVGSVGElement) => {
    const rect = svg.getBoundingClientRect();
    const relX = clientX - rect.left;
    let x = mapRange(relX, PAD, PAD + PLOT_W, X_MIN, X_MAX);
    x = Math.max(X_MIN, Math.min(X_MAX, x));
    setDragX(Math.round(x * 100) / 100);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {limitFunctions.map((f, i) => (
          <button
            key={f.id}
            onClick={() => {
              setFnIndex(i);
              setDragX(f.targetX - 2);
            }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              i === fnIndex ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500 font-mono">{fn.formula}</p>

      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        onMouseMove={(e) => dragging && handleDrag(e.clientX, e.currentTarget)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchMove={(e) => dragging && handleDrag(e.touches[0].clientX, e.currentTarget)}
        onTouchEnd={() => setDragging(false)}
        className="bg-slate-50 rounded-lg border select-none touch-none"
      >
        <line x1={toSvgX(X_MIN)} y1={toSvgY(0)} x2={toSvgX(X_MAX)} y2={toSvgY(0)} stroke="#94a3b8" strokeWidth={1.5} />
        <line x1={toSvgX(0)} y1={toSvgY(Y_MIN)} x2={toSvgX(0)} y2={toSvgY(Y_MAX)} stroke="#94a3b8" strokeWidth={1.5} />

        <line
          x1={toSvgX(fn.targetX)} y1={PAD}
          x2={toSvgX(fn.targetX)} y2={H - PAD}
          stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4,4"
        />
        <text x={toSvgX(fn.targetX) + 5} y={PAD - 8} fill="#f59e0b" fontSize={13} fontWeight="bold">
          x = {fn.targetX}
        </text>

        {segments.map((seg, i) => (
          <polyline
            key={i}
            points={seg.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(" ")}
            fill="none"
            stroke="#2563eb"
            strokeWidth={2.5}
          />
        ))}

        {fn.closedCircle && (
          <circle cx={toSvgX(fn.closedCircle.x)} cy={toSvgY(fn.closedCircle.y)} r={6} fill="#16a34a" />
        )}

        {fn.openCircles.map((c, i) => (
          <circle key={i} cx={toSvgX(c.x)} cy={toSvgY(c.y)} r={6} fill="white" stroke="#dc2626" strokeWidth={2.5} />
        ))}

        {dragY !== null && dragY >= Y_MIN && dragY <= Y_MAX && (
          <circle
            cx={toSvgX(dragX)} cy={toSvgY(dragY)} r={9}
            fill="#7c3aed"
            onMouseDown={() => setDragging(true)}
            onTouchStart={() => setDragging(true)}
            className="cursor-grab active:cursor-grabbing"
          />
        )}
      </svg>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md text-center">
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-slate-500">Aap ka point</p>
          <p className="text-lg font-bold text-purple-600">
            x = {dragX.toFixed(2)}, f(x) = {dragY === null ? "undefined" : dragY.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-slate-500">Continuity</p>
          <p className={`text-lg font-bold ${fn.isContinuous ? "text-green-600" : "text-red-600"}`}>
            {fn.isContinuous ? "Continuous ✓" : "Discontinuous ✗"}
          </p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-slate-500">Left-hand limit (x→{fn.targetX}⁻)</p>
          <p className="text-lg font-bold text-blue-600">{fn.leftLimitLabel}</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-slate-500">Right-hand limit (x→{fn.targetX}⁺)</p>
          <p className="text-lg font-bold text-blue-600">{fn.rightLimitLabel}</p>
        </div>
      </div>

      <p className="text-sm text-slate-500 text-center max-w-md">
        Purple point ko drag karke x = {fn.targetX} ke paas le jao (left aur right dono taraf se) — dekho f(x) kis
        value ke paas pahunchta hai. Green filled circle = function us point pe defined hai. Red open circle =
        limit exist karta hai lekin function wahan defined nahi (ya value match nahi karti).
      </p>
    </div>
  );
}