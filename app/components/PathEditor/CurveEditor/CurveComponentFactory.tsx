/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { CubicBezierCurve } from "./CurveComponent/CubicBezierCurve";
import { HorizontalLine } from "./CurveComponent/HorizontalLine";
import { VerticalLine } from "./CurveComponent/VerticalLine";
import { JsxElementConverter } from "./JsxElementConverter";
import { YoyoCurve } from "../../../yoyo/curves/YoyoCurve";
import { YoyoCubicBezierCurve } from "../../../yoyo/curves/YoyoCubicBezierCurve";
import { JSX } from "react";
import { YoyoHorizontalLine } from "../../../yoyo/curves/YoyoHorizontalLine";
import { YoyoVerticalLine } from "../../../yoyo/curves/YoyoVerticalLine";

type Props = {
  curve: YoyoCurve;
  update: (curve: YoyoCurve) => void;
};
export function CurveComponentFactory({ curve, update }: Props) {
  return new JsxElementConverter(registeredConverters).convert(curve, update);
}

const registeredConverters: {
  [type: string]: (
    curve: YoyoCurve,
    update: (curve: YoyoCurve) => void
  ) => JSX.Element;
} = {
  CubicBezierCurve: (curve, update) => {
    if (curve instanceof YoyoCubicBezierCurve) {
      return <CubicBezierCurve curve={curve} update={update} />;
    }
    throw new Error("Invalid curve type");
  },
  HorizontalLine: (curve, update) => {
    if (curve instanceof YoyoHorizontalLine) {
      return <HorizontalLine curve={curve} update={update} />;
    }
    throw new Error("Invalid curve type");
  },
  VerticalLine: (curve, update) => {
    if (curve instanceof YoyoVerticalLine) {
      return <VerticalLine curve={curve} update={update} />;
    }
    throw new Error("Invalid curve type");
  },
};
