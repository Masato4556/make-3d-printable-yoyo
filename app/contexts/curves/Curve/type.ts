import { YoyoCubicBezierCurve } from "./YoyoCubicBezierCurve";
import { YoyoHorizontalLine } from "./YoyoHorizontalLine";
import { YoyoVerticalLine } from "./YoyoVerticalLine";

export type YoyoCurveType =
  | YoyoCubicBezierCurve
  | YoyoHorizontalLine
  | YoyoVerticalLine;
