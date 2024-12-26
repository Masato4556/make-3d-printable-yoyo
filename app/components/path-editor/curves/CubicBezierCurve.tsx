import { Line } from "@react-three/drei";
import { YoyoCubicBezierCurve } from "~/contexts/curves/Curve/YoyoCubicBezierCurve";
import { PATH_COLOR, WIRE_COLOR } from "~/styles/const";
import { DraggablePoint } from "./draggable-point";
import { pointMaterial } from "~/utils/material";
import { Vector2 } from "three";

type Props = {
  curve: YoyoCubicBezierCurve;
};

const POINT_NUM = 64;

export function CubicBezierCurve(props: Props) {
  const { curve } = props;

  return (
    <>
      {/* 両端 */}
      <DraggablePoint
        position={curve.curve.v0}
        onDrag={(v) => {
          curve.curve.v0 = new Vector2(v.x, v.y);
          curve.updateDispath(curve, curve.index);
        }}
        // onPointerEnter={() => {
        //   setOnPointerEdge(true);
        // }}
        // onPointerLeave={() => {
        //   setOnPointerEdge(false);
        // }}
        material={pointMaterial}
        fixed={
          curve.option?.fixedEdge == "start" ||
          curve.option?.fixedEdge == "both"
        }
      />
      <DraggablePoint
        position={curve.curve.v3}
        onDrag={(v) => {
          curve.curve.v3 = new Vector2(v.x, v.y);
          curve.updateDispath(curve, curve.index);
        }}
        // onPointerEnter={() => {
        //   setOnPointerEdge(true);
        // }}
        // onPointerLeave={() => {
        //   setOnPointerEdge(false);
        // }}
        material={pointMaterial}
        fixed={
          curve.option?.fixedEdge == "end" || curve.option?.fixedEdge == "both"
        }
      />
      <Line
        points={curve.curve.getPoints(POINT_NUM)}
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

          curve.divedeDispath(divide(curve, t), curve.index);
        }}
      />

      {/* 編集点 */}
      <DraggablePoint
        position={curve.curve.v1}
        material={pointMaterial}
        shape="rectangle"
        onDrag={(v) => {
          curve.curve.v1 = new Vector2(v.x, v.y);
          curve.updateDispath(curve, curve.index);
        }}
      />
      <DraggablePoint
        position={curve.curve.v2}
        material={pointMaterial}
        shape="rectangle"
        onDrag={(v) => {
          curve.curve.v2 = new Vector2(v.x, v.y);
          curve.updateDispath(curve, curve.index);
        }}
      />
      <Line
        points={[curve.curve.v0, curve.curve.v1]}
        color={WIRE_COLOR}
        lineWidth={2}
      />
      <Line
        points={[curve.curve.v2, curve.curve.v3]}
        color={WIRE_COLOR}
        lineWidth={2}
      />
    </>
  );
}

function divide(
  yoyoCubicBezierCurve: YoyoCubicBezierCurve,
  t: number
): YoyoCubicBezierCurve[] {
  const { v0: p0, v1: p1, v2: p2, v3: p3 } = yoyoCubicBezierCurve.curve;
  const q0 = p0.clone().lerp(p1, t);
  const q1 = p1.clone().lerp(p2, t);
  const q2 = p2.clone().lerp(p3, t);
  const r0 = q0.clone().lerp(q1, t);
  const r1 = q1.clone().lerp(q2, t);
  const s = r0.clone().lerp(r1, t);

  return [
    new YoyoCubicBezierCurve(
      p0,
      q0,
      r0,
      s,
      yoyoCubicBezierCurve.updateDispath,
      yoyoCubicBezierCurve.divedeDispath,
      yoyoCubicBezierCurve.option?.fixedEdge == "start" ||
      yoyoCubicBezierCurve.option?.fixedEdge == "both"
        ? { fixedEdge: "start" }
        : {}
    ),
    new YoyoCubicBezierCurve(
      s,
      r1,
      q2,
      p3,
      yoyoCubicBezierCurve.updateDispath,
      yoyoCubicBezierCurve.divedeDispath,
      yoyoCubicBezierCurve.option?.fixedEdge == "end" ||
      yoyoCubicBezierCurve.option?.fixedEdge == "both"
        ? { fixedEdge: "end" }
        : {}
    ),
  ];
}
