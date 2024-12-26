import { useEffect, useMemo } from "react";
import { Vector2, Vector3 } from "three";
import {
  useYoyoCurveDispatch,
  useYoyoCurveState,
} from "~/contexts/YoyoCurveContext";
import { YoyoCubicBezierCurve } from "~/contexts/curves/Curve/YoyoCubicBezierCurve";
import { YoyoVerticalLine } from "~/contexts/curves/Curve/YoyoVerticalLine";
import { YoyoHorizontalLine } from "~/contexts/curves/Curve/YoyoHorizontalLine";
import { DimesionLine } from "./dimesion-line";
import { Line } from "@react-three/drei";
import { CurveComponent } from "./curves/CurveComponent";

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
          // new Vector2(5.25, 18.3),
          // new Vector2(10.5, 18.3),
          new Vector2(15.75, 27.5),
          new Vector2(21, 27.5),
          (curve, index) => {
            dispatch({ type: "UPDATE_CURVE", index, curve });
          },
          (curves, index) => {
            dispatch({ type: "DIVIDE_CURVE", index, curves: curves });
          },
          { fixedEdge: "start" }
        ),
        // new YoyoCubicBezierCurve(
        //   new Vector2(10.5, 18.3),
        //   new Vector2(15.75, 18.3),
        //   new Vector2(15.75, 27.5),
        //   new Vector2(21, 27.5),
        //   (curve, index) => {
        //     dispatch({ type: "UPDATE_CURVE", index, curve });
        //   },
        //   (curves, index) => {
        //     dispatch({ type: "DIVIDE_CURVE", index, curves: curves });
        //   }
        // ),
        new YoyoHorizontalLine(
          new Vector2(21, 27.5),
          new Vector2(28, 27.5),
          (curve, index) => {
            dispatch({ type: "UPDATE_CURVE", index, curve });
          }
        ),
        new YoyoVerticalLine(
          new Vector2(28, 27.5),
          new Vector2(28, 0),
          (curve, index) => {
            dispatch({ type: "UPDATE_CURVE", index, curve });
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
      {curves.map((curve) => {
        return <CurveComponent key={curve.id} curve={curve} />;
      })}
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
