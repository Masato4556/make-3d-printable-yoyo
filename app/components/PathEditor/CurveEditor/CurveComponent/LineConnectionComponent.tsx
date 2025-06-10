/**
 * ヨーヨーのキャップを表す縦線を描画するコンポーネント
 */

import { Line } from "react-konva";
import { PATH_COLOR } from "../../style";

type Props = {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
};

export function LineConnectionComponent({ startPoint, endPoint }: Props) {
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
