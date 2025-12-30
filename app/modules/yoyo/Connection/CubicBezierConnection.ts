import { BaseConnection } from "./BaseConnection";

export class CubicBezierConnection implements BaseConnection {
  readonly type = "CubicBezier";
  readonly __brand = "CubicBezierConnection";
  readonly id: string;
  public startPointId: string;
  public endPointId: string;
  public control1Id: string;
  public control2Id: string;
  constructor({
    startPointId,
    endPointId,
    control1Id,
    control2Id,
    id,
  }: {
    startPointId: string;
    endPointId: string;
    control1Id: string;
    control2Id: string;
    id?: string;
  }) {
    this.startPointId = startPointId;
    this.endPointId = endPointId;
    this.control1Id = control1Id;
    this.control2Id = control2Id;
    this.id = id || crypto.randomUUID();
  }
}
