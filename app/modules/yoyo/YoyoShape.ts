import { Vector2 } from "../math";
import { Connection, createPathFromConnections } from "./Connection";
import { Point, PointsSnapshot } from "./Point";
import { Bearing } from "./bearing";

/**
 * yoyoの形状クラス
 * @property {PointsSnapshot} points - 各点の位置を管理するスナップショット
 * @property {Connection[]} connections - 各点間の接続を管理するリスト
 * @property {Bearing} bearing - yoyoのベアリング情報
 * 
 * @description x軸：回転軸方向、y軸：回転軸に垂直な方向
 * @todo YoyoShapeがベアリングの情報を持たずに済むようにリファクタリングする 
 */
export class YoyoShape {
  private _path: Vector2[] | null = null;

  constructor(
    private readonly points: PointsSnapshot,
    private readonly connections: Connection[],
    private readonly bearing: Bearing
  ) { }

  getPoints(): Point[] {
    return [...this.points.values()];
  }

  getPoint(pointId: string): Point {
    const point = this.points.get(pointId);
    if (!point) {
      throw new Error(`Point with id ${pointId} not found.`);
    }
    return point;
  }

  getConnections(): Connection[] {
    return [...this.connections];
  }

  getBearing(): Bearing {
    return this.bearing;
  }

  getPath(): Vector2[] {
    if (!this._path) {
      this._path = createPathFromConnections(
        this.connections,
        this.getPoint.bind(this)
      );
    }
    return this._path;
  }

  movePoint(pointId: string, newX: number, newY: number): YoyoShape {
    const nextPoints = this.points.movePoint(pointId, newX, newY);

    return new YoyoShape(
      nextPoints,
      [...this.connections],
      this.bearing
    );
  }
}
