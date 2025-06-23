import { useCallback, useMemo, useState } from "react";
import { Vector2 } from "../../../../math/vector2";
import { getCubicBezierCurve } from "../../models/getCubicBezierCurve";
import { useEventStore } from "../../../../stores/useEventStore";
import { useYoyoCurveStore } from "../../../../stores/useYoyoCurveStore";

export const useCurves = () => {
  const {
    pointMap,
    setPointMap,
    getPoint,
    restraints,
    connections,
    setConnections,
    bearingSeat,
  } = useYoyoCurveStore();

  const [prevPoints, setPrevPoints] = useState(pointMap.clone());

  // pointの更新をconnectionに伝えて再レンダリングを促す関数dd
  const { publishUpdatePathEvent } = useEventStore();
  const refreshConnections = useCallback(() => {
    restraints.forEach((restraint) => {
      restraint.apply(prevPoints, pointMap);
    });
    setPointMap(pointMap.clone());
    setConnections([...connections]);
    setPrevPoints(pointMap.clone());
    publishUpdatePathEvent();
  }, [
    connections,
    pointMap,
    prevPoints,
    publishUpdatePathEvent,
    restraints,
    setConnections,
    setPointMap,
  ]);

  const path = useMemo(
    () => [
      ...bearingSeat.getPath(),
      ...connections.flatMap((connection) => {
        const start = getPoint(connection.startPointId);
        const end = getPoint(connection.endPointId);
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
    [bearingSeat, connections, getPoint]
  );

  return {
    points: pointMap,
    connections,
    refreshConnections,
    bearingSeat,
    path,
  };
};
