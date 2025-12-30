import { Vector2 } from "../../math";
import { getCubicBezierCurve } from "../../../functions/getCubicBezierCurve";
import { BEARING_SIZE, BearingSizeType, createBearing } from "../bearing";

/**
 * ベアリングサイズに基づいてベアリングシートのパスを生成する関数
 */
function createBearingSeatPath(bearingSize: BearingSizeType): Vector2[] {
  const size = BEARING_SIZE[bearingSize];

  // Cサイズベアリング用のパスデータ（他のサイズも将来追加可能）
  if (bearingSize === "sizeC") {
    const basePath: Vector2[] = [
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
    ];

    // ベアリングサイズに基づいてオフセット調整
    return basePath.map(
      (point) => new Vector2(point.x + 2.085 + size.width / 2, point.y)
    );
  }

  throw new Error(`Unsupported bearing size: ${bearingSize}`);
}

/**
 * BearingSeatCurve
 * ベアリングサイズに応じたベアリングシートのパスを表現するクラスです。
 */
export class BearingSeatCurve {
  private curve: Vector2[];

  readonly id: string;
  readonly bearingSize: BearingSizeType;

  constructor(bearingSize: BearingSizeType) {
    this.bearingSize = bearingSize;
    this.curve = createBearingSeatPath(bearingSize);
    this.id = `BearingSeatCurve_${bearingSize}_${Date.now()}`;
  }

  get bearing() {
    return createBearing(this.bearingSize);
  }

  getPath(): Vector2[] {
    return [...this.curve];
  }

  getFirstPoint(): Vector2 {
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

// 後方互換性のために旧クラス名もエクスポート
export { BearingSeatCurve as CSizeBearingSeatCurve };
