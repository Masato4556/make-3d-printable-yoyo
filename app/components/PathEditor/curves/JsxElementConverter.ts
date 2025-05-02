import { JSX } from "react";
import { YoyoCurve } from "../../../yoyo/curves/YoyoCurve";
import { UnknownCurveTypeError } from "./errors/UnknownCurveTypeError";

export class JsxElementConverter {
  private registeredConverters: {
    [type: string]: (
      curve: YoyoCurve,
      update: (curve: YoyoCurve) => void
    ) => JSX.Element;
  };

  constructor(converters: {
    [type: string]: (
      curve: YoyoCurve,
      update: (curve: YoyoCurve) => void
    ) => JSX.Element;
  }) {
    this.registeredConverters = converters;
  }

  public convert(
    curve: YoyoCurve,
    update: (curve: YoyoCurve) => void
  ): JSX.Element {
    const converter = this.registeredConverters[curve.type];
    if (!converter) {
      throw new UnknownCurveTypeError(curve.type);
    }
    return converter(curve, update);
  }
}
