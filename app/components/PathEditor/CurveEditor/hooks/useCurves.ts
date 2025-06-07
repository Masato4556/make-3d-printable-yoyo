import { useCallback, useMemo, useState } from "react";
import { Vector2 } from "../../../../math/vector2";
import { Point } from "../../models/Point/Point";
import { Connection } from "../../models/Connection/Connection";
import { YoyoCurveBuilder } from "./YoyoCurveBuilder";
import { getCubicBezierCurve } from "../../models/getCubicBezierCurve";
import { FollowRestraint } from "../../models/Restraint/FollowRestraint";

export const useCurves = () => {
  const yoyoCurveBuilder = useMemo(() => generateYoyoCurveBuilder(), []);

  const [curveData, setCurveData] = useState<{
    points: Map<string, Point>;
    connections: Connection[];
  }>({
    points: yoyoCurveBuilder.getPoints().reduce((acc, point) => {
      acc.set(point.id, point);
      return acc;
    }, new Map<string, Point>()),
    connections: yoyoCurveBuilder.getConnections(),
  });

  const [prevCurveData, setPrevCurveData] = useState(curveData);

  const getPoint = useCallback(
    (pointId: string): Point | undefined => curveData.points.get(pointId),
    [curveData.points]
  );

  // pointの更新をconnectionに伝えて再レンダリングを促す関数
  const refreshConnections = useCallback(() => {
    setCurveData((prevData) => ({
      ...prevData,
      connections: [...curveData.connections],
    }));
    setPrevCurveData(curveData);
  }, [curveData.connections]);

  const getConnectionPoints = useCallback(
    (connection: Connection) => {
      const startPoint = getPoint(connection.startPointId);
      const endPoint = getPoint(connection.endPointId);
      if (!startPoint || !endPoint) {
        throw new Error("Connection points not found");
      }
      return { start: startPoint, end: endPoint };
    },
    [getPoint]
  );

  const getPath = useCallback(
    () => [
      ...yoyoCurveBuilder.getBearingSeat().getPath(),
      ...curveData.connections.flatMap((connection) => {
        const { start, end } = getConnectionPoints(connection);
        if (connection.__brand === "CubicBezierConnection") {
          return getCubicBezierCurve(
            {
              v0: start,
              v1: connection.control1,
              v2: connection.control2,
              v3: end,
            },
            100
          );
        }
        if (connection.__brand === "LineConnection") {
          return [new Vector2(start.x, start.y), new Vector2(end.x, end.y)];
        }
        return [];
      }, []),
    ],
    [curveData.connections, getConnectionPoints, yoyoCurveBuilder]
  );

  return {
    points: curveData.points,
    connections: curveData.connections,
    getPoint,
    getConnectionPoints,
    setCurveData,
    refreshConnections,
    bearingSeat: yoyoCurveBuilder.getBearingSeat(),
    getPath,
  };
};

const generateYoyoCurveBuilder = () =>
  new YoyoCurveBuilder()
    .addCubicBezierCurve(new Point(21, 27.5, { editable: true }), {
      start: new Vector2(5.25, 10.55),
      end: new Vector2(15.75, 27.5),
    })
    // Horizontal line to the right
    .addLine(new Point(28, 27.5))
    // Vertical line down
    .addLine(
      new Point(28, 10, {
        editable: true,
      })
    )
    // Diagonal line to the left
    .addLine(new Point(20, 2, { editable: true }))
    // Horizontal line to the left
    .addLine(new Point(8, 2))
    // Vertical line down
    .addLine(new Point(8, 0));
