"use client";

import { useState } from "react";
import { degToRad, getAngleFromPoint } from "@/lib/math-utils";

const RADIUS = 120;
const CENTER = { x: 150, y: 280 };

interface Props {
  angle: number;
  onAngleChange: (angle: number) => void;
}

export default function UnitCircleView({ angle, onAngleChange }: Props) {
  const [dragging, setDragging] = useState(false);

  const rad = degToRad(angle);
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const point = {
    x: CENTER.x + RADIUS * cos,
    y: CENTER.y - RADIUS * sin,
  };

  const updateFromPointer = (svg: SVGSVGElement, clientX: number, clientY: number) => {
    const rect = svg.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    onAngleChange(Math.round(getAngleFromPoint(CENTER.x, CENTER.y, x, y)));
  };

  return (
    <svg
      width="450"
      height="400"
      viewBox="0 0 450 400"
      onMouseMove={(e) => dragging && updateFromPointer(e.currentTarget, e.clientX, e.clientY)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => {
        if (!dragging) return;
        const t = e.touches[0];
        updateFromPointer(e.currentTarget, t.clientX, t.clientY);
      }}
      onTouchEnd={() => setDragging(false)}
      className="bg-slate-50 rounded-lg border select-none touch-none"
    >
      <line x1={CENTER.x - 30} y1={CENTER.y} x2={CENTER.x + RADIUS + 40} y2={CENTER.y} stroke="#94a3b8" strokeWidth={1.5} />
      <line x1={CENTER.x} y1={CENTER.y + 30} x2={CENTER.x} y2={CENTER.y - RADIUS - 40} stroke="#94a3b8" strokeWidth={1.5} />

      <circle cx={CENTER.x} cy={CENTER.y} r={RADIUS} fill="none" stroke="#cbd5e1" strokeWidth={2} />

      <line x1={CENTER.x} y1={CENTER.y} x2={point.x} y2={point.y} stroke="#dc2626" strokeWidth={3} />
      <line x1={CENTER.x} y1={CENTER.y} x2={point.x} y2={CENTER.y} stroke="#2563eb" strokeWidth={3} />
      <line x1={point.x} y1={CENTER.y} x2={point.x} y2={point.y} stroke="#16a34a" strokeWidth={3} strokeDasharray="5,4" />

      <circle
        cx={point.x} cy={point.y} r={12}
        fill="#dc2626"
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        className="cursor-grab active:cursor-grabbing"
      />

      <text x={CENTER.x + RADIUS / 2 - 20} y={CENTER.y + 20} fill="#2563eb" fontSize={14}>
        cos θ = {cos.toFixed(3)}
      </text>
      <text x={point.x + 10} y={(CENTER.y + point.y) / 2} fill="#16a34a" fontSize={14}>
        sin θ = {sin.toFixed(3)}
      </text>
      <text x={CENTER.x + 20} y={CENTER.y - 15} fill="#334155" fontSize={16} fontWeight="bold">
        θ = {angle}°
      </text>
      <text x={CENTER.x - 15} y={CENTER.y + 45} fill="#64748b" fontSize={12}>
        r = 1 (unit)
      </text>
    </svg>
  );
}