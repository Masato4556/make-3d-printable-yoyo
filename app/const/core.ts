/**
 * コア（ベアリングと噛み合わせるパーツ。よりわかりやすい命名を検討中）に関するデータ
 * 対応するベアリングの種類を増やす場合、ここを変更する
 */

import { CubicBezierCurve, Vector2 } from "three";
import { BearingSizeType } from "./bearing";

type BearingSeatSize = {
  height: number;
  radius: number;
  path: Vector2[];
};

export const BEARING_SEAT_HEIGHT = 4; // コアの中心部分の高さ

export const BEARING_SEAT_PARAMS: { [k in BearingSizeType]: BearingSeatSize } =
  {
    sizeC: {
      height: 2.085 + BEARING_SEAT_HEIGHT, // コアの側面の高さ
      radius: 10.55, //  コアの半径
      path: [new Vector2()]
        .concat(
          new Vector2(2, 0),
          new Vector2(2, 4),
          new CubicBezierCurve(
            new Vector2(2.5, 4),
            new Vector2(3.15, 4),
            new Vector2(3.15, 4),
            new Vector2(3.15, 3.5)
          ).getPoints(8),
          new Vector2(3.15, 2),
          new CubicBezierCurve(
            new Vector2(3.85, 2),
            new Vector2(4.15, 2),
            new Vector2(4.15, 2),
            new Vector2(4.15, 1.7)
          ).getPoints(8),
          new Vector2(4.15, 0.59),
          new Vector2(6.45, 0.59),
          new CubicBezierCurve(
            new Vector2(6.45, 2.14 - 0.2),
            new Vector2(6.45, 2.14),
            new Vector2(6.45, 2.14),
            new Vector2(6.45 - 0.2, 2.14)
          ).getPoints(8),
          new CubicBezierCurve(
            new Vector2(7.1 - 0.2, 2.14),
            new Vector2(7.1, 2.14),
            new Vector2(7.1, 2.14),
            new Vector2(7.1, 2.14 - 0.2)
          ).getPoints(8),
          new Vector2(7.1, 0.885),
          new Vector2(9.55, 0.885),
          new CubicBezierCurve(
            new Vector2(9.55, 2.085 - 0.3),
            new Vector2(9.55, 2.085),
            new Vector2(9.55, 2.085),
            new Vector2(9.55 - 0.3, 2.085)
          ).getPoints(8),
          new Vector2(10.55, 2.085),
          new Vector2(10.55, 0),
          // ウィングとコアの接続部分
          new Vector2(10.55, -BEARING_SEAT_HEIGHT),
          new Vector2(2, -BEARING_SEAT_HEIGHT)
        )
        .map((point) => new Vector2(point.x, point.y)),
    },
  } as const;
