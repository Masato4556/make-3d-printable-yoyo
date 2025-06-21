import { useCallback, useMemo, useState } from "react";
import { Vector2 } from "../../../../math/vector2";
import { Point } from "../../models/Point/Point";
import { Connection } from "../../models/Connection/Connection";
import { YoyoCurveBuilder } from "./YoyoCurveBuilder";
import { getCubicBezierCurve } from "../../models/getCubicBezierCurve";
import { PointMap } from "../../models/Point/PointMap";
import { Restraint } from "../../models/Restraint/BaseRestraint";
import { useEventStore } from "../../../../stores/useEventStore";

export const useCurves = () => {
  const yoyoCurveBuilder = useMemo(() => generateYoyoCurveBuilder(), []);

  const [curveData, setCurveData] = useState<{
    points: PointMap;
    connections: Connection[];
  }>({
    points: new PointMap(yoyoCurveBuilder.getPoints()),
    connections: yoyoCurveBuilder.getConnections(),
  });
  const [prevPoints, setPrevPoints] = useState(curveData.points.clone());
  const [restraints, setRestraints] = useState<Restraint[]>(
    yoyoCurveBuilder.getRestraints()
  );

  const getPoint = useCallback(
    (pointId: string): Point | undefined => curveData.points.get(pointId),
    [curveData.points]
  );

  // pointの更新をconnectionに伝えて再レンダリングを促す関数dd
  const { publishUpdatePathEvent } = useEventStore();
  const refreshConnections = useCallback(() => {
    restraints.forEach((restraint) => {
      restraint.apply(prevPoints, curveData.points);
    });
    setCurveData({
      points: curveData.points.clone(),
      connections: [...curveData.connections],
    });
    setPrevPoints(curveData.points.clone());
    publishUpdatePathEvent();
  }, [curveData.connections, curveData.points, prevPoints, publishUpdatePathEvent, restraints]);

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

  const path = useMemo(
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
    getConnectionPoints,
    refreshConnections,
    bearingSeat: yoyoCurveBuilder.getBearingSeat(),
    path,
  };
};

const generateYoyoCurveBuilder = () =>
  new YoyoCurveBuilder()
    .addCubicBezierCurve(Point.fromPosition(21, 27.5, { editable: true }), {
      start: Point.fromPosition(5.25, 10.55, { editable: true }),
      end: Point.fromPosition(15.75, 27.5, { editable: true }),
    })
    // Horizontal line to the right
    .addLine(Point.fromPosition(28, 27.5), { type: "FollowY", relationshipWithPrevPoint: "RestrainedBy" })
    // Vertical line down
    .addLine(
      Point.fromPosition(28, 10, {
        editable: true,
      }),
      { type: "FollowX", relationshipWithPrevPoint: "TargetedBy" }
    )
    // Diagonal line to the left
    .addLine(Point.fromPosition(20, 2, { editable: true, fixed: { y: true } }))
    // Horizontal line to the left
    .addLine(Point.fromPosition(8, 2))
    // Vertical line down
    .addLine(Point.fromPosition(8, 0));
