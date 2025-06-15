import { Connection } from "./Connection";

export class ConnectionList {
  private connections: Connection[] = [];
  constructor(initialConnection: Connection[] = []) {
    this.connections = initialConnection;
  }
  public add(connection: Connection) {
    return new ConnectionList([...this.connections, connection]);
  }
  public getConnections(): Connection[] {
    return this.connections;
  }
}
