import { useMemo } from "react";
import { useYoyoCurve } from "../hooks/use-yoyo-curve";
import { Vector3 } from "three";
import { useSetYoyoPath } from "../hooks/use-set-yoyo-path";
import { useLineGeometry } from "../hooks/use-line-geometry";
import { DraggablePoint } from "./draggable-point";
import { XAxis } from "../XAxis";
import { Line, Text3D } from "@react-three/drei";
import { DraggableCubicBezierCurve } from "./draggable-cubic-bezier-curve";
import { pointMaterial, curveMaterial, wireMaterial } from "./material";
import { PATH_COLOR, WIRE_COLOR } from "~/styles/const";

export function EditableYoyoPath() {
  const {
    yoyoCurve,
    yoyoCurveDispatch,
    rimOutsidePosition,
    setRimOutsidePosition,
  } = useYoyoCurve();

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

  const yoyoCurveLastPoints = yoyoCurvePoints[yoyoCurvePoints.length - 1];

  const lineProps = useMemo(() => {
    return {
      //
      leftEdgeLine: {
        points: [
          new Vector3(yoyoCurvePoints[0].x, yoyoCurvePoints[0].y, 0),
          new Vector3(yoyoCurvePoints[0].x, yoyoCurveLastPoints.y + 13, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      rightEdgeLine: {
        points: [
          new Vector3(rimOutsidePosition.x, yoyoCurveLastPoints.y, 0),
          new Vector3(rimOutsidePosition.x, yoyoCurveLastPoints.y + 13, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      widhtLineGeometry: {
        points: [
          new Vector3(yoyoCurvePoints[0].x, yoyoCurveLastPoints.y + 10, 0),
          new Vector3(rimOutsidePosition.x, yoyoCurveLastPoints.y + 10, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      //
      upperEdgeLine: {
        points: [
          new Vector3(rimOutsidePosition.x, yoyoCurveLastPoints.y, 0),
          new Vector3(rimOutsidePosition.x + 15, yoyoCurveLastPoints.y, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      bottomEdgeLine: {
        points: [
          new Vector3(rimOutsidePosition.x, -yoyoCurveLastPoints.y, 0),
          new Vector3(rimOutsidePosition.x + 15, -yoyoCurveLastPoints.y, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      heightLineGeometry: {
        points: [
          new Vector3(rimOutsidePosition.x + 10, yoyoCurveLastPoints.y, 0),
          new Vector3(rimOutsidePosition.x + 10, -yoyoCurveLastPoints.y, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      // Flat Width Line
      flatLeftEdgeLine: {
        points: [
          new Vector3(yoyoCurveLastPoints.x, -yoyoCurveLastPoints.y, 0),
          new Vector3(yoyoCurveLastPoints.x, -yoyoCurveLastPoints.y - 15, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      flatRightEdgeLine: {
        points: [
          new Vector3(rimOutsidePosition.x, -yoyoCurveLastPoints.y, 0),
          new Vector3(rimOutsidePosition.x, -yoyoCurveLastPoints.y - 15, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      flatWidthLine: {
        points: [
          new Vector3(yoyoCurveLastPoints.x, -yoyoCurveLastPoints.y - 10, 0),
          new Vector3(rimOutsidePosition.x, -yoyoCurveLastPoints.y - 10, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
    };
  }, [
    rimOutsidePosition.x,
    yoyoCurveLastPoints.x,
    yoyoCurveLastPoints.y,
    yoyoCurvePoints,
  ]);

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
      <Text3D
        font={"/font/Roboto_Regular.json"}
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={
          new Vector3(yoyoCurvePoints[0].x, yoyoCurveLastPoints.y + 14, 0)
        }
      >
        {`${(rimPosition.x - yoyoCurvePoints[0].x).toFixed(2)}mm`}
      </Text3D>

      <Text3D
        font={"/font/Roboto_Regular.json"} // TODO: フォントの指定の仕方をリファクタリングする
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={new Vector3(rimOutsidePosition.x + 15, 2, 0)}
      >
        {`${(yoyoCurveLastPoints.y * 2).toFixed(2)}mm`}
      </Text3D>

      <Text3D
        font={"/font/Roboto_Regular.json"}
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={
          new Vector3(yoyoCurveLastPoints.x, -yoyoCurveLastPoints.y - 20, 0)
        }
      >
        {`${(rimOutsidePosition.x - yoyoCurveLastPoints.x).toFixed(2)}mm`}
      </Text3D>

      {Object.entries(lineProps).map(([key, { points, color, lineWidth }]) => {
        return (
          <Line key={key} points={points} color={color} lineWidth={lineWidth} />
        );
      })}

      {/* 軸 */}
      <XAxis />
    </>
  );
}

// パス編集時に、ヨーヨー全体のパスが表示されるようにしたい
// - ベアリング受けの部分
// - リムに曲線をつけられるようにする
