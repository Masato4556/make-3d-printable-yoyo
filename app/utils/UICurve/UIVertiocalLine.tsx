import { Vector2, Vector3 } from "three";
import { UICurve } from "./UICurve";
import { Line } from "@react-three/drei";
import { PATH_COLOR } from "~/styles/const";
import { DraggablePoint } from "./draggable-point";

type Option = {
  editablePoint?: "start" | "end";
};

export class UIVertiocalLine implements UICurve {
  v0: Vector2;
  v1: Vector2;
  dispatch: (uiCurve: UICurve) => void;
  option?: Option;
  constructor(
    v0: Vector2,
    v1: Vector2,
    dispatch: (uiCurve: UICurve) => void,
    option?: Option
  ) {
    this.v0 = v0;
    this.v1 = v1;
    this.dispatch = dispatch;
    this.option = option;
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
            position={new Vector3(this.v0.x, this.v0.y)}
            onDrag={(v) => {
              this.v0.x = v.x;
              this.v1.x = v.x;
              this.dispatch(this);
            }}
          />
        )}
        {this.option?.editablePoint == "end" && (
          <DraggablePoint
            position={new Vector3(this.v1.x, this.v1.y)}
            onDrag={(v) => {
              this.v0.x = v.x;
              this.v1.x = v.x;
              this.dispatch(this);
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
}
