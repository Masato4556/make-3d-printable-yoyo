import { CubicBezierCurve, Vector2 as ThreeVector2 } from "three";
import { Vector2 } from "../../math/vector2";

const BEARING_SEAT_HEIGHT = 4;

// height: 2.085 + BEARING_SEAT_HEIGHT,
// radius: 10.55,

export const CSzieBearingSeatPath = [new ThreeVector2()]
  .concat(
    new ThreeVector2(2, 0),
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
    new ThreeVector2(10.55, 2.085),
    new ThreeVector2(10.55, 0),
    // ウィングとコアの接続部分
    new ThreeVector2(10.55, -BEARING_SEAT_HEIGHT),
    new ThreeVector2(2, -BEARING_SEAT_HEIGHT)
  )
  .map((point) => new Vector2(point.x, point.y));
