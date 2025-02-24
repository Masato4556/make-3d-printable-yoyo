/**
 * ヨーヨーの軸となるX軸を描画するコンポーネント
 * TODO: konva移行がまだできていないので、要対応
 */
import { Line } from "react-konva";
import { PATH_COLOR } from "~/styles/const";

export function XAxis() {
  return (
    <Line
      stroke={PATH_COLOR}
      strokeWidth={0.8}
      lineCap="round"
      points={[-500, 0, 500, 0]}
    />
  );
}
