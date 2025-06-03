import { Vector2 } from "../../../math/vector2";
import { CSizeBearingSeatCurve } from "./BearingSeat/CSizeBearingSeatCurve";
import { YoyoCubicBezierCurve } from "./YoyoCubicBezierCurve";
import { YoyoCurve } from "./YoyoCurve";
import { YoyoDiagonalLine } from "./YoyoDiagonalLine";
import { YoyoHorizontalLine } from "./YoyoHorizontalLine";
import { YoyoVerticalLine } from "./YoyoVerticalLine";

export class YoyoCurveBuilder {
  private points: Vector2[];
  private curves: YoyoCurve[] = [];

  constructor() {
    const bearingSeat = new CSizeBearingSeatCurve();
    const bearingSeatPath = bearingSeat.getPath();
    const firstBearingSeatPoint = bearingSeatPath[0];
    const lastBearingSeatPoint = bearingSeatPath[bearingSeatPath.length - 1];
    if (!firstBearingSeatPoint || !lastBearingSeatPoint) {
      throw new Error("Invalid bearing seat path.");
    }
    this.points = [firstBearingSeatPoint, lastBearingSeatPoint];
    this.curves.push(bearingSeat);
  }

  public addCubicBezierCurve(
    point: Vector2,
    handle: { start: Vector2; end: Vector2 },
    options: { fixedEdge?: "start" | "end" } = {}
  ) {
    const prevPoint = this.points[this.points.length - 1];
    if (!prevPoint) {
      throw new Error("No points available to create a curve.");
    }

    this.points.push(point);
    this.curves.push(
      new YoyoCubicBezierCurve(
        {
          v0: prevPoint,
          v1: handle.start,
          v2: handle.end,
          v3: point,
        },
        options
      )
    );
    return this;
  }

  public addHorizontalLine(point: Vector2) {
    if (this.points.length === 0) {
      throw new Error("No points available to create a horizontal line.");
    }
    const prevPoint = this.points[this.points.length - 1];
    if (!prevPoint) {
      throw new Error(
        "No previous point available to create a horizontal line."
      );
    }
    if (prevPoint.y !== point.y) {
      throw new Error(
        "The y-coordinate of the horizontal line must match the previous point."
      );
    }
    this.points.push(point);
    this.curves.push(new YoyoHorizontalLine(prevPoint, point));
    return this;
  }

  public addVerticalLine(
    point: Vector2,
    options: {
      editableEndPoint?: boolean;
    } = {}
  ) {
    if (this.points.length === 0) {
      throw new Error("No points available to create a vertical line.");
    }
    const prevPoint = this.points[this.points.length - 1];
    if (!prevPoint) {
      throw new Error("No previous point available to create a vertical line.");
    }
    if (prevPoint.x !== point.x) {
      throw new Error(
        "The x-coordinate of the vertical line must match the previous point."
      );
    }
    this.points.push(point);
    this.curves.push(new YoyoVerticalLine(prevPoint, point, options));
    return this;
  }

  public addDiagonalLine(
    endPoint: Vector2,
    options: { editableLastPoint?: boolean } = {}
  ) {
    if (this.points.length === 0) {
      throw new Error("No points available to create a diagonal line.");
    }
    const prevPoint = this.points[this.points.length - 1];
    if (!prevPoint) {
      throw new Error("No previous point available to create a diagonal line.");
    }
    this.points.push(endPoint);
    this.curves.push(new YoyoDiagonalLine(prevPoint, endPoint, options));
    return this;
  }

  public build(): YoyoCurve[] {
    return this.curves;
  }
}
