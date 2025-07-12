/**
 * 2次ベジェ曲線を描画するコンポーネント
 */

import { Line } from "react-konva";
import { useMemo } from "react";
import { PATH_COLOR } from "../../style";
import { CSizeBearingSeatCurve } from "../../../../models/yoyo/BearingSeat/CSizeBearingSeatCurve";

type Props = {
  curve: CSizeBearingSeatCurve;
};

export function CSizeBearingSeat({ curve }: Props) {
  const path = useMemo(() => curve.getPath(), [curve]);
  return (
    <>
      <Line
        points={path.flatMap((v) => [v.x, v.y])}
        stroke={PATH_COLOR}
        strokeWidth={0.4}
        lineCap="round"
      />
    </>
  );
}
