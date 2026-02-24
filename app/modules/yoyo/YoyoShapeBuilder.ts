
import { Point } from "./Point";
import { Snapshot } from "./Snapshot";
import { YoyoShape } from "./YoyoShape";
import { Bearing, BEARING_SIZE, BearingSizeType, createBearing } from "./bearing";
import { Connection, CubicBezierConnection, LineConnection } from "./Connection";
import { FollowRestraint, Restraint } from "./Restraint";

type RestraintType = "FollowX" | "FollowY";

const RESTRAINT_BUILDERS: Record<
  RestraintType,
  (restrainedPointId: string, targetPointId: string) => Restraint
> = {
  FollowX: (restrainedPointId: string, targetPointId: string) =>
    new FollowRestraint(restrainedPointId, targetPointId, {
      follows: { x: true, y: false },
    }),
  FollowY: (restrainedPointId: string, targetPointId: string) =>
    new FollowRestraint(restrainedPointId, targetPointId, {
      follows: { x: false, y: true },
    }),
};

type RestraintRelationship = "RestrainedBy" | "TargetedBy";

type RestraintOptions = {
  type: RestraintType;
  relationshipWithPrevPoint: RestraintRelationship;
};

export class YoyoShapeBuilder {
  /**
   * パス上の点
   */
  private pathPoints: Point[];
  /**
   * 曲線の制御点
   */
  private curveControlPoints: Point[];
  /**
   * 各点間の接続
   */
  private connections: Connection[];
  private restraints: Restraint[] = [];

  private bearing: Bearing;

  constructor(startPoint: Point, bearingSize: BearingSizeType = "sizeC") {
    this.pathPoints = [startPoint];
    this.curveControlPoints = [];
    this.connections = [];
    this.bearing = createBearing(bearingSize);
  }

  public addCubicBezierCurve(
    point: Point,
    handle: { start: Point; end: Point },
    resolution?: number
  ) {
    const prevPoint = this.pathPoints.at(-1)!;
    this.pathPoints.push(point);
    this.curveControlPoints.push(handle.start, handle.end);
    this.connections = [
      ...this.connections,
      new CubicBezierConnection({
        startPointId: prevPoint.id,
        endPointId: point.id,
        control1Id: handle.start.id,
        control2Id: handle.end.id,
        resolution,
      })
    ];

    // Add restraints for control points
    this.restraints.push(
      new FollowRestraint(handle.start.id, prevPoint.id, {
        follows: { x: true, y: true },
      }),
      new FollowRestraint(handle.end.id, point.id, {
        follows: { x: true, y: true },
      })
    );

    return this;
  }

  public addLine(point: Point, restraint?: RestraintOptions) {
    const prevPoint = this.pathPoints.at(-1)!;
    this.pathPoints.push(point);
    this.connections = [
      ...this.connections,
      new LineConnection(prevPoint.id, point.id)
    ];

    if (restraint !== undefined) {
      const builder = RESTRAINT_BUILDERS[restraint.type];
      this.restraints.push(
        restraint.relationshipWithPrevPoint === "TargetedBy"
          ? builder(prevPoint.id, point.id)
          : builder(point.id, prevPoint.id)
      );
    }
    return this;
  }

  public build(): YoyoShape {
    const initialPoints = [...this.pathPoints, ...this.curveControlPoints];
    const initialSnapshot = new Snapshot(
      initialPoints,
      this.restraints
    );
    const bearing = this.bearing;

    return new YoyoShape(initialSnapshot, this.connections, bearing);
  }
}

export class CSizeBearingPresetYoyoShapeBuilder {
  static build(): YoyoShape {
    const bearingSize: BearingSizeType = "sizeC";
    const size = BEARING_SIZE[bearingSize];
    const offsetX = 2.085 + size.width / 2;

    const builder = new YoyoShapeBuilder(
      Point.fromPosition(4 + offsetX, 0, { editable: false }),
      bearingSize
    );

    // Bearing Seat
    builder
      .addLine(Point.fromPosition(4 + offsetX, 2, { editable: false }))
      .addLine(Point.fromPosition(-4 + offsetX, 2, { editable: false }))
      .addLine(Point.fromPosition(-4 + offsetX, 2.5, { editable: false }))
      .addCubicBezierCurve(
        Point.fromPosition(-3.5 + offsetX, 3.15, { editable: false }),
        {
          start: Point.fromPosition(-4 + offsetX, 3.15, { editable: false }),
          end: Point.fromPosition(-4 + offsetX, 3.15, { editable: false }),
        },
        8
      )
      .addLine(Point.fromPosition(-2 + offsetX, 3.15, { editable: false }))
      .addLine(Point.fromPosition(-2 + offsetX, 3.85, { editable: false }))
      .addCubicBezierCurve(
        Point.fromPosition(-1.7 + offsetX, 4.15, { editable: false }),
        {
          start: Point.fromPosition(-2 + offsetX, 4.15, { editable: false }),
          end: Point.fromPosition(-2 + offsetX, 4.15, { editable: false }),
        },
        8
      )
      .addLine(Point.fromPosition(-0.59 + offsetX, 4.15, { editable: false }))
      .addLine(Point.fromPosition(-0.59 + offsetX, 6.45, { editable: false }))
      .addLine(Point.fromPosition(-1.94 + offsetX, 6.45, { editable: false }))
      .addCubicBezierCurve(
        Point.fromPosition(-2.14 + offsetX, 6.25, { editable: false }),
        {
          start: Point.fromPosition(-2.14 + offsetX, 6.45, { editable: false }),
          end: Point.fromPosition(-2.14 + offsetX, 6.45, { editable: false }),
        },
        8
      )
      .addLine(Point.fromPosition(-2.14 + offsetX, 6.9, { editable: false }))
      .addCubicBezierCurve(
        Point.fromPosition(-1.94 + offsetX, 7.1, { editable: false }),
        {
          start: Point.fromPosition(-2.14 + offsetX, 7.1, { editable: false }),
          end: Point.fromPosition(-2.14 + offsetX, 7.1, { editable: false }),
        },
        8
      )
      .addLine(Point.fromPosition(-0.885 + offsetX, 7.1, { editable: false }))
      .addLine(Point.fromPosition(-0.885 + offsetX, 9.55, { editable: false }))
      .addLine(Point.fromPosition(-1.785 + offsetX, 9.55, { editable: false }))
      .addCubicBezierCurve(
        Point.fromPosition(-2.085 + offsetX, 9.25, { editable: false }),
        {
          start: Point.fromPosition(-2.085 + offsetX, 9.55, {
            editable: false,
          }),
          end: Point.fromPosition(-2.085 + offsetX, 9.55, { editable: false }),
        },
        8
      )
      .addLine(Point.fromPosition(-2.085 + offsetX, 10.55, { editable: false }));

    // Default Body
    return builder
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
      .addLine(Point.fromPosition(8, 0))
      .build();
  }
}
