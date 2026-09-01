"use client";

import { useState } from "react";
import TriangleView from "./TriangleView";
import UnitCircleView from "./UnitCircleView";

export default function TrigRatioSimulator() {
  const [angle, setAngle] = useState(45);
  const [mode, setMode] = useState<"triangle" | "circle">("triangle");

  const sin = Math.sin((angle * Math.PI) / 180).toFixed(3);
  const cos = Math.cos((angle * Math.PI) / 180).toFixed(3);
  const tan = angle === 90 ? "undefined" : Math.tan((angle * Math.PI) / 180).toFixed(3);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex gap-2 bg-slate-200 p-1 rounded-lg">
        <button
          onClick={() => setMode("triangle")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            mode === "triangle" ? "bg-white shadow text-slate-900" : "text-slate-500"
          }`}
        >
          Triangle View
        </button>
        <button
          onClick={() => setMode("circle")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            mode === "circle" ? "bg-white shadow text-slate-900" : "text-slate-500"
          }`}
        >
          Unit Circle View
        </button>
      </div>

      {mode === "triangle" ? (
        <TriangleView angle={angle} onAngleChange={setAngle} />
      ) : (
        <UnitCircleView angle={angle} onAngleChange={setAngle} />
      )}

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-slate-500">sin θ</p>
          <p className="text-xl font-bold text-green-600">{sin}</p>
          <p className="text-xs text-slate-400">Opp/Hyp</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-slate-500">cos θ</p>
          <p className="text-xl font-bold text-blue-600">{cos}</p>
          <p className="text-xs text-slate-400">Adj/Hyp</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-slate-500">tan θ</p>
          <p className="text-xl font-bold text-red-600">{tan}</p>
          <p className="text-xs text-slate-400">Opp/Adj</p>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Lal point ko drag karke angle badlo — dono views me same angle sync rehta hai
      </p>
    </div>
  );
}