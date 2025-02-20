/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { YoyoCurve } from "~/contexts/curves/YoyoCurve";
import { YoyoCubicBezierCurve } from "~/contexts/curves/YoyoCubicBezierCurve";
import { YoyoHorizontalLine } from "~/contexts/curves/YoyoHorizontalLine";
import { YoyoVerticalLine } from "~/contexts/curves/YoyoVerticalLine";
import { CubicBezierCurve } from "./CubicBezierCurve";
import { HorizontalLine } from "./HorizontalLine";
import { VerticalLine } from "./VerticalLine";

type Props = {
  curve: YoyoCurve;
};
export function CurveComponent({ curve }: Props) {
  switch (curve.type) {
    case "CubicBezierCurve":
      if (curve instanceof YoyoCubicBezierCurve) {
        return <CubicBezierCurve curve={curve} />;
      }
      break;
    case "HorizontalLine":
      if (curve instanceof YoyoHorizontalLine) {
        return <HorizontalLine curve={curve} />;
      }
      break;
    case "VerticalLine":
      if (curve instanceof YoyoVerticalLine) {
        return <VerticalLine curve={curve} />;
      }
      break;
    default:
      throw new UnknownCurveTypeError(curve.type);
  }
}

class UnknownCurveTypeError extends Error {
  constructor(type: string) {
    super(`Unknown curve type: ${type}`);
  }
}
