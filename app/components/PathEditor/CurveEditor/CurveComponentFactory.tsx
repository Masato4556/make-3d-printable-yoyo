/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { LineConnectionComponent } from "./CurveComponent/LineConnectionComponent";
import { CubicBezierConnectionComponent } from "./CurveComponent/CubicBezierConnectionComponent";
import { Connection } from "../models/Connection/Connection";
import { useYoyoCurveStore } from "../../../stores/useYoyoCurveStore";

type Props = {
  connection: Connection;
  refreshConnections: () => void;
};

export function ConnectionComponentFactory({
  connection,
  refreshConnections,
}: Props) {
  const {getPoint} = useYoyoCurveStore();
  const start = getPoint(connection.startPointId);
  const end = getPoint(connection.endPointId);
  switch (connection.__brand) {
    case "CubicBezierConnection":
      return (
        <CubicBezierConnectionComponent
          connection={connection}
          refreshConnections={refreshConnections}
        />
      );
    case "LineConnection":
      return <LineConnectionComponent startPoint={start} endPoint={end} />;
    default:
      throw new Error(`Unknown connection type`);
  }
}
