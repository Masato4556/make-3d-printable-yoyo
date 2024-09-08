import { useMemo } from "react";
import { useYoyoCurve } from "../hooks/use-yoyo-curve";
import { Vector3 } from "three";
import { useSetYoyoPath } from "../hooks/use-set-yoyo-path";
import { useLineGeometry } from "../hooks/use-line-geometry";
import { DraggablePoint } from "./draggable-point";
import { Line } from "@react-three/drei";
import { DraggableCubicBezierCurve } from "./draggable-cubic-bezier-curve";
import { pointMaterial, curveMaterial, wireMaterial } from "./material";
import { PATH_COLOR } from "~/styles/const";
import { DimesionLine } from "./dimesion-line";

export function EditableYoyoPath() {
  const {
    yoyoCurve,
    yoyoCurveDispatch,
    rimOutsidePosition,
    setRimOutsidePosition,
  } = useYoyoCurve();

  const curveFirstPoint = yoyoCurve.v0;
  const curveLastPoint = yoyoCurve.v3;

  const yoyoCurvePoints = useMemo(() => {
    return yoyoCurve.getPoints(1024);
  }, [yoyoCurve]);

  const rimPosition = useMemo(() => {
    return new Vector3(rimOutsidePosition.x, 0);
  }, [rimOutsidePosition]);

  useSetYoyoPath(yoyoCurvePoints, rimOutsidePosition);

  const { flatLinePoints, rimLinePoints, mirrerdPoints } = useLineGeometry(
    yoyoCurvePoints,
    rimOutsidePosition
  );

  return (
    <>
      {/* ヨーヨーのパスの上半分 */}
      <DraggableCubicBezierCurve
        bezierCurvePath={yoyoCurve}
        onDragStartPoint={(v) => {
          yoyoCurveDispatch({ target: "start", v });
        }}
        onDragFirstControlPoint={(v) => {
          yoyoCurveDispatch({ target: "first_control", v });
        }}
        onDragSecondControlPoint={(v) => {
          yoyoCurveDispatch({ target: "second_control", v });
        }}
        onDragEndPoint={(v) => {
          yoyoCurveDispatch({ target: "end", v });
          setRimOutsidePosition(new Vector3(rimOutsidePosition.x, v.y));
        }}
        materials={{
          edgePoint: pointMaterial,
          controlPoint: pointMaterial,
          curve: curveMaterial,
          wire: wireMaterial,
        }}
        fixedPoints="start"
      />
      <DraggablePoint
        position={rimPosition}
        onDrag={(v) => {
          setRimOutsidePosition(new Vector3(v.x, rimOutsidePosition.y));
        }}
        material={pointMaterial}
        dragLimits={[undefined, [0, 0], [0, 0]]}
      />
      <Line points={flatLinePoints} color={PATH_COLOR} lineWidth={3} />
      <Line points={rimLinePoints} color={PATH_COLOR} lineWidth={3} />

      {/* ヨーヨーのパスの下半分 */}
      <Line points={mirrerdPoints} color={PATH_COLOR} lineWidth={3} />

      {/* 寸法 */}
      <DimesionLine
        curveFirstPoint={curveFirstPoint}
        curveLastPoint={curveLastPoint}
        rimOutsidePosition={rimOutsidePosition}
      />
    </>
  );
}

// パス編集時に、ヨーヨー全体のパスが表示されるようにしたい
// - ベアリング受けの部分
// - リムに曲線をつけられるようにする
