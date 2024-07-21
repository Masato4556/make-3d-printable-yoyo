import { useMemo, useRef } from "react";
import {
  CubicBezierCurve3,
  LineCurve3,
  Material,
  TubeGeometry,
  Vector3,
} from "three";
import { DraggablePoint } from "./draggable-point";

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
}) {
  const {
    bezierCurvePath,
    onDragStartPoint,
    onDragFirstControlPoint,
    onDragSecondControlPoint,
    onDragEndPoint,
    materials,
  } = props;
  const initialbezierCurvePath = useRef(bezierCurvePath.clone());
  const { bezierCurveGeometry, controlWire1, controlWire2 } = useMemo(() => {
    return {
      bezierCurveGeometry: new TubeGeometry(bezierCurvePath, 64, 0.1),
      controlWire1: new TubeGeometry(
        new LineCurve3(bezierCurvePath.v0, bezierCurvePath.v1),
        64,
        0.1
      ),
      controlWire2: new TubeGeometry(
        new LineCurve3(bezierCurvePath.v2, bezierCurvePath.v3),
        64,
        0.1
      ),
    };
  }, [bezierCurvePath]);
  return (
    <>
      <mesh geometry={bezierCurveGeometry} material={materials?.curve} />
      <mesh geometry={controlWire1} material={materials?.wire} />
      <mesh geometry={controlWire2} material={materials?.wire} />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v0}
        onDrag={(v) => {
          onDragStartPoint(v);
        }}
        material={materials?.edgePoint}
      />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v1}
        onDrag={(v) => {
          onDragFirstControlPoint(v);
        }}
        material={materials?.controlPoint}
        shape={"rectangle"}
      />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v2}
        onDrag={(v) => {
          onDragSecondControlPoint(v);
        }}
        material={materials?.controlPoint}
        shape={"rectangle"}
      />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v3}
        onDrag={(v) => {
          onDragEndPoint(v);
        }}
        material={materials?.edgePoint}
      />
    </>
  );
}
