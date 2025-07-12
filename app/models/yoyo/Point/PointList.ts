import { Point } from "./Point";

export class PointList {
  private points: Point[] = [];
  constructor(initialPoints: Point[] = []) {
    this.points = initialPoints;
  }
  public add(point: Point) {
    return new PointList([...this.points, point]);
  }
  public getLast(): Point | undefined {
    return this.points.length > 0
      ? this.points[this.points.length - 1]
      : undefined;
  }
  public getPoints(): Point[] {
    return this.points;
  }
}
