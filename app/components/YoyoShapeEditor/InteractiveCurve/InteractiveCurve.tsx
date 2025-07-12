/**
 * ユーザーが操作できるヨーヨーのパスを表示するコンポーネント
 */

import { Line, Group } from "react-konva";
import { ConnectionComponentFactory } from "./CurveComponentFactory";
import { useMemo } from "react";
import { Vector2 } from "../../../math/vector2";
import { PATH_COLOR } from "../style";
import { useCurves } from "./hooks/useCurves";
import { Bearing } from "../../../yoyo/bearing";
import { DraggableCircle } from "./CurveComponent/parts/DraggableCircle";
import { CSizeBearingSeat } from "./CurveComponent/CSizeBearingSeat";

type Props = {
  bearing: Bearing;
  scale: number;
};

export function InteractiveCurve({ scale }: Props) {
  const {
    points,
    connections,
    bearingSeat,
    updatePoint,
    path,
  } = useCurves();

  const mirroredPathes = useMemo(() => {
    const mirroredXPath = path.map((point) => new Vector2(-point.x, point.y));
    const mirroredYPath = path.map((point) => new Vector2(point.x, -point.y));
    const mirroredXYPath = path.map((point) => new Vector2(-point.x, -point.y));
    return [mirroredXPath, mirroredYPath, mirroredXYPath];
  }, [path]);

  return (
    <Group scale={{ x: scale, y: -scale }}>
      {points.map((point) => {
        if (!point.option?.editable) {
          return null;
        }
        return (
          <DraggableCircle
            key={point.id}
            x={point.x}
            y={point.y}
            radius={2}
            color={PATH_COLOR}
            onDragMove={(e) => {
              if (point.option?.fixed?.x) {
                e.target.x(point.x);
              }
              if (point.option?.fixed?.y) {
                e.target.y(point.y);
              }
              updatePoint(point.id, e.target.x(), e.target.y());
            }}
          />
        );
      })}
      {[...connections.values()].map((connection) => (
        <ConnectionComponentFactory
          key={connection.id}
          connection={connection}
        />
      ))}
      {mirroredPathes.map((mirroredPath, index) => (
        <Line
          key={`mirrored-${index}`}
          points={mirroredPath.flatMap((point) => [point.x, point.y])}
          stroke={PATH_COLOR}
          strokeWidth={0.4}
          opacity={0.5}
        />
      ))}

      <CSizeBearingSeat curve={bearingSeat} />
    </Group>
  );
}
