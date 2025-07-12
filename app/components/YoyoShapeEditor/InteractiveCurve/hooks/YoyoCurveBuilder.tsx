import { CSizeBearingSeatCurve } from "../../models/BearingSeat/CSizeBearingSeatCurve";

import { ConnectionList } from "../../models/Connection/ConnectionList";
import { CubicBezierConnection } from "../../models/Connection/CubicBezierConnection";
import { LineConnection } from "../../models/Connection/LineConnection";
import { Point } from "../../models/Point/Point";
import { PointList } from "../../models/Point/PointList";
import { Restraint } from "../../models/Restraint/BaseRestraint";
import { FollowRestraint } from "../../models/Restraint/FollowRestraint";

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

export class YoyoCurveBuilder {
  private points: PointList;
  private controlPoints: PointList;
  private connections: ConnectionList;
  private bearingSeat: CSizeBearingSeatCurve;
  private restraints: Restraint[] = [];

  constructor() {
    const bearingSeat = new CSizeBearingSeatCurve();
    const bearingSeatPath = bearingSeat.getPath();
    const firstBearingSeatPoint = bearingSeatPath[0];
    const lastBearingSeatPoint = bearingSeatPath[bearingSeatPath.length - 1];
    if (!firstBearingSeatPoint || !lastBearingSeatPoint) {
      throw new Error("Invalid bearing seat path.");
    }
    const firstPoint = Point.fromPosition(
      firstBearingSeatPoint.x,
      firstBearingSeatPoint.y
    );
    const lastPoint = Point.fromPosition(
      lastBearingSeatPoint.x,
      lastBearingSeatPoint.y
    );
    this.points = new PointList([firstPoint, lastPoint]);
    this.controlPoints = new PointList();
    this.connections = new ConnectionList();
    this.bearingSeat = bearingSeat;
  }

  public addCubicBezierCurve(
    point: Point,
    handle: { start: Point; end: Point }
  ) {
    const prevPoint = this.points.getLast();
    if (!prevPoint) {
      throw new Error("No points available to create a curve.");
    }

    this.points = this.points.add(point);
    this.controlPoints = this.controlPoints.add(handle.start).add(handle.end);
    this.connections = this.connections.add(
      new CubicBezierConnection({
        startPointId: prevPoint.id,
        endPointId: point.id,
        control1Id: handle.start.id,
        control2Id: handle.end.id,
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
    const prevPoint = this.points.getLast();
    if (!prevPoint) {
      throw new Error(
        "No previous point available to create a horizontal line."
      );
    }
    this.points = this.points.add(point);
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

  public getBearingSeat() {
    return this.bearingSeat;
  }
  public getPoints() {
    return [...this.points.getPoints(), ...this.controlPoints.getPoints()];
  }
  public getConnections() {
    return this.connections.getConnections();
  }
  public getRestraints() {
    return this.restraints;
  }
}
