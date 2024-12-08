import { Vector2 } from "three";
import { Line } from "@react-three/drei";
import { PATH_COLOR } from "~/styles/const";
import { YoyoCurve } from "./YoyoCurve";

export class YoyoHorizontalLine implements YoyoCurve {
  v0: Vector2;
  v1: Vector2;
  dispatch: (curve: YoyoCurve) => void;
  constructor(v0: Vector2, v1: Vector2, dispatch: (curve: YoyoCurve) => void) {
    this.v0 = v0;
    this.v1 = v1;
    this.dispatch = dispatch;
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
}
