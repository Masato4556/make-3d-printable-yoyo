/**
 * ベアリングシートを描画する汎用コンポーネント
 */

import { Line } from "react-konva";
import { useMemo } from "react";
import { PATH_COLOR } from "../../style";
import { BearingSeatCurve } from "../../../../modules/yoyo";

type Props = {
  curve: BearingSeatCurve;
};

export function BearingSeat({ curve }: Props) {
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
