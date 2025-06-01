/**
 * ヨーヨーの接地面にあたる水平線を描画するコンポーネント
 */

import { Line } from "react-konva";
import { YoyoHorizontalLine } from "../../curves/YoyoHorizontalLine";
import { PATH_COLOR } from "../../style";
import { UpdateCurve } from "../CurveComponentFactory";

type Props = {
  curve: YoyoHorizontalLine;
  update: UpdateCurve;
};

export function HorizontalLine(props: Props) {
  const { curve } = props;

  return (
    <Line
      stroke={PATH_COLOR}
      strokeWidth={0.4}
      lineCap="round"
      points={[curve.v0.x, curve.v0.y, curve.v1.x, curve.v1.y]}
    />
  );
}
