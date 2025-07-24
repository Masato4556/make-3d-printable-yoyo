import { Vector2 } from "../../math/vector2";
import { getCubicBezierCurve } from "../../../functions/getCubicBezierCurve";
import { BEARING_SIZE } from "../bearing";

// TODO：ベジェカーブを作成する関数を用意できたので、そちらを用いるように変更する
const CSzieBearingSeatPath: Vector2[] = [
  new Vector2(4, 0),
  new Vector2(4, 2),
  new Vector2(-4, 2),
  ...getCubicBezierCurve(
    {
      v0: new Vector2(-4, 2.5),
      v1: new Vector2(-4, 3.15),
      v2: new Vector2(-4, 3.15),
      v3: new Vector2(-3.5, 3.15),
    },
    8
  ),
  new Vector2(-2, 3.15),
  ...getCubicBezierCurve(
    {
      v0: new Vector2(-2, 3.85),
      v1: new Vector2(-2, 4.15),
      v2: new Vector2(-2, 4.15),
      v3: new Vector2(-1.7, 4.15),
    },
    8
  ),
  new Vector2(-0.59, 4.15),
  new Vector2(-0.59, 6.45),
  ...getCubicBezierCurve(
    {
      v0: new Vector2(-1.94, 6.45),
      v1: new Vector2(-2.14, 6.45),
      v2: new Vector2(-2.14, 6.45),
      v3: new Vector2(-2.14, 6.25),
    },
    8
  ),
  ...getCubicBezierCurve(
    {
      v0: new Vector2(-2.14, 6.9),
      v1: new Vector2(-2.14, 7.1),
      v2: new Vector2(-2.14, 7.1),
      v3: new Vector2(-1.94, 7.1),
    },
    8
  ),
  new Vector2(-0.885, 7.1),
  new Vector2(-0.885, 9.55),
  ...getCubicBezierCurve(
    {
      v0: new Vector2(-1.785, 9.55),
      v1: new Vector2(-2.085, 9.55),
      v2: new Vector2(-2.085, 9.55),
      v3: new Vector2(-2.085, 9.25),
    },
    8
  ),
  new Vector2(-2.085, 10.55),
].map(
  (point) =>
    new Vector2(point.x + 2.085 + BEARING_SIZE.sizeC.width / 2, point.y)
);

/**
 * CSizeBearingSeatCurve
 * Cサイズのベアリングシートのパスを表現するクラスです。
 * このクラスは、ベアリングシートの形状を定義し、そのパスを取得するためのメソッドを提供します。
 */
export class CSizeBearingSeatCurve {
  curve: Vector2[] = CSzieBearingSeatPath ?? [];

  id: string;
  constructor() {
    this.id = `YoyoCubicBezierCurve_${Date.now()}`;
  }
  getPath(): Vector2[] {
    return this.curve;
  }
  getFirthPoint(): Vector2 {
    if (this.curve[0] === undefined) {
      throw new Error("Curve is empty, cannot get first point.");
    }
    return this.curve[0];
  }
  getLastPoint(): Vector2 {
    const lastPoint = this.curve[this.curve.length - 1];
    if (lastPoint === undefined) {
      throw new Error("Curve is empty, cannot get last point.");
    }
    return lastPoint;
  }
}
