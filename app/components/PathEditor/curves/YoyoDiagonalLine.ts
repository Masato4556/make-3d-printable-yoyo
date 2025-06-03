/**
 * コンテキストで管理する縦線のクラス
 */

import { Vector2 } from "../../../math/vector2";
import { YoyoCurve } from "./YoyoCurve";

type Option = {
  editableLastPoint?: boolean;
};

export class YoyoDiagonalLine implements YoyoCurve {
  id: string;
  type: string = "DiagonalLine";
  index: number = 0;
  v0: Vector2;
  v1: Vector2;
  option: Option;
  constructor(v0: Vector2, v1: Vector2, option?: Option) {
    this.v0 = v0;
    this.v1 = v1;
    this.option = option ?? {};
    this.id = `YoyoDiagonalLine_${Date.now()}_${v0.x}_${v0.y}_${v1.x}_${v1.y}`;
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
  }
  updateLastPoint(v: Vector2): void {
    this.v1 = v;
  }
  setIndex(index: number): void {
    this.index = index;
  }
}
