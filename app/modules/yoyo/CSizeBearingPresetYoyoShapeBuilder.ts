import {
  BEARING_SIZE,
  BearingSizeType,
} from "./bearing";
import { Point } from "./Point";
import { YoyoShapeBuilder } from "./YoyoCurveBuilder";
import { YoyoShape } from "./YoyoShape";

export class CSizeBearingPresetYoyoShapeBuilder {
  static build(): YoyoShape {
    const bearingSize: BearingSizeType = "sizeC";
    const size = BEARING_SIZE[bearingSize];
    const offsetX = 2.085 + size.width / 2;

    const builder = new YoyoShapeBuilder(bearingSize);

    // Bearing Seat
    builder
      .startAt(Point.fromPosition(4 + offsetX, 0, { editable: false }))
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
