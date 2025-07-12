import { getCubicBezierCurve } from "../../../../../functions/getCubicBezierCurve";
import { Vector2 } from "../../../../../math/vector2";
import { Point } from "../../Point/Point";
import { Connection } from "../Connection";

export const createPathFromConnections = (
  connections: Connection[],
  getPoint: (id: string) => Point
): Vector2[] =>
  connections.flatMap((connection) => {
    const start = getPoint(connection.startPointId);
    const end = getPoint(connection.endPointId);
    if (connection.__brand === "CubicBezierConnection") {
      const control1 = getPoint(connection.control1Id);
      const control2 = getPoint(connection.control2Id);
      return getCubicBezierCurve(
        {
          v0: start,
          v1: control1,
          v2: control2,
          v3: end,
        },
        100
      );
    }
    if (connection.__brand === "LineConnection") {
      return [new Vector2(start.x, start.y), new Vector2(end.x, end.y)];
    }
    return [];
  });
