/**
 * ユーザーが操作できるヨーヨーのパスを表示するコンポーネント
 */

import { Line, Group } from "react-konva";
import { ConnectionController } from "./ConnectionController";
import { useMemo } from "react";
import { Vector2 } from "../../../modules/math";
import { PATH_COLOR } from "../style";
import { useCurves } from "./useCurves";
import { Bearing } from "../../../modules/yoyo";
import { DraggableCircle } from "./DraggableCircle";
import { BearingSeat } from "./CurveComponent/BearingSeat";
import { useGeometryStore } from "../../../stores/useGeometryStore";

type Props = {
  bearing: Bearing;
  scale: number;
};

export function InteractiveCurve({ scale }: Props) {
  const { triggerUpdate } = useGeometryStore();
  const { points, connections, bearingSeat, updatePoint, path } = useCurves();

  const mirroredPathes = useMemo(() => {
    const mirroredXPath = path.map((point) => new Vector2(-point.x, point.y));
    const mirroredYPath = path.map((point) => new Vector2(point.x, -point.y));
    const mirroredXYPath = path.map((point) => new Vector2(-point.x, -point.y));
    return [mirroredXPath, mirroredYPath, mirroredXYPath];
  }, [path]);

  return (
    <Group
      scale={{ x: scale, y: -scale }}
      onDragEnd={() => {
        triggerUpdate();
      }}
    >
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
        <ConnectionController key={connection.id} connection={connection} />
      ))}

      <Line
        key={`path`}
        points={path.flatMap((point) => [point.x, point.y])}
        stroke={PATH_COLOR}
        strokeWidth={0.4}
        lineCap="round"
      />

      {/* Mirrored paths */}
      {mirroredPathes.map((mirroredPath, index) => (
        <Line
          key={`mirrored-${index}`}
          points={mirroredPath.flatMap((point) => [point.x, point.y])}
          stroke={PATH_COLOR}
          strokeWidth={0.4}
          opacity={0.5}
        />
      ))}

      <BearingSeat curve={bearingSeat} />
    </Group>
  );
}
