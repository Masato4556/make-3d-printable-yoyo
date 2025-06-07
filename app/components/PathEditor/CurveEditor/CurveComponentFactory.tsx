/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { LineConnectionComponent } from "./CurveComponent/LineConnectionComponent";
import { CubicBezierConnectionComponent } from "./CurveComponent/CubicBezierConnectionComponent";
import { Connection } from "../models/Connection/Connection";

type Props = {
  connection: Connection;
  getConnectionPoints: (connection: Connection) => {
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  refreshConnections: () => void;
};

export function ConnectionComponentFactory({
  connection,
  getConnectionPoints,
  refreshConnections,
}: Props) {
  const { start, end } = getConnectionPoints(connection);
  switch (connection.__brand) {
    case "CubicBezierConnection":
      return (
        <CubicBezierConnectionComponent
          connection={connection}
          getConnectionPoints={getConnectionPoints}
          refreshConnections={refreshConnections}
        />
      );
    case "LineConnection":
      return <LineConnectionComponent startPoint={start} endPoint={end} />;
    default:
      throw new Error(`Unknown connection type`);
  }
}
