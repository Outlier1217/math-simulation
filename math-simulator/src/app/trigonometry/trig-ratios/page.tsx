import TrigRatioSimulator from "@/components/simulations/trigonometry/TrigRatioSimulator";

export default function TrigRatiosPage() {
  return (
    <main className="min-h-screen py-10">
      <h1 className="text-2xl font-bold text-center mb-2">Trigonometric Ratios</h1>
      <p className="text-center text-slate-500 mb-6">
        Angle ko drag karke dekho ki sides aur ratios kaise change hote hain
      </p>
      <TrigRatioSimulator />
    </main>
  );
}