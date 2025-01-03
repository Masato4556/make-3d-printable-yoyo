import { KonvaEventObject } from "konva/lib/Node";
import { Circle, Line, Rect, Shape } from "react-konva";
import { YoyoCubicBezierCurve } from "~/contexts/curves/Curve/YoyoCubicBezierCurve";
import { PATH_COLOR } from "~/styles/const";

type Props = {
  curve: YoyoCubicBezierCurve;
};

const POINT_NUM = 64;

export function CubicBezierCurve(props: Props) {
  console.log("render CubicBezierCurve");
  const { curve } = props;

  return (
    <>
      <Shape
        stroke={PATH_COLOR}
        strokeWidth={0.8}
        lineCap="round"
        sceneFunc={(ctx, shape) => {
          ctx.beginPath();
          ctx.moveTo(curve.curve.v0.x, curve.curve.v0.y);
          ctx.bezierCurveTo(
            curve.curve.v1.x,
            curve.curve.v1.y,
            curve.curve.v2.x,
            curve.curve.v2.y,
            curve.curve.v3.x,
            curve.curve.v3.y
          );
          ctx.fillStrokeShape(shape);
        }}
      />
      <BezierCurvePoint
        point={{
          x: curve.curve.v0.x,
          y: curve.curve.v0.y,
          onDragMove: () => {},
        }}
        handle={{
          x: curve.curve.v1.x,
          y: curve.curve.v1.y,
          onDragMove: (e) => {
            curve.curve.v1.setX(e.target.x());
            curve.curve.v1.setY(e.target.y());

            curve.updateDispath(curve, curve.index);
          },
        }}
      />

      <BezierCurvePoint
        point={{
          x: curve.curve.v3.x,
          y: curve.curve.v3.y,
          draggable: true,
          onDragMove: (e) => {
            const moveX = e.target.x() - curve.curve.v3.x;
            const moveY = e.target.y() - curve.curve.v3.y;
            curve.curve.v3.setX(e.target.x());
            curve.curve.v3.setY(e.target.y());
            curve.curve.v2.add({ x: moveX, y: moveY });

            curve.updateDispath(curve, curve.index);
          },
        }}
        handle={{
          x: curve.curve.v2.x,
          y: curve.curve.v2.y,
          onDragMove: (e) => {
            curve.curve.v2.setX(e.target.x());
            curve.curve.v2.setY(e.target.y());

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
      <Line
        points={[point.x, point.y, handle.x, handle.y]}
        stroke={PATH_COLOR}
        strokeWidth={0.4}
      />
    </>
  );
}
