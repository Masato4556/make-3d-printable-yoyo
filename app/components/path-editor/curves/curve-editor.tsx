/**
 * ユーザーが操作できるヨーヨーのパスを表示するコンポーネント
 */

import { Circle, Line, Group } from "react-konva";
import { CurveComponent } from "./curve-component";
import { useYoyoCurveState } from "~/yoyo/yoyo-curve-context";
import { useMemo } from "react";
import { PATH_COLOR } from "~/components/path-editor/style";
import { Vector2 } from "~/math/vector2";

export function CurveEditor() {
  const { curves } = useYoyoCurveState();

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
        strokeWidth={0.8}
        points={mirreredPath.reduce<number[]>((acc, cur) => {
          acc.push(cur.x);
          acc.push(cur.y);
          return acc;
        }, [])}
      />
      {curves.map((curve) => (
        <CurveComponent key={curve.id} curve={curve} />
      ))}
    </Group>
  );
}
