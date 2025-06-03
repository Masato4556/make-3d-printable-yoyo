import { useCallback, useState } from "react";
import { YoyoCurve } from "../../curves/YoyoCurve";
import { Vector2 } from "../../../../math/vector2";
import { YoyoCurveBuilder } from "../../curves/YoyoCurveBuilder";

export const useCurves = () => {
  const [curves, setCurves] = useState<YoyoCurve[]>(
    new YoyoCurveBuilder()
      .addCubicBezierCurve(
        new Vector2(21, 27.5),
        { start: new Vector2(5.25, 10.55), end: new Vector2(15.75, 27.5) },
        { fixedEdge: "start" }
      )
      .addHorizontalLine(new Vector2(28, 27.5))
      .addVerticalLine(new Vector2(28, 10), {
        editableEndPoint: true,
      })
      .addDiagonalLine(new Vector2(20, 2), { editableLastPoint: true })
      .addHorizontalLine(new Vector2(8, 2))
      .addVerticalLine(new Vector2(8, 0))
      .build()
  );

  const updateCurve = useCallback(
    (curve: YoyoCurve, index: number) => {
      curves[index] = curve;

      // Update the start and end points of all curves
      const updatePreviousCurves = (startIndex: number) => {
        for (let i = startIndex; i - 1 >= 0; i -= 1) {
          const current = curves[i];
          const previous = curves[i - 1];
          if (!current || !previous) {
            break;
          }
          previous.updateLastPoint(current.getFirstPoint());
        }
      };

      const updateNextCurves = (startIndex: number) => {
        for (let i = startIndex; i + 1 < curves.length; i += 1) {
          const current = curves[i];
          const next = curves[i + 1];
          if (!current || !next) {
            break;
          }
          next.updateFirstPoint(current.getLastPoint());
        }
      };

      updatePreviousCurves(index);
      updateNextCurves(index);

      setCurves([...curves]);
    },
    [curves]
  );

  return {
    curves,
    updateCurve,
  };
};
