/**
 * ヨーヨーパスの寸法を表示するコンポーネント
 * TODO: konva移行がまだできていないので、要対応
 */

import { Text3D } from "@react-three/drei";
import { useMemo } from "react";
import { Line } from "react-konva";
import { MeshBasicMaterial, Vector2, Vector3 } from "three";
import { PATH_COLOR, WIRE_COLOR } from "~/components/path-editor/style";

const curveMaterial = new MeshBasicMaterial({ color: PATH_COLOR });

type DimesionLineProps = {
  curveFirstPoint: Vector2;
  curveLastPoint: Vector2;
  rimOutsidePosition: Vector2;
};
export function DimesionLine(props: DimesionLineProps) {
  const { curveFirstPoint, curveLastPoint, rimOutsidePosition } = props;
  const lineProps = useMemo(
    () => ({
      // Width Line
      leftEdgeLine: {
        points: {
          v0: new Vector2(curveFirstPoint.x, curveFirstPoint.y),
          v1: new Vector2(curveFirstPoint.x, curveLastPoint.y + 13),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      rightEdgeLine: {
        points: {
          v0: new Vector2(rimOutsidePosition.x, curveLastPoint.y),
          v1: new Vector2(rimOutsidePosition.x, curveLastPoint.y + 13),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      widhtLineGeometry: {
        points: {
          v0: new Vector2(curveFirstPoint.x, curveLastPoint.y + 10),
          v1: new Vector2(rimOutsidePosition.x, curveLastPoint.y + 10),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      // Diameter Line
      upperEdgeLine: {
        points: {
          v0: new Vector2(rimOutsidePosition.x, curveLastPoint.y),
          v1: new Vector2(rimOutsidePosition.x + 15, curveLastPoint.y),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      bottomEdgeLine: {
        points: {
          v0: new Vector2(rimOutsidePosition.x, -curveLastPoint.y),
          v1: new Vector2(rimOutsidePosition.x + 15, -curveLastPoint.y),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      heightLineGeometry: {
        points: {
          v0: new Vector2(rimOutsidePosition.x + 10, curveLastPoint.y),
          v1: new Vector2(rimOutsidePosition.x + 10, -curveLastPoint.y),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      // Flat Width Line
      flatLeftEdgeLine: {
        points: {
          v0: new Vector2(curveLastPoint.x, -curveLastPoint.y),
          v1: new Vector2(curveLastPoint.x, -curveLastPoint.y - 15),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      flatRightEdgeLine: {
        points: {
          v0: new Vector2(rimOutsidePosition.x, -curveLastPoint.y),
          v1: new Vector2(rimOutsidePosition.x, -curveLastPoint.y - 15),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
      flatWidthLine: {
        points: {
          v0: new Vector2(curveLastPoint.x, -curveLastPoint.y - 10),
          v1: new Vector2(rimOutsidePosition.x, -curveLastPoint.y - 10),
        },
        color: WIRE_COLOR,
        lineWidth: 1,
      },
    }),
    [
      curveFirstPoint.x,
      curveFirstPoint.y,
      curveLastPoint.x,
      curveLastPoint.y,
      rimOutsidePosition.x,
    ]
  );

  return (
    <>
      {Object.entries(lineProps).map(([key, { points, color, lineWidth }]) => (
          // <Line key={key} points={points} color={color} lineWidth={lineWidth} />
          <Line
            key={key}
            stroke={color}
            strokeWidth={lineWidth}
            lineCap="round"
            points={[points.v0.x, points.v0.y, points.v1.x, points.v1.y]}
          />
        ))}
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
