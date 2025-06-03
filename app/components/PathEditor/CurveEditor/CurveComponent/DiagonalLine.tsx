/**
 * ヨーヨーのキャップを表す縦線を描画するコンポーネント
 */

import { Line } from "react-konva";
import { PATH_COLOR } from "../../style";
import { UpdateCurve } from "../CurveComponentFactory";
import { YoyoDiagonalLine } from "../../curves/YoyoDiagonalLine";
import { DraggableCircle } from "./parts/DraggableCircle";
import { Vector2 } from "../../../../math/vector2";

type Props = {
  curve: YoyoDiagonalLine;
  update: UpdateCurve;
};

export function DiagonalLine({ curve, update }: Props) {
  return (
    <>
      <Line
        stroke={PATH_COLOR}
        strokeWidth={0.4}
        lineCap="round"
        points={[curve.v0.x, curve.v0.y, curve.v1.x, curve.v1.y]}
      />
      {curve.option?.editableLastPoint && (
        <DraggableCircle
          x={curve.v1.x}
          y={curve.v1.y}
          radius={2}
          color={PATH_COLOR}
          draggable={true}
          onDragMove={(e) => {
            // 簡易的に作成したドラッグできる範囲を制限するロジック
            // TODO: コンポーネント内にロジックを持たないようにする
            // TODO: マジックナンバーを解消する
            const nextX = Math.max(Math.min(e.target.x(), curve.v0.x), 8);
            curve.updateLastPoint(new Vector2(nextX, 2));
            update(curve);
          }}
        />
      )}
    </>
  );
}
