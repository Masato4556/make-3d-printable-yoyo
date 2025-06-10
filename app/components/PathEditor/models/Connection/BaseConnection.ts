export interface BaseConnection {
  readonly id: string;
  readonly startPointId: string;
  readonly endPointId: string;
  withStartPointId(startPointId: string): BaseConnection;
  withEndPointId(endPointId: string): BaseConnection;
}
