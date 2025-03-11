import { YoyoCurve } from "~/yoyo/curves/yoyo-curve";

export class JsxElementConverter {
  private registeredConverters: {
    [type: string]: (curve: YoyoCurve) => JSX.Element;
  };

  constructor(converters: {
    [type: string]: (curve: YoyoCurve) => JSX.Element;
  }) {
    this.registeredConverters = converters;
  }

  public convert(curve: YoyoCurve): JSX.Element {
    const converter = this.registeredConverters[curve.type];
    if (!converter) {
      throw new UnknownCurveTypeError(curve.type);
    }
    return converter(curve);
  }
}

class UnknownCurveTypeError extends Error {
  constructor(type: string) {
    super(`Unknown curve type: ${type}`);
  }
}
