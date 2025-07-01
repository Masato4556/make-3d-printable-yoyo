import { create } from "zustand";
import { PointMap } from "../components/PathEditor/models/Point/PointMap";
import { Point } from "../components/PathEditor/models/Point/Point";
import { YoyoCurveBuilder } from "../components/PathEditor/CurveEditor/hooks/YoyoCurveBuilder";
import { Restraint } from "../components/PathEditor/models/Restraint/BaseRestraint";
import { Connection } from "../components/PathEditor/models/Connection/Connection";
import { CSizeBearingSeatCurve } from "../components/PathEditor/models/BearingSeat/CSizeBearingSeatCurve";
import { Vector2 } from "../math/vector2";
import { createPathFromConnections } from "../components/PathEditor/models/Connection/function/createPathFromConnections";

type CurveStore = {
  pointMap: PointMap;
  connections: Connection[];
  restraints: Restraint[];
  bearingSeat: CSizeBearingSeatCurve;
};

type CurveActions = {
  setPointMap: (pointMap: PointMap) => void;
  setConnections: (connections: Connection[]) => void;
  getPoint: (pointId: string) => Point;
  movePointWithConstraints: (
    pointId: string,
    newX: number,
    newY: number
  ) => void;
  getPath: () => Vector2[];
};

const yoyoCurveBuilder = new YoyoCurveBuilder()
  .addCubicBezierCurve(Point.fromPosition(21, 27.5, { editable: true }), {
    start: Point.fromPosition(5.25, 10.55, { editable: true }),
    end: Point.fromPosition(15.75, 27.5, { editable: true }),
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

export const useCurveStore = create<CurveStore & CurveActions>((set, get) => {
  const initialPoints = yoyoCurveBuilder.getPoints();
  const initialPointMap = new PointMap(initialPoints);

  return {
    pointMap: initialPointMap,
    connections: yoyoCurveBuilder.getConnections(),
    restraints: yoyoCurveBuilder.getRestraints(),
    bearingSeat: yoyoCurveBuilder.getBearingSeat(),
    setPointMap: (pointMap: PointMap) => set({ pointMap }),
    setConnections: (connections: Connection[]) => set({ connections }),
    getPoint: (pointId: string) => {
      const { pointMap } = get();
      const point = pointMap.get(pointId);
      if (!point) {
        throw new Error(`Point with id ${pointId} not found.`);
      }
      return point;
    },
    getPath: () => {
      const { bearingSeat, connections, getPoint } = get();
      return [
        ...bearingSeat.getPath(),
        ...createPathFromConnections(connections, getPoint),
      ];
    },
    movePointWithConstraints: (pointId: string, newX: number, newY: number) => {
      const { pointMap, restraints, connections } = get();
      const prevPoints = pointMap.clone();

      pointMap.update(pointId, newX, newY);

      restraints.forEach((restraint) => {
        restraint.apply(prevPoints, pointMap);
      });

      set({ pointMap: pointMap.clone(), connections: [...connections] });
    },
  };
});
