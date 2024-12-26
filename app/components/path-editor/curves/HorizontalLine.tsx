import { Line } from "@react-three/drei";
import { YoyoHorizontalLine } from "~/contexts/curves/Curve/YoyoHorizontalLine";
import { PATH_COLOR } from "~/styles/const";

type Props = {
  curve: YoyoHorizontalLine;
};

export function HorizontalLine(props: Props) {
  const { curve } = props;

  return (
    <Line points={[curve.v0, curve.v1]} color={PATH_COLOR} lineWidth={3} />
  );
}
