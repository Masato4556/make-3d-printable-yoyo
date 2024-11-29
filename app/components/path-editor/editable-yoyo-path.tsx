import { useEffect, useMemo } from "react";
import { Vector2, Vector3 } from "three";
import {
  useYoyoCurveDispatch,
  useYoyoCurveState,
} from "~/contexts/YoyoCurveContext";
import { YoyoCubicBezierCurve } from "~/utils/YoyoCurve/YoyoCubicBezierCurve";
import { YoyoVertiocalLine } from "~/utils/YoyoCurve/YoyoVertiocalLine";
import { YoyoHorizontalLine } from "~/utils/YoyoCurve/YoyoHorizontalLine";
import { DimesionLine } from "./dimesion-line";
import { Line } from "@react-three/drei";

type Props = {
  position: Vector3;
};

export function EditableYoyoPath(props: Props) {
  const { position } = props;
  const { curves } = useYoyoCurveState();

  const dispatch = useYoyoCurveDispatch();
  useEffect(() => {
    dispatch({
      type: "SET_CURVES",
      curves: [
        new YoyoCubicBezierCurve(
          new Vector2(0, 10.75),
          new Vector2(5.25, 10.75),
          new Vector2(5.25, 18.3),
          new Vector2(10.5, 18.3),
          (curve) => {
            dispatch({ type: "UPDATE_CURVE", index: 0, curve });
          },
          { fixedEdge: "start" }
        ),
        new YoyoCubicBezierCurve(
          new Vector2(10.5, 18.3),
          new Vector2(15.75, 18.3),
          new Vector2(15.75, 27.5),
          new Vector2(21, 27.5),
          (curve) => {
            dispatch({ type: "UPDATE_CURVE", index: 1, curve });
          }
        ),
        new YoyoHorizontalLine(
          new Vector2(21, 27.5),
          new Vector2(28, 27.5),
          (curve) => {
            dispatch({ type: "UPDATE_CURVE", index: 2, curve });
          }
        ),
        new YoyoVertiocalLine(
          new Vector2(28, 27.5),
          new Vector2(28, 0),
          (curve) => {
            dispatch({ type: "UPDATE_CURVE", index: 3, curve });
          },
          { editablePoint: "end" }
        ),
      ],
    });
  }, []);

  const mirreredPath = useMemo(
    () =>
      curves
        .flatMap((curve) => curve.getPath())
        .map((v) => new Vector2(v.x, -v.y)),
    [curves]
  );

  return (
    <group position={position}>
      {curves.map((curve) => curve.getElement())}
      {curves.length > 0 && (
        <>
          <Line points={mirreredPath} />
          <DimesionLine
            curveFirstPoint={curves[0].getFirstPoint()}
            curveLastPoint={curves[curves.length - 2].getFirstPoint()}
            rimOutsidePosition={curves[curves.length - 1].getLastPoint()}
          />
        </>
      )}
    </group>
  );
}

// パス編集時に、ヨーヨー全体のパスが表示されるようにしたい
// - ベアリング受けの部分
// - リムに曲線をつけられるようにする
