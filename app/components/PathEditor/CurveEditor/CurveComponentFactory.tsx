/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { CubicBezierCurve } from "./CurveComponent/CubicBezierCurve";
import { HorizontalLine } from "./CurveComponent/HorizontalLine";
import { VerticalLine } from "./CurveComponent/VerticalLine";
import { JsxElementConverter } from "./JsxElementConverter";
import { YoyoCurve } from "../curves/YoyoCurve";
import { YoyoCubicBezierCurve } from "../curves/YoyoCubicBezierCurve";
import { JSX } from "react";
import { YoyoHorizontalLine } from "../curves/YoyoHorizontalLine";
import { YoyoVerticalLine } from "../curves/YoyoVerticalLine";
import { CSizeBearingSeatCurve } from "../curves/BearingSeat/CSizeBearingSeatCurve";
import { CSizeBearingSeat } from "./CurveComponent/CSizeBearingSeat";

export type UpdateCurve = (curve: YoyoCurve) => void;

type Props = {
  curve: YoyoCurve;
  update: UpdateCurve;
};

export function CurveComponentFactory({ curve, update }: Props) {
  return new JsxElementConverter(registeredConverters).convert(curve, update);
}

const registeredConverters: {
  [type: string]: (curve: YoyoCurve, update: UpdateCurve) => JSX.Element;
} = {
  CSizeBearingSeatCurve: (curve, _) => {
    if (curve instanceof CSizeBearingSeatCurve) {
      return <CSizeBearingSeat curve={curve} />;
    }
    throw new Error("Invalid curve type");
  },
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
