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

type Props = {
  position: Vector3;
};

export function EditableYoyoPath(props: Props) {
  const { position } = props;
  const {
    yoyoCurves,
    yoyoCurvesDispatch,
    rimOutsidePosition,
    setRimOutsidePosition,
  } = useYoyoCurve();

  const curveFirstPoint = yoyoCurves[0].v0;
  const curveLastPoint = yoyoCurves[yoyoCurves.length - 1].v3;

  const yoyoCurvePoints = useMemo(() => {
    return yoyoCurves.flatMap((yoyoCurve) => yoyoCurve.getPoints(64));
  }, [yoyoCurves]);

  const rimPosition = useMemo(() => {
    return new Vector3(rimOutsidePosition.x, 0);
  }, [rimOutsidePosition]);

  useSetYoyoPath(yoyoCurvePoints, rimOutsidePosition);

  const { flatLinePoints, rimLinePoints, mirrerdPoints } = useLineGeometry(
    yoyoCurvePoints,
    rimOutsidePosition
  );

  return (
    <group position={position}>
      {/* ヨーヨーのパスの上半分 */}
      {/* TODO: DraggableCubicBezierCurve周りのロジックが複雑になっているのでリファクタリングしたい */}
      {yoyoCurves.map((yoyoCurve, index) => {
        return (
          <DraggableCubicBezierCurve
            key={index}
            bezierCurvePath={yoyoCurve}
            onDragStartPoint={(v) => {
              // ひとつ前のインデックスの終点を更新する際に次のインデックスのスタートも更新することになるので、ここの処理は不要になった
              // yoyoCurveDispatch({ target: "start", v, index });
            }}
            onDragFirstControlPoint={(v) => {
              yoyoCurvesDispatch({ target: "first_control", v, index });
            }}
            onDragSecondControlPoint={(v) => {
              yoyoCurvesDispatch({ target: "second_control", v, index });
            }}
            onDragEndPoint={(v) => {
              yoyoCurvesDispatch({ target: "end", v, index });
              if (index === yoyoCurves.length - 1) {
                setRimOutsidePosition(new Vector3(rimOutsidePosition.x, v.y));
              } else {
                yoyoCurvesDispatch({
                  target: "start",
                  v,
                  index: index + 1,
                });
              }
            }}
            materials={{
              edgePoint: pointMaterial,
              controlPoint: pointMaterial,
              curve: curveMaterial,
              wire: wireMaterial,
            }}
            fixedPoints={index == 0 ? "start" : undefined}
          />
        );
      })}
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
    </group>
  );
}

// パス編集時に、ヨーヨー全体のパスが表示されるようにしたい
// - ベアリング受けの部分
// - リムに曲線をつけられるようにする
