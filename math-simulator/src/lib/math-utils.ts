export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function calculateTriangleSides(hypotenuse: number, angleDeg: number) {
  const angleRad = degToRad(angleDeg);
  const opposite = hypotenuse * Math.sin(angleRad);
  const adjacent = hypotenuse * Math.cos(angleRad);
  return { opposite, adjacent };
}

export function getAngleFromPoint(cx: number, cy: number, x: number, y: number): number {
  const dx = x - cx;
  const dy = cy - y;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle < 0) angle = 0;
  if (angle > 90) angle = 90;
  return angle;
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}