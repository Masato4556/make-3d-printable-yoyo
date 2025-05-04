/**
 * 2次ベジェ曲線を描画するコンポーネント
 */

import { KonvaEventObject } from "konva/lib/Node";
import { Line, Shape } from "react-konva";
import { YoyoCubicBezierCurve } from "../../../../yoyo/curves/YoyoCubicBezierCurve";
import { PATH_COLOR, WIRE_COLOR } from "../../style";
import { Vector2 } from "../../../../math/vector2";
import { UpdateCurve } from "../CurveComponentFactory";
import { DraggableCircle } from "./parts/DraggableCircle";

type Props = {
  curve: YoyoCubicBezierCurve;
  update: UpdateCurve;
};

export function CubicBezierCurve({ curve, update }: Props) {
  return (
    <>
      <Shape
        stroke={PATH_COLOR}
        strokeWidth={0.4}
        lineCap="round"
        sceneFunc={(ctx, shape) => {
          ctx.beginPath();
          ctx.moveTo(curve.handles.v0.x, curve.handles.v0.y);
          ctx.bezierCurveTo(
            curve.handles.v1.x,
            curve.handles.v1.y,
            curve.handles.v2.x,
            curve.handles.v2.y,
            curve.handles.v3.x,
            curve.handles.v3.y
          );
          ctx.fillStrokeShape(shape);
        }}
      />
      <BezierCurvePoint
        point={{
          x: curve.handles.v0.x,
          y: curve.handles.v0.y,
          onDragMove: () => {},
        }}
        handle={{
          x: curve.handles.v1.x,
          y: curve.handles.v1.y,
          onDragMove: (e) => {
            curve.handles.v1 = new Vector2(e.target.x(), e.target.y());

            update(curve);
          },
        }}
      />

      <BezierCurvePoint
        point={{
          x: curve.handles.v3.x,
          y: curve.handles.v3.y,
          draggable: true,
          onDragMove: (e) => {
            const currentV3 = new Vector2(e.target.x(), e.target.y());
            const moveVector = currentV3.sub(curve.handles.v3);

            curve.handles.v3 = currentV3;
            curve.handles.v2 = curve.handles.v2.add(moveVector);
            update(curve);
          },
        }}
        handle={{
          x: curve.handles.v2.x,
          y: curve.handles.v2.y,
          onDragMove: (e) => {
            curve.handles.v2 = new Vector2(e.target.x(), e.target.y());

            update(curve);
          },
        }}
      />
    </>
  );
}

type BezierCurvePointProps = {
  point: {
    x: number;
    y: number;
    onDragMove: (e: KonvaEventObject<DragEvent>) => void;
    draggable?: boolean;
  };
  handle: {
    x: number;
    y: number;
    onDragMove: (e: KonvaEventObject<DragEvent>) => void;
  };
};
function BezierCurvePoint({ point, handle }: BezierCurvePointProps) {
  return (
    <>
      <Line
        points={[point.x, point.y, handle.x, handle.y]}
        stroke={WIRE_COLOR}
        strokeWidth={0.4}
        opacity={0.5}
        lineJoin="round"
      />
      <DraggableCircle
        x={point.x}
        y={point.y}
        radius={2}
        draggable={point.draggable}
        onDragMove={point.onDragMove}
        color={PATH_COLOR}
      />
      <DraggableCircle
        x={handle.x}
        y={handle.y}
        radius={1}
        draggable
        onDragMove={handle.onDragMove}
        color={PATH_COLOR}
      />
    </>
  );
}
