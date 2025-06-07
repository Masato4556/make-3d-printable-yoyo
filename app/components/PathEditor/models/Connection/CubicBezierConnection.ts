import { Vector2 } from "../../../../math/vector2";
import { BaseConnection } from "./BaseConnection";

export class CubicBezierConnection implements BaseConnection {
  readonly type = "CubicBezier";
  readonly __brand = "CubicBezierConnection";
  readonly id: string = crypto.randomUUID();
  constructor(
    readonly startPointId: string,
    readonly endPointId: string,
    public control1: Vector2,
    public control2: Vector2
  ) {}
  withStartPointId(startPointId: string): CubicBezierConnection {
    return new CubicBezierConnection(
      startPointId,
      this.endPointId,
      this.control1,
      this.control2
    );
  }
  withEndPointId(endPointId: string): CubicBezierConnection {
    return new CubicBezierConnection(
      this.startPointId,
      endPointId,
      this.control1,
      this.control2
    );
  }
}
