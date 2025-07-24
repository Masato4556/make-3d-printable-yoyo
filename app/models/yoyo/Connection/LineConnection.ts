import { BaseConnection } from "./BaseConnection";

export class LineConnection implements BaseConnection {
  readonly type = "Line";
  readonly __brand = "LineConnection";
  readonly id: string = crypto.randomUUID();
  constructor(readonly startPointId: string, readonly endPointId: string) {}
}
