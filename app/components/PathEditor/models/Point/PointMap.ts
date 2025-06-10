import { Point } from "./Point";

export class PointMap {
  private points: Map<string, Point> = new Map();

  constructor(initialPoints: Point[] = []) {
    initialPoints.forEach((point) => this.points.set(point.id, point));
  }

  public get(id: string): Point {
    if (!this.points.has(id)) {
      throw new Error(`Point with id ${id} does not exist.`);
    }
    return this.points.get(id)!;
  }

  public clone() {
    return new PointMap(
      [...this.points.values()].map((point) => point.clone())
    );
  }

  public entries() {
    return this.points.entries();
  }
}
