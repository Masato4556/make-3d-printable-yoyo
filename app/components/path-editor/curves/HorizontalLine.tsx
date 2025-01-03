import { Line } from "react-konva";
import { YoyoHorizontalLine } from "~/contexts/curves/Curve/YoyoHorizontalLine";
import { PATH_COLOR } from "~/styles/const";

type Props = {
  curve: YoyoHorizontalLine;
};

export function HorizontalLine(props: Props) {
  const { curve } = props;

  return (
    <Line
      stroke={PATH_COLOR}
      strokeWidth={0.8}
      lineCap="round"
      points={[curve.v0.x, curve.v0.y, curve.v1.x, curve.v1.y]}
    />
  );
}
