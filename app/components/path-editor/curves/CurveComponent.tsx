/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { YoyoCurve } from "~/yoyo/curves/YoyoCurve";
import { YoyoCubicBezierCurve } from "~/yoyo/curves/YoyoCubicBezierCurve";
import { YoyoHorizontalLine } from "~/yoyo/curves/YoyoHorizontalLine";
import { YoyoVerticalLine } from "~/yoyo/curves/YoyoVerticalLine";
import { CubicBezierCurve } from "./CubicBezierCurve";
import { HorizontalLine } from "./HorizontalLine";
import { VerticalLine } from "./VerticalLine";
import { JsxElementConverter } from "./JsxElementConverter";

type Props = {
  curve: YoyoCurve;
};
export function CurveComponent({ curve }: Props) {
  return new JsxElementConverter(registeredConverters).convert(curve);
}

const registeredConverters: {
  [type: string]: (curve: YoyoCurve) => JSX.Element;
} = {
  CubicBezierCurve: (curve) => {
    if (curve instanceof YoyoCubicBezierCurve) {
      return <CubicBezierCurve curve={curve} />;
    }
    throw new Error("Invalid curve type");
  },
  HorizontalLine: (curve) => {
    if (curve instanceof YoyoHorizontalLine) {
      return <HorizontalLine curve={curve} />;
    }
    throw new Error("Invalid curve type");
  },
  VerticalLine: (curve) => {
    if (curve instanceof YoyoVerticalLine) {
      return <VerticalLine curve={curve} />;
    }
    throw new Error("Invalid curve type");
  },
};
