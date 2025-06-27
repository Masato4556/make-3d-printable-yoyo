/**
 * 2次ベジェ曲線を描画するコンポーネント
 */

import { KonvaEventObject } from "konva/lib/Node";
import { Line, Shape } from "react-konva";
import { PATH_COLOR, WIRE_COLOR } from "../../style";
import { Vector2 } from "../../../../math/vector2";
import { DraggableCircle } from "./parts/DraggableCircle";
import { CubicBezierConnection } from "../../models/Connection/CubicBezierConnection";
import { useCurveStore } from "../../../../stores/useCurveStore";
import { useEventStore } from "../../../../stores/useEventStore";


type Props = {
  connection: CubicBezierConnection;
};

export function CubicBezierConnectionComponent({
  connection,
}: Props) {
  const {getPoint, connections, setConnections} = useCurveStore()
  const { publishUpdatePathEvent } = useEventStore();
  const start = getPoint(connection.startPointId);
  const end = getPoint(connection.endPointId);
  const { control1, control2 } = connection;
  return (
    <>
      <Shape
        stroke={PATH_COLOR}
        strokeWidth={0.4}
        lineCap="round"
        sceneFunc={(ctx, shape) => {
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.bezierCurveTo(
            control1.x,
            control1.y,
            control2.x,
            control2.y,
            end.x,
            end.y
          );
          ctx.fillStrokeShape(shape);
        }}
      />
      <BezierCurvePoint
        point={{
          x: start.x,
          y: start.y,
        }}
        handle={{
          x: control1.x,
          y: control1.y,
          onDragMove: (e) => {
            const newControl1 = new Vector2(e.target.x(), e.target.y());
            const newConnections = connections.map((conn) =>
              conn.id === connection.id
                ? new CubicBezierConnection(
                    connection.startPointId,
                    connection.endPointId,
                    newControl1,
                    connection.control2,
                  )
                : conn
            );
            setConnections(newConnections);
            publishUpdatePathEvent();
          },
        }}
      />

      <BezierCurvePoint
        point={{
          x: end.x,
          y: end.y,
        }}
        handle={{
          x: control2.x,
          y: control2.y,
          onDragMove: (e) => {
            const newControl2 = new Vector2(e.target.x(), e.target.y());
            const newConnections = connections.map((conn) =>
              conn.id === connection.id
                ? new CubicBezierConnection(
                    connection.startPointId,
                    connection.endPointId,
                    connection.control1,
                    newControl2,
                  )
                : conn
            );
            setConnections(newConnections);
            publishUpdatePathEvent();
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
