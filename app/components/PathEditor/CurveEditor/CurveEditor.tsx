/**
 * ユーザーが操作できるヨーヨーのパスを表示するコンポーネント
 */

import { Line, Group } from "react-konva";
import { ConnectionComponentFactory } from "./CurveComponentFactory";
import { useMemo } from "react";
import { Vector2 } from "../../../math/vector2";
import { PATH_COLOR } from "../style";
import { useCurves } from "./hooks/useCurves";
import { useUpdateCurvesStore } from "./hooks/useUpdateCurvesStore";
import { Bearing } from "../../../yoyo/bearing";
import { DraggableCircle } from "./CurveComponent/parts/DraggableCircle";
import { CSizeBearingSeat } from "./CurveComponent/CSizeBearingSeat";

type Props = {
  bearing: Bearing;
  scale: number;
};

export function CurveEditor({ scale }: Props) {
  const {
    points,
    connections,
    bearingSeat,
    refreshConnections,
    path,
  } = useCurves();
  useUpdateCurvesStore(path);

  const mirroredPathes = useMemo(() => {
    const mirroredXPath = path.map((point) => new Vector2(-point.x, point.y));
    const mirroredYPath = path.map((point) => new Vector2(point.x, -point.y));
    const mirroredXYPath = path.map((point) => new Vector2(-point.x, -point.y));
    return [mirroredXPath, mirroredYPath, mirroredXYPath];
  }, [path]);

  return (
    <Group scale={{ x: scale, y: -scale }}>
      {[...points.entries()].map(([id, point]) => {
        if (!point.option?.editable) {
          return null;
        }
        return (
          <DraggableCircle
            key={id}
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
              point.x = e.target.x();
              point.y = e.target.y();
              refreshConnections();
            }}
          />
        );
      })}
      {[...connections.values()].map((connection) => (
        <ConnectionComponentFactory
          key={connection.id}
          connection={connection}
          refreshConnections={refreshConnections}
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
