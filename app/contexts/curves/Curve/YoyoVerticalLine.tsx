import { Vector2 } from "three";
import { YoyoCurve } from "./YoyoCurve";

type Option = {
  editablePoint?: "start" | "end";
};

export class YoyoVerticalLine implements YoyoCurve {
  id: string;
  type: string = "VerticalLine";
  index: number = 0;
  v0: Vector2;
  v1: Vector2;
  updateDispath: (curve: YoyoCurve, index: number) => void;
  option?: Option;
  constructor(
    v0: Vector2,
    v1: Vector2,
    updateDispath: (curve: YoyoCurve, index: number) => void,
    option?: Option
  ) {
    this.v0 = v0;
    this.v1 = v1;
    this.updateDispath = updateDispath;
    this.option = option;
    this.id = `YoyoVerticalLine_${Date.now()}_${v0.x}_${v0.y}_${v1.x}_${v1.y}`;
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
    this.v1.setX(v.x);
  }
  updateLastPoint(v: Vector2): void {
    this.v1 = v;
    this.v0.setX(v.x);
  }
  setIndex(index: number): void {
    this.index = index;
  }
}
