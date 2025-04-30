export class UnknownCurveTypeError extends Error {
  constructor(type: string) {
    super(`Unknown curve type: ${type}`);
  }
}
