import { Vector2 } from "../../../../math/vector2";
import { CSizeBearingSeatCurve } from "../../models/BearingSeat/CSizeBearingSeatCurve";

import { ConnectionList } from "../../models/Connection/ConnectionList";
import { CubicBezierConnection } from "../../models/Connection/CubicBezierConnection";
import { LineConnection } from "../../models/Connection/LineConnection";
import { Point } from "../../models/Point/Point";
import { PointList } from "../../models/Point/PointList";
import { FollowRestraint } from "../../models/Restraint/FollowRestraint";
import { Restraint } from "../../models/Restraint/Restraint";

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

  public addLine(point: Point, restraintType?: RestraintType) {
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

    if (restraintType) {
      this.restraints.push(
        RESTRAINT_MAP[restraintType](prevPoint.id, point.id)
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

const RESTRAINT_MAP = {
  Follow: (prevPointId: string, nextPointId: string) =>
    new FollowRestraint(prevPointId, nextPointId),
  FollowX: (prevPointId: string, nextPointId: string) =>
    new FollowRestraint(prevPointId, nextPointId, {
      lock: { x: false, y: true },
    }),
  FollowY: (prevPointId: string, nextPointId: string) =>
    new FollowRestraint(prevPointId, nextPointId, {
      lock: { x: true, y: false },
    }),
};
type RestraintType = keyof typeof RESTRAINT_MAP;
