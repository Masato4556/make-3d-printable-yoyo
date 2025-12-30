import { Point } from "../../Point";
import { Vector2 } from "../../../math";

type ChamferResult = {
  chamferStartPoint: Point;
  chamferEndPoint: Point;
};

/**
 * 2つのベクトルが作る角に対して、チャンファーを適用し、
 * チャンファーの開始点と終了点を計算する。
 *
 * @param cornerPoint - 角をなす点
 * @param p0 - 前の点
 * @param p2 - 次の点
 * @param chamferSize - チャンファーのサイズ
 */
export const applyChamfer = (
  cornerPoint: Point,
  p0: Point,
  p2: Point,
  chamferSize: number
): ChamferResult => {
  const v1 = new Vector2(
    p0.x - cornerPoint.x,
    p0.y - cornerPoint.y
  ).normalize();
  const v2 = new Vector2(
    p2.x - cornerPoint.x,
    p2.y - cornerPoint.y
  ).normalize();

  const angle = Math.acos(v1.dot(v2));
  const tangentLength = chamferSize / Math.tan(angle / 2);

  const chamferStartPoint = new Point({
    x: cornerPoint.x + v1.x * tangentLength,
    y: cornerPoint.y + v1.y * tangentLength,
  });

  const chamferEndPoint = new Point({
    x: cornerPoint.x + v2.x * tangentLength,
    y: cornerPoint.y + v2.y * tangentLength,
  });

  return { chamferStartPoint, chamferEndPoint };
};
