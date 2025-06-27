import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PointMap } from "../components/PathEditor/models/Point/PointMap";
import { Point } from "../components/PathEditor/models/Point/Point";
import { YoyoCurveBuilder } from "../components/PathEditor/CurveEditor/hooks/YoyoCurveBuilder";
import { Restraint } from "../components/PathEditor/models/Restraint/BaseRestraint";
import { Connection } from "../components/PathEditor/models/Connection/Connection";
import { CSizeBearingSeatCurve } from "../components/PathEditor/models/BearingSeat/CSizeBearingSeatCurve";
import { Vector2 } from "../math/vector2";
import { getCubicBezierCurve } from "../components/PathEditor/models/getCubicBezierCurve";

type CurveStore = {
  pointMap: PointMap;
  connections: Connection[];
  restraints: Restraint[];
  bearingSeat: CSizeBearingSeatCurve;
  setPointMap: (pointMap: PointMap) => void;
  setConnections: (connections: Connection[]) => void;
  getPoint: (pointId: string) => Point;
  getPath: () => Vector2[];
};

const yoyoCurveBuilder = new YoyoCurveBuilder()
  .addCubicBezierCurve(Point.fromPosition(21, 27.5, { editable: true }), {
    start: new Vector2(5.25, 10.55),
    end: new Vector2(15.75, 27.5),
  })
  // Horizontal line to the right
  .addLine(Point.fromPosition(28, 27.5), {
    type: "FollowY",
    relationshipWithPrevPoint: "RestrainedBy",
  })
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

export const useCurveStore = create(
  immer<CurveStore>((set, get) => ({
    pointMap: new PointMap(yoyoCurveBuilder.getPoints()),
    connections: yoyoCurveBuilder.getConnections(),
    restraints: yoyoCurveBuilder.getRestraints(),
    bearingSeat: yoyoCurveBuilder.getBearingSeat(),
    setPointMap: (pointMap: PointMap) => set({ pointMap }),
    setConnections: (connections: Connection[]) => set({ connections }),
    getPoint: (pointId: string) => {
      const { pointMap } = get();
      return pointMap.get(pointId);
    },
    getPath: () => {
      const { bearingSeat, connections, getPoint } = get();
      return [
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
        }),
      ];
    },
  }))
);
