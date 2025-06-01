import { Vector2 } from "../../../math/vector2";

export function getCubicBezierCurve(
  { v0, v1, v2, v3 }: CubicBezierCurveHandle,
  numPoints: number
): Vector2[] {
  if (numPoints < 2) {
    throw new Error("numPoints must be greater than 2");
  }

  const points: Vector2[] = [];

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    const x = mt3 * v0.x + 3 * mt2 * t * v1.x + 3 * mt * t2 * v2.x + t3 * v3.x;
    const y = mt3 * v0.y + 3 * mt2 * t * v1.y + 3 * mt * t2 * v2.y + t3 * v3.y;

    points.push(new Vector2(x, y));
  }

  return points;
}

interface CubicBezierCurveHandle {
  v0: Vector2;
  v1: Vector2;
  v2: Vector2;
  v3: Vector2;
}
