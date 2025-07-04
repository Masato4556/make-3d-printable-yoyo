import { PointMap } from "../components/PathEditor/models/Point/PointMap";
import { Point } from "../components/PathEditor/models/Point/Point";
import { Restraint } from "../components/PathEditor/models/Restraint/BaseRestraint";
import { Connection } from "../components/PathEditor/models/Connection/Connection";
import { CSizeBearingSeatCurve } from "../components/PathEditor/models/BearingSeat/CSizeBearingSeatCurve";
import { Vector2 } from "../math/vector2";
import { createPathFromConnections } from "../components/PathEditor/models/Connection/function/createPathFromConnections";
import { YoyoCurveBuilder } from "../components/PathEditor/CurveEditor/hooks/YoyoCurveBuilder";

export class YoyoShape {
  constructor(
    private readonly pointMap: PointMap,
    private readonly connections: Connection[],
    private readonly restraints: Restraint[],
    private readonly bearingSeat: CSizeBearingSeatCurve
  ) {}

  static createDefault(): YoyoShape {
    const yoyoCurveBuilder = new YoyoCurveBuilder()
      .addCubicBezierCurve(Point.fromPosition(21, 27.5, { editable: true }), {
        start: Point.fromPosition(5.25, 10.55, { editable: true }),
        end: Point.fromPosition(15.75, 27.5, { editable: true }),
      })
      .addLine(Point.fromPosition(28, 27.5), {
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

  getBearingSeat(): CSizeBearingSeatCurve {
    return this.bearingSeat;
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
