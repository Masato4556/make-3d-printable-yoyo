/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { LineConnectionComponent } from "./CurveComponent/LineConnectionComponent";
import { CubicBezierConnectionComponent } from "./CurveComponent/CubicBezierConnectionComponent";
import { Connection } from "../models/Connection/Connection";

type Props = {
  connection: Connection;
  refreshConnections: () => void;
};

export function ConnectionComponentFactory({
  connection,
  refreshConnections,
}: Props) {
  switch (connection.__brand) {
    case "CubicBezierConnection":
      return (
        <CubicBezierConnectionComponent
          connection={connection}
          refreshConnections={refreshConnections}
        />
      );
    case "LineConnection":
      return <LineConnectionComponent connection={connection} />;
    default:
      throw new Error(`Unknown connection type`);
  }
}
