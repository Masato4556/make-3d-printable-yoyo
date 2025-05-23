/**
 * ヨーヨーの軸となるX軸を描画するコンポーネンss
 */
import { Line } from "react-konva";
import { PATH_COLOR } from "./style";

export function Xaxis() {
  return (
    <Line
      stroke={PATH_COLOR}
      strokeWidth={0.8}
      lineCap="round"
      points={[-500, 0, 500, 0]}
    />
  );
}
