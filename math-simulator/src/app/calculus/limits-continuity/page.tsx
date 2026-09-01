import LimitsSimulator from "@/components/simulations/calculus/LimitsSimulator";

export default function LimitsContinuityPage() {
  return (
    <main className="min-h-screen py-10">
      <h1 className="text-2xl font-bold text-center mb-2">Limits and Continuity</h1>
      <p className="text-center text-slate-500 mb-6">
        Function select karo aur point ko target x ke paas drag karke dekho limit kaise behave karta hai
      </p>
      <LimitsSimulator />
    </main>
  );
}