/**
 * コンテキストで管理するカーブクラスのインターフェース
 */

import { Vector2 } from "../../math/vector2";

export interface YoyoCurve {
  id: string;
  index: number;
  type: string;
  getPath(): Vector2[];
  getFirstPoint(): Vector2;
  getLastPoint(): Vector2;
  updateFirstPoint(v: Vector2): void;
  updateLastPoint(v: Vector2): void;
  setIndex(index: number): void;
}
