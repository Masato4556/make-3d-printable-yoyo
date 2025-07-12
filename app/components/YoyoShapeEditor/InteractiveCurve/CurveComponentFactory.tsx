/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { LineConnectionComponent } from "./CurveComponent/LineConnectionComponent";
import { CubicBezierConnectionComponent } from "./CurveComponent/CubicBezierConnectionComponent";
import { Connection } from "../../../models/yoyo/Connection";

type Props = {
  connection: Connection;
};

export function ConnectionComponentFactory({
  connection,
}: Props) {
  switch (connection.__brand) {
    case "CubicBezierConnection":
      return (
        <CubicBezierConnectionComponent
          connection={connection}
        />
      );
    case "LineConnection":
      return <LineConnectionComponent connection={connection} />;
    default:
      throw new Error(`Unknown connection type`);
  }
}
