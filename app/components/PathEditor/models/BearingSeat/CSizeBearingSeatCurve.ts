import { CubicBezierCurve, Vector2 as ThreeVector2 } from "three";

import { Vector2 } from "../../../../math/vector2";
import { YoyoCurve } from "../YoyoCurve";

const CSzieBearingSeatPath = [new ThreeVector2(0, -4)]
  .concat(
    new ThreeVector2(2, -4),
    new ThreeVector2(2, 4),
    new CubicBezierCurve(
      new ThreeVector2(2.5, 4),
      new ThreeVector2(3.15, 4),
      new ThreeVector2(3.15, 4),
      new ThreeVector2(3.15, 3.5)
    ).getPoints(8),
    new ThreeVector2(3.15, 2),
    new CubicBezierCurve(
      new ThreeVector2(3.85, 2),
      new ThreeVector2(4.15, 2),
      new ThreeVector2(4.15, 2),
      new ThreeVector2(4.15, 1.7)
    ).getPoints(8),
    new ThreeVector2(4.15, 0.59),
    new ThreeVector2(6.45, 0.59),
    new CubicBezierCurve(
      new ThreeVector2(6.45, 2.14 - 0.2),
      new ThreeVector2(6.45, 2.14),
      new ThreeVector2(6.45, 2.14),
      new ThreeVector2(6.45 - 0.2, 2.14)
    ).getPoints(8),
    new CubicBezierCurve(
      new ThreeVector2(7.1 - 0.2, 2.14),
      new ThreeVector2(7.1, 2.14),
      new ThreeVector2(7.1, 2.14),
      new ThreeVector2(7.1, 2.14 - 0.2)
    ).getPoints(8),
    new ThreeVector2(7.1, 0.885),
    new ThreeVector2(9.55, 0.885),
    new CubicBezierCurve(
      new ThreeVector2(9.55, 2.085 - 0.3),
      new ThreeVector2(9.55, 2.085),
      new ThreeVector2(9.55, 2.085),
      new ThreeVector2(9.55 - 0.3, 2.085)
    ).getPoints(8),
    new ThreeVector2(10.55, 2.085)
  )
  .map((point) => new Vector2(-point.y + 2.085 + 4.76 / 2, point.x));

export class CSizeBearingSeatCurve implements YoyoCurve {
  index: number = 0;
  type: string = "CSizeBearingSeatCurve";
  curve: Vector2[] = CSzieBearingSeatPath ?? [];

  id: string;
  constructor() {
    this.id = `YoyoCubicBezierCurve_${Date.now()}`;
  }
  getPath(): Vector2[] {
    return this.curve;
  }
  getFirstPoint(): Vector2 {
    const firstPoint = this.curve[0];
    if (firstPoint === undefined) {
      throw new Error("CSizeBearingSeatCurveの最初の点が取得できませんでした");
    }
    return firstPoint;
  }
  getLastPoint(): Vector2 {
    const [lastPoint] = this.curve.slice(-1);
    if (lastPoint === undefined) {
      throw new Error("CSizeBearingSeatCurveの最後の点が取得できませんでした");
    }
    return lastPoint;
  }
  updateFirstPoint(v: Vector2): void {
    if (this.getFirstPoint().equals(v)) return;
    throw new Error("CSizeBearingSeatCurveの最初の点は変更できません");
  }
  updateLastPoint(v: Vector2): void {
    if (this.getLastPoint().equals(v)) return;
    throw new Error("CSizeBearingSeatCurveの最後の点は変更できません");
  }
  setIndex(index: number): void {
    this.index = index;
  }
}
