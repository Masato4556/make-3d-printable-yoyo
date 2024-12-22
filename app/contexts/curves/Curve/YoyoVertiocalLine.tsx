import { Vector2 } from "three";
import { Line } from "@react-three/drei";
import { PATH_COLOR } from "~/styles/const";
import { DraggablePoint } from "./draggable-point";
import { YoyoCurve } from "./YoyoCurve";

type Option = {
  editablePoint?: "start" | "end";
};

export class YoyoVertiocalLine implements YoyoCurve {
  id: string;
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
    this.id = `YoyoVertiocalLine_${Date.now()}_${v0.x}_${v0.y}_${v1.x}_${v1.y}`;
  }
  getPath(): Vector2[] {
    return [this.v0, this.v1];
  }
  getElement(): JSX.Element {
    return (
      <>
        <Line points={[this.v0, this.v1]} color={PATH_COLOR} lineWidth={3} />
        {this.option?.editablePoint == "start" && (
          <DraggablePoint
            position={this.v0}
            onDrag={(v) => {
              this.v0.x = v.x;
              this.v1.x = v.x;
              this.updateDispath(this, this.index);
            }}
          />
        )}
        {this.option?.editablePoint == "end" && (
          <DraggablePoint
            position={this.v1}
            onDrag={(v) => {
              this.v0.x = v.x;
              this.v1.x = v.x;
              this.updateDispath(this, this.index);
            }}
            dragLimits={[undefined, [0, 0], [0, 0]]}
          />
        )}
      </>
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
