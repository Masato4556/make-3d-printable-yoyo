/**
 * コンテキストで管理する2次ベジェ曲線のクラス
 */

import { Vector2 } from "../../math/vector2";
import { getCubicBezierCurve } from "./getCubicBezierCurve";
import { YoyoCurve } from "./YoyoCurve";

type Option = {
  fixedEdge?: "start" | "end" | "both";
};

export class YoyoCubicBezierCurve implements YoyoCurve {
  index: number = 0;
  type: string = "CubicBezierCurve";
  handles: {
    v0: Vector2;
    v1: Vector2;
    v2: Vector2;
    v3: Vector2;
  };
  option?: Option;
  id: string;
  constructor({ v0, v1, v2, v3 }: CubicBezierCurveHandle, option?: Option) {
    this.handles = { v0, v1, v2, v3 };
    this.option = option;
    this.id = `YoyoCubicBezierCurve_${Date.now()}_${v0.x}_${v0.y}_${v1.x}_${
      v1.y
    }_${v2.x}_${v2.y}_${v3.x}_${v3.y}`;
  }
  getPath(): Vector2[] {
    // 2次ベジェ曲線のパスを返す
    const { v0, v1, v2, v3 } = this.handles;
    return getCubicBezierCurve({ v0, v1, v2, v3 }, 64);
  }
  getFirstPoint(): Vector2 {
    return this.handles.v0;
  }
  getLastPoint(): Vector2 {
    return this.handles.v3;
  }
  updateFirstPoint(v: Vector2): void {
    this.handles.v0 = v;
  }
  updateLastPoint(v: Vector2): void {
    this.handles.v3 = v;
  }
  setIndex(index: number): void {
    this.index = index;
  }
}

interface CubicBezierCurveHandle {
  v0: Vector2;
  v1: Vector2;
  v2: Vector2;
  v3: Vector2;
}
