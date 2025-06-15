import { Vector2 } from "../../../../math/vector2";
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
    this.points = new PointList([
      Point.fromPosition(firstBearingSeatPoint.x, firstBearingSeatPoint.y),
      Point.fromPosition(lastBearingSeatPoint.x, lastBearingSeatPoint.y),
    ]);
    this.connections = new ConnectionList();
    this.bearingSeat = bearingSeat;
  }

  public addCubicBezierCurve(
    point: Point,
    handle: { start: Vector2; end: Vector2 }
  ) {
    const prevPoint = this.points.getLast();
    if (!prevPoint) {
      throw new Error("No points available to create a curve.");
    }

    this.points = this.points.add(point);
    this.connections = this.connections.add(
      new CubicBezierConnection(
        prevPoint.id,
        point.id,
        handle.start,
        handle.end
      )
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
    return this.points.getPoints();
  }
  public getConnections() {
    return this.connections.getConnections();
  }
  public getRestraints() {
    return this.restraints;
  }
}
