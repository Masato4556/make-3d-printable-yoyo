import { YoyoCurveBuilder } from "./YoyoCurveBuilder";
import { Vector2 } from "../math";
import { Connection, createPathFromConnections } from "./Connection";
import { Restraint } from "./Restraint";
import { BearingSeatCurve } from "./BearingSeat/BearingSeatCurve";
import { Point, PointMap } from "./Point";
import { BearingSizeType, Bearing } from "./bearing";

// x軸：回転軸方向、y軸：回転軸に垂直な方向
export class YoyoShape {
  constructor(
    private readonly pointMap: PointMap,
    private readonly connections: Connection[],
    private readonly restraints: Restraint[],
    private readonly bearingSeat: BearingSeatCurve
  ) {}

  static createDefault(bearingSize: BearingSizeType = "sizeC"): YoyoShape {
    const yoyoCurveBuilder = new YoyoCurveBuilder(bearingSize)
      .addCubicBezierCurve(Point.fromPosition(21, 27.5, { editable: true }), {
        start: Point.fromPosition(5.25, 10.55, { editable: true }),
        end: Point.fromPosition(15.75, 27.5, { editable: true }),
      })
      .addLine(Point.fromPosition(28, 27.5, {}, { type: "chamfer", size: 2 }), {
        type: "FollowY",
        relationshipWithPrevPoint: "RestrainedBy",
      })
      .addLine(Point.fromPosition(28, 10, { editable: true }), {
        type: "FollowX",
        relationshipWithPrevPoint: "TargetedBy",
      })
      .addLine(
        Point.fromPosition(20, 2, { editable: true, fixed: { y: true } })
      )
      .addLine(Point.fromPosition(8, 2))
      .addLine(Point.fromPosition(8, 0));

    const initialPoints = yoyoCurveBuilder.getPoints();
    const initialPointMap = new PointMap(initialPoints);
    const connections = yoyoCurveBuilder.getConnections();
    const restraints = yoyoCurveBuilder.getRestraints();
    const bearingSeat = yoyoCurveBuilder.getBearingSeat();

    return new YoyoShape(initialPointMap, connections, restraints, bearingSeat);
  }

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

  getBearingSeat(): BearingSeatCurve {
    return this.bearingSeat;
  }

  getBearing(): Bearing {
    return this.bearingSeat.bearing;
  }

  getPath(): Vector2[] {
    return [
      ...this.bearingSeat.getPath(),
      ...createPathFromConnections(this.connections, this.getPoint.bind(this)),
    ];
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
      this.bearingSeat
    );
  }
}
