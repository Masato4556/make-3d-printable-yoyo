import {
  ConnectionList,
  LineConnection,
  CubicBezierConnection,
} from "./Connection";
import { Point, PointList, PointMap } from "./Point";
import { Restraint, FollowRestraint } from "./Restraint";
import { YoyoShape } from "./YoyoShape";
import {
  Bearing,
  BearingSizeType,
  createBearing,
} from "./bearing";

type RestraintType = "Follow" | "FollowX" | "FollowY";

const RESTRAINT_BUILDERS: Record<
  RestraintType,
  (restrainedPointId: string, targetPointId: string) => Restraint
> = {
  Follow: (restrainedPointId: string, targetPointId: string) =>
    new FollowRestraint(restrainedPointId, targetPointId),
  FollowX: (restrainedPointId: string, targetPointId: string) =>
    new FollowRestraint(restrainedPointId, targetPointId, {
      lock: { x: false, y: true },
    }),
  FollowY: (restrainedPointId: string, targetPointId: string) =>
    new FollowRestraint(restrainedPointId, targetPointId, {
      lock: { x: true, y: false },
    }),
};

type RestraintRelationship = "RestrainedBy" | "TargetedBy";

type RestraintOptions = {
  type: RestraintType;
  relationshipWithPrevPoint: RestraintRelationship;
};

export class YoyoShapeBuilder {
  /**
   * パス上の点
   */
  private pathPoints: PointList;
  /**
   * 各曲線の制御点
   */
  private curveControlPoints: PointList;
  /**
   * 各点間の接続
   */
  private connections: ConnectionList;
  private restraints: Restraint[] = [];

  private bearing: Bearing;

  constructor(bearingSize: BearingSizeType = "sizeC") {
    this.pathPoints = new PointList();
    this.curveControlPoints = new PointList();
    this.connections = new ConnectionList();
    this.bearing = createBearing(bearingSize);
  }

  public startAt(point: Point): this {
    this.pathPoints = this.pathPoints.add(point);
    return this;
  }

  public addCubicBezierCurve(
    point: Point,
    handle: { start: Point; end: Point },
    resolution?: number
  ) {
    const prevPoint = this.pathPoints.getLast();
    if (!prevPoint) {
      throw new Error("No points available to create a curve.");
    }

    this.pathPoints = this.pathPoints.add(point);
    this.curveControlPoints = this.curveControlPoints.add(handle.start).add(handle.end);
    this.connections = this.connections.add(
      new CubicBezierConnection({
        startPointId: prevPoint.id,
        endPointId: point.id,
        control1Id: handle.start.id,
        control2Id: handle.end.id,
        resolution,
      })
    );

    // Add restraints for control points
    this.restraints.push(
      new FollowRestraint(handle.start.id, prevPoint.id),
      new FollowRestraint(handle.end.id, point.id)
    );

    return this;
  }

  public addLine(point: Point, restraint?: RestraintOptions) {
    const prevPoint = this.pathPoints.getLast();
    if (!prevPoint) {
      throw new Error(
        "No previous point available to create a horizontal line."
      );
    }
    this.pathPoints = this.pathPoints.add(point);
    this.connections = this.connections.add(
      new LineConnection(prevPoint.id, point.id)
    );

    if (restraint !== undefined) {
      const builder = RESTRAINT_BUILDERS[restraint.type];
      this.restraints.push(
        restraint.relationshipWithPrevPoint === "TargetedBy"
          ? builder(prevPoint.id, point.id)
          : builder(point.id, prevPoint.id)
      );
    }
    return this;
  }

  public build(): YoyoShape {
    const initialPoints = [...this.pathPoints.getPoints(), ...this.curveControlPoints.getPoints()];
    const initialPointMap = new PointMap(initialPoints);
    const connections = this.connections.getConnections();
    const restraints = this.restraints;
    const bearing = this.bearing;

    return new YoyoShape(initialPointMap, connections, restraints, bearing);
  } 
}
