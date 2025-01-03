import { YoyoCurve } from "~/contexts/curves/Curve/YoyoCurve";
import { YoyoCubicBezierCurve } from "~/contexts/curves/Curve/YoyoCubicBezierCurve";
import { YoyoHorizontalLine } from "~/contexts/curves/Curve/YoyoHorizontalLine";
import { YoyoVerticalLine } from "~/contexts/curves/Curve/YoyoVerticalLine";
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
  }
}
