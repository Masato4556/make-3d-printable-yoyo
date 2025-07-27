/**
 * YoyoCurveの種類に応じて適切なCurveComponentを返すコンポーネント
 */

import { CubicBezierConnectionController } from "./CurveComponent/CubicBezierConnectionController";
import { Connection } from "../../../models/yoyo/Connection";

type Props = {
  connection: Connection;
};

export function ConnectionController({ connection }: Props) {
  switch (connection.__brand) {
    case "CubicBezierConnection":
      return <CubicBezierConnectionController connection={connection} />;
    case "LineConnection":
      return null;
    default:
      throw new Error(`Unknown connection type`);
  }
}
