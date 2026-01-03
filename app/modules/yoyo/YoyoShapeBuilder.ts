import {
  ConnectionList,
  LineConnection,
  CubicBezierConnection,
} from "./Connection";
import { Point, PointsSnapshot } from "./Point";
import { Restraint, FollowRestraint } from "./Restraint";
import { YoyoShape } from "./YoyoShape";
import { Bearing, BearingSizeType, createBearing } from "./bearing";

type RestraintType = "FollowX" | "FollowY";

const RESTRAINT_BUILDERS: Record<
  RestraintType,
  (restrainedPointId: string, targetPointId: string) => Restraint
> = {
  FollowX: (restrainedPointId: string, targetPointId: string) =>
    new FollowRestraint(restrainedPointId, targetPointId, {
      follows: { x: true, y: false },
    }),
  FollowY: (restrainedPointId: string, targetPointId: string) =>
    new FollowRestraint(restrainedPointId, targetPointId, {
      follows: { x: false, y: true },
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
  private pathPoints: Point[];
  /**
   * 曲線の制御点
   */
  private curveControlPoints: Point[];
  /**
   * 各点間の接続
   */
  private connections: ConnectionList;
  private restraints: Restraint[] = [];

  private bearing: Bearing;

  constructor(startPoint: Point, bearingSize: BearingSizeType = "sizeC") {
    this.pathPoints = [startPoint];
    this.curveControlPoints = [];
    this.connections = new ConnectionList();
    this.bearing = createBearing(bearingSize);
  }

  public addCubicBezierCurve(
    point: Point,
    handle: { start: Point; end: Point },
    resolution?: number
  ) {
    const prevPoint = this.pathPoints.at(-1)!;
    this.pathPoints.push(point);
    this.curveControlPoints.push(handle.start, handle.end);
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
      new FollowRestraint(handle.start.id, prevPoint.id, {
        follows: { x: true, y: true },
      }),
      new FollowRestraint(handle.end.id, point.id, {
        follows: { x: true, y: true },
      })
    );

    return this;
  }

  public addLine(point: Point, restraint?: RestraintOptions) {
    const prevPoint = this.pathPoints.at(-1)!;
    this.pathPoints.push(point);
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
    const initialPoints = [...this.pathPoints, ...this.curveControlPoints];
    const initialPointsSnapshot = new PointsSnapshot(
      initialPoints,
      this.restraints
    );
    const connections = this.connections.getConnections();
    const bearing = this.bearing;

    return new YoyoShape(initialPointsSnapshot, connections, bearing);
  }
}
