/**
 * ヨーヨーのキャップを表す縦線を描画するコンポーネント
 * TODO: ただの縦線を描画するコンポーネントのような命名になっているので、適切な名前に変更する
 */

import { Circle, Line } from "react-konva";
import { YoyoVerticalLine } from "~/contexts/curves/Curve/YoyoVerticalLine";
import { PATH_COLOR } from "~/styles/const";

type Props = {
  curve: YoyoVerticalLine;
};

export function VerticalLine(props: Props) {
  const { curve } = props;

  return (
    <>
      <Line
        stroke={PATH_COLOR}
        strokeWidth={0.8}
        lineCap="round"
        points={[curve.v0.x, curve.v0.y, curve.v1.x, curve.v1.y]}
      />
      <Circle
        x={curve.v1.x}
        y={curve.v1.y}
        radius={1}
        stroke={PATH_COLOR}
        draggable
        onDragMove={(e) => {
          curve.v0.setX(e.target.x());
          curve.v1.setX(e.target.x());
          e.target.y(curve.v1.y);

          curve.updateDispath(curve, curve.index);
        }}
      />
    </>
  );
}
