"use client";

import { useState } from "react";
import { calculateTriangleSides, getAngleFromPoint } from "@/lib/math-utils";

const HYPOTENUSE = 250;
const ORIGIN = { x: 100, y: 350 };

interface Props {
  angle: number;
  onAngleChange: (angle: number) => void;
}

export default function TriangleView({ angle, onAngleChange }: Props) {
  const [dragging, setDragging] = useState(false);
  const { opposite, adjacent } = calculateTriangleSides(HYPOTENUSE, angle);

  const topPoint = { x: ORIGIN.x + adjacent, y: ORIGIN.y - opposite };
  const rightAnglePoint = { x: ORIGIN.x + adjacent, y: ORIGIN.y };

  const updateFromPointer = (svg: SVGSVGElement, clientX: number, clientY: number) => {
    const rect = svg.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    onAngleChange(Math.round(getAngleFromPoint(ORIGIN.x, ORIGIN.y, x, y)));
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
      <line x1={ORIGIN.x} y1={ORIGIN.y} x2={rightAnglePoint.x} y2={rightAnglePoint.y} stroke="#2563eb" strokeWidth={3} />
      <line x1={rightAnglePoint.x} y1={rightAnglePoint.y} x2={topPoint.x} y2={topPoint.y} stroke="#16a34a" strokeWidth={3} />
      <line x1={ORIGIN.x} y1={ORIGIN.y} x2={topPoint.x} y2={topPoint.y} stroke="#dc2626" strokeWidth={3} />

      <rect x={rightAnglePoint.x - 15} y={rightAnglePoint.y - 15} width={15} height={15} fill="none" stroke="#334155" strokeWidth={1.5} />

      <circle
        cx={topPoint.x} cy={topPoint.y} r={12}
        fill="#dc2626"
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        className="cursor-grab active:cursor-grabbing"
      />

      <text x={(ORIGIN.x + rightAnglePoint.x) / 2} y={ORIGIN.y + 20} fill="#2563eb" fontSize={14}>
        Adjacent = {adjacent.toFixed(1)}
      </text>
      <text x={rightAnglePoint.x + 10} y={(rightAnglePoint.y + topPoint.y) / 2} fill="#16a34a" fontSize={14}>
        Opposite = {opposite.toFixed(1)}
      </text>
      <text x={(ORIGIN.x + topPoint.x) / 2 - 30} y={(ORIGIN.y + topPoint.y) / 2 - 10} fill="#dc2626" fontSize={14}>
        Hyp = {HYPOTENUSE}
      </text>
      <text x={ORIGIN.x + 25} y={ORIGIN.y - 10} fill="#334155" fontSize={16} fontWeight="bold">
        θ = {angle}°
      </text>
    </svg>
  );
}