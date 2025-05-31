/**
 * コンテキストで管理する横線のクラス
 */

import { Vector2 } from "../../../math/vector2";
import { YoyoCurve } from "./YoyoCurve";

export class YoyoHorizontalLine implements YoyoCurve {
  id: string;
  type: string = "HorizontalLine";
  index: number = 0;
  v0: Vector2;
  v1: Vector2;
  constructor(v0: Vector2, v1: Vector2) {
    this.v0 = v0;
    this.v1 = v1;

    this.id = `YoyoHorizontalLine_${Date.now()}_${v0.x}_${v0.y}_${v1.x}_${
      v1.y
    }`;
  }
  getPath(): Vector2[] {
    return [this.v0, this.v1];
  }
  getFirstPoint(): Vector2 {
    return this.v0;
  }
  getLastPoint(): Vector2 {
    return this.v1;
  }
  updateFirstPoint(v: Vector2): void {
    this.v0 = v;
    this.v1 = this.v1.withY(v.y);
  }
  updateLastPoint(v: Vector2): void {
    this.v0 = this.v0.withY(v.y);
    this.v1 = v;
  }
  setIndex(index: number): void {
    this.index = index;
  }
}
