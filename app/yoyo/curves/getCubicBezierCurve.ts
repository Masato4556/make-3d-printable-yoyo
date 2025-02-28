import { Vector2 } from "~/math/Vector2";

export function getCubicBezierCurve(
  p0: Vector2,
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
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

    const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x;
    const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y;

    points.push(new Vector2(x, y));
  }

  return points;
}
