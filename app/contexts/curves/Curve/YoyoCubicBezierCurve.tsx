/**
 * コンテキストで管理する2次ベジェ曲線のクラス
 */

import { CubicBezierCurve, Vector2 } from "three";
import { YoyoCurve } from "./YoyoCurve";

type Option = {
  fixedEdge?: "start" | "end" | "both";
};

export class YoyoCubicBezierCurve implements YoyoCurve {
  index: number = 0;
  type: string = "CubicBezierCurve";
  curve: CubicBezierCurve;
  updateDispath: (curve: YoyoCurve, index: number) => void;
  divedeDispath: (curve: YoyoCurve[], index: number) => void;
  option?: Option;
  id: string;
  constructor(
    v0: Vector2,
    v1: Vector2,
    v2: Vector2,
    v3: Vector2,
    updateDispath: (curve: YoyoCurve, index: number) => void,
    divedeDispath: (curve: YoyoCurve[], index: number) => void,
    option?: Option
  ) {
    this.curve = new CubicBezierCurve(v0, v1, v2, v3);
    this.updateDispath = updateDispath;
    this.divedeDispath = divedeDispath;
    this.option = option;
    this.id = `YoyoCubicBezierCurve_${Date.now()}_${v0.x}_${v0.y}_${v1.x}_${
      v1.y
    }_${v2.x}_${v2.y}_${v3.x}_${v3.y}`;
  }
  getPath(): Vector2[] {
    return this.curve.getPoints(64);
  }
  getFirstPoint(): Vector2 {
    return this.curve.v0;
  }
  getLastPoint(): Vector2 {
    return this.curve.v3;
  }
  updateFirstPoint(v: Vector2): void {
    this.curve.v0 = v;
  }
  updateLastPoint(v: Vector2): void {
    this.curve.v3 = v;
  }
  setIndex(index: number): void {
    this.index = index;
  }
}
