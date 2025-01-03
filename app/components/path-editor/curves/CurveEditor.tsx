import { Stage, Layer, Circle, Line } from "react-konva";
import { CurveComponent } from "./CurveComponent";
import { useYoyoCurveState } from "~/contexts/YoyoCurveContext";
import { useMemo } from "react";
import { Vector2 } from "three";
import { BACKGROUND_COLOR, PATH_COLOR } from "~/styles/const";

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
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ background: BACKGROUND_COLOR }}
      offset={{
        x: -window.innerWidth / 2,
        y: -window.innerHeight / 2,
      }}
    >
      <Layer scale={{ x: 5, y: -5 }}>
        {curves.map((curve) => {
          return <CurveComponent key={curve.id} curve={curve} />;
        })}

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
      </Layer>
    </Stage>
  );
}
