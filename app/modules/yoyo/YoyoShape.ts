import { Vector2 } from "../math";
import { Connection, createPathFromConnections } from "./Connection";
import { Restraint } from "./Restraint";
import { Point, PointMap } from "./Point";
import { Bearing } from "./bearing";

/**
 * yoyoの形状クラス
 * @property {PointMap} pointMap - 各点の位置を管理するマップ
 * @property {Connection[]} connections - 各点間の接続を管理するリスト
 * @property {Restraint[]} restraints - 各点間の制約を管理するリスト
 * @property {Bearing} bearing - yoyoのベアリング情報
 * 
 * @description x軸：回転軸方向、y軸：回転軸に垂直な方向
 * @todo YoyoShapeがベアリングの情報を持たずに済むようにリファクタリングする 
 */
export class YoyoShape {
  constructor(
    private readonly pointMap: PointMap,
    private readonly connections: Connection[],
    private readonly restraints: Restraint[],
    private readonly bearing: Bearing
  ) {}

  private _path: Vector2[] | null = null;


  getPoints(): Point[] {
    return [...this.pointMap.values()];
  }

  getPoint(pointId: string): Point {
    const point = this.pointMap.get(pointId);
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
    const newPointMap = this.pointMap.clone();
    newPointMap.update(pointId, newX, newY);

    this.restraints.forEach((restraint) => {
      restraint.apply(this.pointMap, newPointMap);
    });

    // Create a new instance to ensure immutability
    return new YoyoShape(
      newPointMap,
      [...this.connections],
      this.restraints,
      this.bearing
    );
  }
}
