import { useCallback, useState } from "react";
import { YoyoCurve } from "../../../../yoyo/curves/YoyoCurve";
import { Vector2 } from "../../../../math/vector2";
import { CSizeBearingSeatCurve } from "../../../../yoyo/curves/BearingSeat/CSizeBearingSeatCurve";
import { YoyoCubicBezierCurve } from "../../../../yoyo/curves/YoyoCubicBezierCurve";
import { YoyoHorizontalLine } from "../../../../yoyo/curves/YoyoHorizontalLine";
import { YoyoVerticalLine } from "../../../../yoyo/curves/YoyoVerticalLine";

export const useCurves = () => {
  // TODO: 各カーブの始点と終点が一致する仕組みを用意する。
  const [curves, setCurves] = useState<YoyoCurve[]>([
    new CSizeBearingSeatCurve(),
    new YoyoCubicBezierCurve(
      {
        v0: new Vector2(0, 10.55),
        v1: new Vector2(5.25, 10.55),
        v2: new Vector2(15.75, 27.5),
        v3: new Vector2(21, 27.5),
      },
      { fixedEdge: "start" }
    ),
    new YoyoHorizontalLine(new Vector2(21, 27.5), new Vector2(28, 27.5)),
    new YoyoVerticalLine(new Vector2(28, 27.5), new Vector2(28, 0), {
      editablePoint: "end",
    }),
  ]);

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
