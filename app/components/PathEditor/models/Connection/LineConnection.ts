import { BaseConnection } from "./BaseConnection";

export class LineConnection implements BaseConnection {
  readonly type = "Line";
  readonly __brand = "LineConnection";
  readonly id: string = crypto.randomUUID();
  constructor(readonly startPointId: string, readonly endPointId: string) {}
  withStartPointId(startPointId: string): LineConnection {
    return new LineConnection(startPointId, this.endPointId);
  }
  withEndPointId(endPointId: string): LineConnection {
    return new LineConnection(this.startPointId, endPointId);
  }
}
