import { useMemo } from "react";
import { CubicBezierCurve3, Material, Vector3 } from "three";
import { DraggablePoint } from "./draggable-point";
import { Line } from "@react-three/drei";
import { PATH_COLOR, WIRE_COLOR } from "~/styles/const";

export function DraggableCubicBezierCurve(props: {
  bezierCurvePath: CubicBezierCurve3;
  materials?: {
    edgePoint?: Material | Material[] | undefined;
    controlPoint?: Material | Material[] | undefined;
    curve?: Material | Material[] | undefined;
    wire?: Material | Material[] | undefined;
  };
  pointMaterial?: Material | Material[] | undefined;
  curveMaterial?: Material | Material[] | undefined;
  wireMaterial?: Material | Material[] | undefined;
  onDragStartPoint: (v: Vector3) => void;
  onDragFirstControlPoint: (v: Vector3) => void;
  onDragSecondControlPoint: (v: Vector3) => void;
  onDragEndPoint: (v: Vector3) => void;
  fixedPoints?: "start" | "end" | "both";
}) {
  const {
    bezierCurvePath,
    onDragStartPoint,
    onDragFirstControlPoint,
    onDragSecondControlPoint,
    onDragEndPoint,
    materials,
    fixedPoints,
  } = props;
  const { bezierCurvePoints, controlWire1Points, controlWire2Points } =
    useMemo(() => {
      return {
        bezierCurvePoints: bezierCurvePath.getPoints(1024),
        controlWire1Points: [bezierCurvePath.v0, bezierCurvePath.v1],
        controlWire2Points: [bezierCurvePath.v2, bezierCurvePath.v3],
      };
    }, [bezierCurvePath]);
  return (
    <>
      <Line points={bezierCurvePoints} color={PATH_COLOR} lineWidth={3} />
      <Line points={controlWire1Points} color={WIRE_COLOR} lineWidth={2} />
      <Line points={controlWire2Points} color={WIRE_COLOR} lineWidth={2} />
      <DraggablePoint
        position={bezierCurvePath.v0}
        onDrag={(v) => {
          onDragStartPoint(v);
        }}
        material={materials?.edgePoint}
        fixed={fixedPoints == "start" || fixedPoints == "both"}
      />
      <DraggablePoint
        position={bezierCurvePath.v1}
        onDrag={(v) => {
          onDragFirstControlPoint(v);
        }}
        material={materials?.controlPoint}
        shape={"rectangle"}
      />
      <DraggablePoint
        position={bezierCurvePath.v2}
        onDrag={(v) => {
          onDragSecondControlPoint(v);
        }}
        material={materials?.controlPoint}
        shape={"rectangle"}
      />
      <DraggablePoint
        position={bezierCurvePath.v3}
        onDrag={(v) => {
          onDragEndPoint(v);
        }}
        material={materials?.edgePoint}
        fixed={fixedPoints == "end" || fixedPoints == "both"}
      />
    </>
  );
}
