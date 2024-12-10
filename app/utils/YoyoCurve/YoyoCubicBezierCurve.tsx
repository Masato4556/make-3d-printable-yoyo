import { CubicBezierCurve, Vector2, Vector3 } from "three";
import { YoyoCurve } from "./YoyoCurve";
import { Line } from "@react-three/drei";
import { PATH_COLOR, WIRE_COLOR } from "~/styles/const";
import { DraggablePoint } from "./draggable-point";
import { pointMaterial } from "../material";

type Option = {
  fixedEdge?: "start" | "end" | "both";
};

const POINT_NUM = 64;

export class YoyoCubicBezierCurve implements YoyoCurve {
  index: number = 0;
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
  getElement(): JSX.Element {
    const { v0, v1, v2, v3 } = this.curve;
    console.log({ index: this.index, v0, v1, v2, v3 });

    return (
      <>
        {/* 両端 */}
        <DraggablePoint
          position={new Vector3(v0.x, v0.y)}
          onDrag={(v) => {
            this.curve.v0 = new Vector2(v.x, v.y);
            this.updateDispath(this, this.index);
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
            this.updateDispath(this, this.index);
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
          points={this.curve.getPoints(POINT_NUM)}
          color={PATH_COLOR}
          lineWidth={3}
          onClick={(e) => {
            // カーブを分割
            const { faceIndex = POINT_NUM / 2 } = e;
            const t = faceIndex / POINT_NUM;
            if (t < 0.1 || 0.9 < t) {
              // TODO: 両端をクリックした際にも分割が発生する問題を簡易的に修正。要リファクタリング
              return;
            }

            this.divedeDispath(this.divide(t), this.index);
          }}
        />

        {/* 編集点 */}
        <DraggablePoint
          position={new Vector3(v1.x, v1.y)}
          material={pointMaterial}
          shape="rectangle"
          onDrag={(v) => {
            this.curve.v1 = new Vector2(v.x, v.y);
            this.updateDispath(this, this.index);
          }}
        />
        <DraggablePoint
          position={new Vector3(v2.x, v2.y)}
          material={pointMaterial}
          shape="rectangle"
          onDrag={(v) => {
            this.curve.v2 = new Vector2(v.x, v.y);
            this.updateDispath(this, this.index);
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
  setIndex(index: number): void {
    this.index = index;
  }
  private divide(t: number): YoyoCurve[] {
    const { v0: p0, v1: p1, v2: p2, v3: p3 } = this.curve;
    console.log(this.curve, t);
    const q0 = p0.clone().lerp(p1, t);
    const q1 = p1.clone().lerp(p2, t);
    const q2 = p2.clone().lerp(p3, t);
    const r0 = q0.clone().lerp(q1, t);
    const r1 = q1.clone().lerp(q2, t);
    const s = r0.clone().lerp(r1, t);
    console.log(q0, q1, q2, r0, r1, s);

    return [
      new YoyoCubicBezierCurve(
        p0,
        q0,
        r0,
        s,
        this.updateDispath,
        this.divedeDispath,
        this.option?.fixedEdge == "start" || this.option?.fixedEdge == "both"
          ? { fixedEdge: "start" }
          : {}
      ),
      new YoyoCubicBezierCurve(
        s,
        r1,
        q2,
        p3,
        this.updateDispath,
        this.divedeDispath,
        this.option?.fixedEdge == "end" || this.option?.fixedEdge == "both"
          ? { fixedEdge: "end" }
          : {}
      ),
    ];
  }
}
