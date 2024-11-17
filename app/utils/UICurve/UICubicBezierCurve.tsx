import { CubicBezierCurve, Vector2, Vector3 } from "three";
import { UICurve } from "./UICurve";
import { Line } from "@react-three/drei";
import { PATH_COLOR, WIRE_COLOR } from "~/styles/const";
import { DraggablePoint } from "./draggable-point";
import { pointMaterial } from "../material";

type Option = {
  fixedEdge: "start" | "end" | "both";
};

export class UICubicBezierCurve implements UICurve {
  curve: CubicBezierCurve;
  dispatch: (uiCurve: UICurve) => void;
  option?: Option;
  constructor(
    v0: Vector2,
    v1: Vector2,
    v2: Vector2,
    v3: Vector2,
    dispatch: (uiCurve: UICurve) => void,
    option?: Option
  ) {
    this.curve = new CubicBezierCurve(v0, v1, v2, v3);
    this.dispatch = dispatch;
    this.option = option;
  }
  getPath(): Vector2[] {
    return this.curve.getPoints(64);
  }
  getElement(): JSX.Element {
    const { v0, v1, v2, v3 } = this.curve;

    return (
      <>
        {/* 両端 */}
        <DraggablePoint
          position={new Vector3(v0.x, v0.y)}
          onDrag={(v) => {
            this.curve.v0 = new Vector2(v.x, v.y);
            this.dispatch(this);
          }}
          // onPointerEnter={() => {
          //   setOnPointerEdge(true);
          // }}
          // onPointerLeave={() => {
          //   setOnPointerEdge(false);
          // }}
          material={pointMaterial}
          fixed={
            this.option?.fixedEdge == "start" ||
            this.option?.fixedEdge == "both"
          }
        />
        <DraggablePoint
          position={new Vector3(v3.x, v3.y)}
          onDrag={(v) => {
            this.curve.v3 = new Vector2(v.x, v.y);
            this.dispatch(this);
          }}
          // onPointerEnter={() => {
          //   setOnPointerEdge(true);
          // }}
          // onPointerLeave={() => {
          //   setOnPointerEdge(false);
          // }}
          material={pointMaterial}
          fixed={
            this.option?.fixedEdge == "end" || this.option?.fixedEdge == "both"
          }
        />
        <Line
          points={this.curve.getPoints(64)}
          color={PATH_COLOR}
          lineWidth={3}
        />

        {/* 編集点 */}
        <DraggablePoint
          position={new Vector3(v1.x, v1.y)}
          material={pointMaterial}
          shape="rectangle"
          onDrag={(v) => {
            this.curve.v1 = new Vector2(v.x, v.y);
            this.dispatch(this);
          }}
        />
        <DraggablePoint
          position={new Vector3(v2.x, v2.y)}
          material={pointMaterial}
          shape="rectangle"
          onDrag={(v) => {
            this.curve.v2 = new Vector2(v.x, v.y);
            this.dispatch(this);
          }}
        />
        <Line points={[v0, v1]} color={WIRE_COLOR} lineWidth={2} />
        <Line points={[v2, v3]} color={WIRE_COLOR} lineWidth={2} />
      </>
    );
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
}
