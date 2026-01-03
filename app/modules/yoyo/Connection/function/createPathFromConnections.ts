import { getCubicBezierCurve } from "../../../../functions/getCubicBezierCurve";
import { Vector2 } from "../../../math";
import { Point } from "../../Point";
import { Connection } from "../Connection";
import { generateConnectionsWithEffects } from "./generateConnectionsWithEffects";

export const createPathFromConnections = (
  connections: Connection[],
  getOriginalPoint: (id: string) => Point
): Vector2[] => {
  const { processedConnections, generatedPoints } =
    generateConnectionsWithEffects(connections, getOriginalPoint);

  const getPoint = (id: string): Point =>
    generatedPoints.get(id) || getOriginalPoint(id);

  return processedConnections.flatMap((connection) => {
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
        connection.resolution ?? 100
      );
    }
    if (connection.__brand === "LineConnection") {
      return [new Vector2(start.x, start.y), new Vector2(end.x, end.y)];
    }
    return [];
  });
};
