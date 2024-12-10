import { Vector2 } from "three";
import { Line } from "@react-three/drei";
import { PATH_COLOR } from "~/styles/const";
import { YoyoCurve } from "./YoyoCurve";

export class YoyoHorizontalLine implements YoyoCurve {
  id: string;
  index: number = 0;
  v0: Vector2;
  v1: Vector2;
  updateDispath: (curve: YoyoCurve, index: number) => void;
  constructor(
    v0: Vector2,
    v1: Vector2,
    updateDispath: (curve: YoyoCurve, index: number) => void
  ) {
    this.v0 = v0;
    this.v1 = v1;
    this.updateDispath = updateDispath;
    this.id = `YoyoHorizontalLine_${Date.now()}_${v0.x}_${v0.y}_${v1.x}_${
      v1.y
    }`;
  }
  getPath(): Vector2[] {
    return [this.v0, this.v1];
  }
  getElement(): JSX.Element {
    return (
      <Line points={[this.v0, this.v1]} color={PATH_COLOR} lineWidth={3} />
    );
  }
  getFirstPoint(): Vector2 {
    return this.v0;
  }
  getLastPoint(): Vector2 {
    return this.v1;
  }
  updateFirstPoint(v: Vector2): void {
    this.v0 = v;
    this.v1.setY(v.y);
  }
  updateLastPoint(v: Vector2): void {
    this.v1 = v;
    this.v0.setY(v.y);
  }
  setIndex(index: number): void {
    this.index = index;
  }
}
