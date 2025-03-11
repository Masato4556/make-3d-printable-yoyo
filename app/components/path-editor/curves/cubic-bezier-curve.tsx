/**
 * 2次ベジェ曲線を描画するコンポーネント
 */

import { KonvaEventObject } from "konva/lib/Node";
import { Circle, Line, Rect, Shape } from "react-konva";
import { YoyoCubicBezierCurve } from "~/yoyo/curves/yoyo-cubic-bezier-curve";
import { PATH_COLOR } from "~/components/path-editor/style";
import { Vector2 } from "~/math/vector2";

type Props = {
  curve: YoyoCubicBezierCurve;
};

export function CubicBezierCurve(props: Props) {
  const { curve } = props;

  return (
    <>
      <Shape
        stroke={PATH_COLOR}
        strokeWidth={0.8}
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

            curve.updateDispath(curve, curve.index);
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
            curve.updateDispath(curve, curve.index);
          },
        }}
        handle={{
          x: curve.handles.v2.x,
          y: curve.handles.v2.y,
          onDragMove: (e) => {
            curve.handles.v2 = new Vector2(e.target.x(), e.target.y());

            curve.updateDispath(curve, curve.index);
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
        stroke={PATH_COLOR}
        strokeWidth={0.4}
      />
      <Circle
        x={point.x}
        y={point.y}
        radius={1}
        stroke={PATH_COLOR}
        draggable={point.draggable}
        onDragMove={point.onDragMove}
      />
      <Rect
        x={handle.x}
        y={handle.y}
        width={0.5}
        height={0.5}
        stroke={PATH_COLOR}
        draggable
        onDragMove={handle.onDragMove}
      />
    </>
  );
}
