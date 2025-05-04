/**
 * 2次ベジェ曲線を描画するコンポーネント
 */

import { KonvaEventObject } from "konva/lib/Node";
import { Circle } from "react-konva";

type Props = {
  x: number;
  y: number;
  radius: number;
  color: string;
  draggable?: boolean;
  onDragMove?: (e: KonvaEventObject<DragEvent>) => void;
};

export function DraggableCircle({
  x,
  y,
  radius,
  color,
  draggable = false,
  onDragMove,
}: Props) {
  if (!draggable) {
    // ドラッグ可能でない場合は、円を描画しない
    return;
  }

  return (
    <Circle
      x={x}
      y={y}
      radius={radius}
      stroke={color}
      strokeWidth={0.3}
      opacity={0.5}
      draggable={draggable}
      onDragMove={onDragMove}
    />
  );
}
