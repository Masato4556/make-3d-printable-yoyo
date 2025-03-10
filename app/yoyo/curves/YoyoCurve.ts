/**
 * コンテキストで管理するカーブクラスのインターフェース
 */

import { Vector2 } from "~/math/Vector2";

export interface YoyoCurve {
  id: string;
  index: number;
  type: string;
  updateDispath: (curve: YoyoCurve, index: number) => void;
  getPath(): Vector2[];
  getFirstPoint(): Vector2;
  getLastPoint(): Vector2;
  updateFirstPoint(v: Vector2): void;
  updateLastPoint(v: Vector2): void;
  setIndex(index: number): void;
}
