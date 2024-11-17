import { Line, Text3D } from "@react-three/drei";
import { useMemo } from "react";
import { Vector2, Vector3 } from "three";
import { WIRE_COLOR } from "~/styles/const";
import { curveMaterial } from "~/utils/material";

type DimesionLineProps = {
  curveFirstPoint: Vector2;
  curveLastPoint: Vector2;
  rimOutsidePosition: Vector2;
};
export function DimesionLine(props: DimesionLineProps) {
  const { curveFirstPoint, curveLastPoint, rimOutsidePosition } = props;
  const lineProps = useMemo(() => {
    return {
      // Width Line
      leftEdgeLine: {
        points: [
          new Vector2(curveFirstPoint.x, curveFirstPoint.y, 0),
          new Vector2(curveFirstPoint.x, curveLastPoint.y + 13, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      rightEdgeLine: {
        points: [
          new Vector2(rimOutsidePosition.x, curveLastPoint.y, 0),
          new Vector2(rimOutsidePosition.x, curveLastPoint.y + 13, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      widhtLineGeometry: {
        points: [
          new Vector2(curveFirstPoint.x, curveLastPoint.y + 10, 0),
          new Vector2(rimOutsidePosition.x, curveLastPoint.y + 10, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      // Diameter Line
      upperEdgeLine: {
        points: [
          new Vector2(rimOutsidePosition.x, curveLastPoint.y, 0),
          new Vector2(rimOutsidePosition.x + 15, curveLastPoint.y, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      bottomEdgeLine: {
        points: [
          new Vector2(rimOutsidePosition.x, -curveLastPoint.y, 0),
          new Vector2(rimOutsidePosition.x + 15, -curveLastPoint.y, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      heightLineGeometry: {
        points: [
          new Vector2(rimOutsidePosition.x + 10, curveLastPoint.y, 0),
          new Vector2(rimOutsidePosition.x + 10, -curveLastPoint.y, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      // Flat Width Line
      flatLeftEdgeLine: {
        points: [
          new Vector2(curveLastPoint.x, -curveLastPoint.y, 0),
          new Vector2(curveLastPoint.x, -curveLastPoint.y - 15, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      flatRightEdgeLine: {
        points: [
          new Vector2(rimOutsidePosition.x, -curveLastPoint.y, 0),
          new Vector2(rimOutsidePosition.x, -curveLastPoint.y - 15, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      flatWidthLine: {
        points: [
          new Vector2(curveLastPoint.x, -curveLastPoint.y - 10, 0),
          new Vector2(rimOutsidePosition.x, -curveLastPoint.y - 10, 0),
        ],
        color: WIRE_COLOR,
        lineWidth: 1,
      },
    };
  }, [
    curveFirstPoint.x,
    curveFirstPoint.y,
    curveLastPoint.x,
    curveLastPoint.y,
    rimOutsidePosition.x,
  ]);

  return (
    <>
      {Object.entries(lineProps).map(([key, { points, color, lineWidth }]) => {
        return (
          <Line key={key} points={points} color={color} lineWidth={lineWidth} />
        );
      })}
      <Text3D
        font={"/font/Roboto_Regular.json"}
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={new Vector3(curveFirstPoint.x, curveLastPoint.y + 14, 0)}
      >
        {`${(rimOutsidePosition.x - curveFirstPoint.x).toFixed(2)}mm`}
      </Text3D>

      <Text3D
        font={"/font/Roboto_Regular.json"} // TODO: フォントの指定の仕方をリファクタリングする
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={new Vector3(rimOutsidePosition.x + 15, 2, 0)}
      >
        {`${(curveLastPoint.y * 2).toFixed(2)}mm`}
      </Text3D>

      <Text3D
        font={"/font/Roboto_Regular.json"}
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={new Vector3(curveLastPoint.x, -curveLastPoint.y - 20, 0)}
      >
        {`${(rimOutsidePosition.x - curveLastPoint.x).toFixed(2)}mm`}
      </Text3D>
    </>
  );
}
