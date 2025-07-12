/**
 * ヨーヨーのキャップを表す縦線を描画するコンポーネント
 */

import { Line } from "react-konva";
import { PATH_COLOR } from "../../style";
import { useCurveStore } from "../../../../stores/useCurveStore";
import { LineConnection } from "../../../../models/yoyo/Connection";

type Props = {
  connection: LineConnection;
};

export function LineConnectionComponent({ connection }: Props) {
  const { getPoint } = useCurveStore();
  const startPoint = getPoint(connection.startPointId);
  const endPoint = getPoint(connection.endPointId);
  return (
    <>
      <Line
        stroke={PATH_COLOR}
        strokeWidth={0.4}
        lineCap="round"
        points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
      />
    </>
  );
}
