import { JSX } from "react";
import { YoyoCurve } from "../curves/YoyoCurve";
import { UnknownCurveTypeError } from "./errors/UnknownCurveTypeError";
import { UpdateCurve } from "./CurveComponentFactory";

export class JsxElementConverter {
  private registeredConverters: {
    [type: string]: (curve: YoyoCurve, update: UpdateCurve) => JSX.Element;
  };

  constructor(converters: {
    [type: string]: (curve: YoyoCurve, update: UpdateCurve) => JSX.Element;
  }) {
    this.registeredConverters = converters;
  }

  public convert(curve: YoyoCurve, update: UpdateCurve): JSX.Element {
    const converter = this.registeredConverters[curve.type];
    if (!converter) {
      throw new UnknownCurveTypeError(curve.type);
    }
    return converter(curve, update);
  }
}
