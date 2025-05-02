/**
 * ヨーヨーのキャップを表す縦線を描画するコンポーネント
 */

import { Circle, Line } from "react-konva";
import { YoyoVerticalLine } from "../../../yoyo/curves/YoyoVerticalLine";
import { PATH_COLOR } from "../style";
import { YoyoCurve } from "../../../yoyo/curves/YoyoCurve";

type Props = {
  curve: YoyoVerticalLine;
  update: (curve: YoyoCurve) => void;
};

export function VerticalLine({ curve, update }: Props) {
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
          curve.v0 = curve.v0.withX(e.target.x());
          curve.v1 = curve.v1.withX(e.target.x());
          e.target.y(curve.v1.y);

          update(curve);
        }}
      />
    </>
  );
}
