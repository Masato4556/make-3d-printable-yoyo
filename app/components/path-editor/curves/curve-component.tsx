/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { YoyoCurve } from "~/yoyo/curves/yoyo-curve";
import { YoyoCubicBezierCurve } from "~/yoyo/curves/yoyo-cubic-bezier-curve";
import { YoyoHorizontalLine } from "~/yoyo/curves/yoyo-horizontal-line";
import { YoyoVerticalLine } from "~/yoyo/curves/yoyo-verticalline";
import { CubicBezierCurve } from "./cubic-bezier-curve";
import { HorizontalLine } from "./horizontal-line";
import { VerticalLine } from "./vertical-line";
import { JsxElementConverter } from "./jsx-element-converter";

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
