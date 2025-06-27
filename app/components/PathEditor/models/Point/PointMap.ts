import { Point } from "./Point";

export class PointMap {
  private points: Map<string, Point> = new Map();

  constructor(initialPoints: Point[] = []) {
    initialPoints.forEach((point) => this.points.set(point.id, point));
  }

  public set(point: Point): void {
    this.points.set(point.id, point);
  }

  public get(id: string): Point | undefined {
    return this.points.get(id);
  }

  public has(id: string): boolean {
    return this.points.has(id);
  }

  public delete(id: string): boolean {
    return this.points.delete(id);
  }

  public clone(): PointMap {
    return new PointMap(
      [...this.points.values()].map((point) => point.clone())
    );
  }

  public entries(): IterableIterator<[string, Point]> {
    return this.points.entries();
  }

  public values(): IterableIterator<Point> {
    return this.points.values();
  }

  public keys(): IterableIterator<string> {
    return this.points.keys();
  }

  public get size(): number {
    return this.points.size;
  }
}
