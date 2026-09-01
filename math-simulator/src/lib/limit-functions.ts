export type LimitFunctionConfig = {
  id: string;
  label: string;
  formula: string;
  evaluate: (x: number) => number | null;
  targetX: number;
  leftLimitLabel: string;
  rightLimitLabel: string;
  isContinuous: boolean;
  closedCircle: { x: number; y: number } | null;
  openCircles: { x: number; y: number }[];
};

export const limitFunctions: LimitFunctionConfig[] = [
  {
    id: "continuous",
    label: "Continuous",
    formula: "f(x) = 0.35x² − 1",
    evaluate: (x) => 0.35 * x * x - 1,
    targetX: 1,
    leftLimitLabel: "-0.65",
    rightLimitLabel: "-0.65",
    isContinuous: true,
    closedCircle: { x: 1, y: 0.35 * 1 * 1 - 1 },
    openCircles: [],
  },
  {
    id: "removable",
    label: "Removable Discontinuity",
    formula: "f(x) = (x²−4)/(x−2)",
    evaluate: (x) => (Math.abs(x - 2) < 0.03 ? null : x + 2),
    targetX: 2,
    leftLimitLabel: "4",
    rightLimitLabel: "4",
    isContinuous: false,
    closedCircle: null,
    openCircles: [{ x: 2, y: 4 }],
  },
  {
    id: "jump",
    label: "Jump Discontinuity",
    formula: "f(x) = 0.5x−0.5 (x<1), 0.5x+1.5 (x≥1)",
    evaluate: (x) => (x < 1 ? 0.5 * x - 0.5 : 0.5 * x + 1.5),
    targetX: 1,
    leftLimitLabel: "0",
    rightLimitLabel: "2",
    isContinuous: false,
    closedCircle: { x: 1, y: 2 },
    openCircles: [{ x: 1, y: 0 }],
  },
  {
    id: "infinite",
    label: "Infinite Discontinuity",
    formula: "f(x) = 1/(x−1)",
    evaluate: (x) => (Math.abs(x - 1) < 0.03 ? null : 1 / (x - 1)),
    targetX: 1,
    leftLimitLabel: "-∞",
    rightLimitLabel: "+∞",
    isContinuous: false,
    closedCircle: null,
    openCircles: [],
  },
];