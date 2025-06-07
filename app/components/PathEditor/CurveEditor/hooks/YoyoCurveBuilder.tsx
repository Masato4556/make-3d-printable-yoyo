import { Vector2 } from "../../../../math/vector2";
import { CSizeBearingSeatCurve } from "../../models/BearingSeat/CSizeBearingSeatCurve";

import { ConnectionList } from "../../models/Connection/ConnectionList";
import { CubicBezierConnection } from "../../models/Connection/CubicBezierConnection";
import { LineConnection } from "../../models/Connection/LineConnection";
import { Point } from "../../models/Point/Point";
import { PointList } from "../../models/Point/PointList";
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
      new Point(firstBearingSeatPoint.x, firstBearingSeatPoint.y),
      new Point(lastBearingSeatPoint.x, lastBearingSeatPoint.y),
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

  public addLine(point: Point) {
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
}
