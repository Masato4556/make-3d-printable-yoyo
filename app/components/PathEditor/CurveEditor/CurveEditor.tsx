/**
 * ユーザーが操作できるヨーヨーのパスを表示するコンポーネント
 */

import { Circle, Line, Group } from "react-konva";
import { CurveComponentFactory } from "./CurveComponentFactory";
import { useMemo } from "react";
import { Vector2 } from "../../../math/vector2";
import { PATH_COLOR } from "../style";
import { useCurves } from "./hooks/useCurves";
import { useUpdateCurvesStore } from "./hooks/useUpdateCurvesStore";

export function CurveEditor() {
  const { curves, updateCurve } = useCurves();
  useUpdateCurvesStore(curves);

  const mirreredPath = useMemo(
    () =>
      curves
        .flatMap((curve) => curve.getPath())
        .map((v) => new Vector2(v.x, -v.y)),
    [curves]
  );

  return (
    <Group scale={{ x: 5, y: -5 }}>
      <Circle x={200} y={200} stroke="black" radius={50} />
      <Line
        stroke={PATH_COLOR}
        strokeWidth={0.4}
        points={mirreredPath.reduce<number[]>((acc, cur) => {
          acc.push(cur.x);
          acc.push(cur.y);
          return acc;
        }, [])}
      />
      {curves.map((curve, index) => (
        <CurveComponentFactory
          key={curve.id}
          curve={curve}
          update={(curve) => {
            updateCurve(curve, index);
          }}
        />
      ))}
    </Group>
  );
}
