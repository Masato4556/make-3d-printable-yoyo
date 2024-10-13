import { useReducer, useState } from "react";
import { CubicBezierCurve3, Vector3 } from "three";
import { CORE_PARAMS } from "~/const/core";
import { useYoyoPathState } from "~/contexts/YoyoPathContext";

function reducerFunc(
  state: CubicBezierCurve3[],
  action: {
    target: "start" | "first_control" | "second_control" | "end";
    index: number;
    v: Vector3;
  }
) {
  const { target, v, index } = action;
  const next_curve = state[index].clone();
  switch (target) {
    case "start":
      next_curve.v0 = v;
      break;
    case "first_control":
      next_curve.v1 = v;
      break;
    case "second_control":
      next_curve.v2 = v;
      break;
    case "end":
      next_curve.v3 = v;
      break;
    default:
      throw new Error(`Not found ${target}`);
  }
  const next_state = [...state];
  next_state[index] = next_curve;
  return next_state;
}

export function useYoyoCurve() {
  const { width, trapezeWidth } = useYoyoPathState();

  // TODO: ベアリングの幅を考慮したサイズになっていないので修正が必要
  const wing_width = trapezeWidth / 2;
  const radius = 55 / 2;
  const [yoyoCurves, yoyoCurvesDispatch] = useReducer(reducerFunc, [
    new CubicBezierCurve3( // ヨーヨーのウィングの初期値
      new Vector3(
        0,
        CORE_PARAMS["sizeC"].radius + 0.2 // コアを覆う幅が必要なので一旦仮で0.2を設定
      ),
      new Vector3(wing_width / 4, CORE_PARAMS["sizeC"].radius + 0.2),
      new Vector3(wing_width / 4, (radius / 3) * 2),
      new Vector3(wing_width / 2, (radius / 3) * 2)
    ),
    new CubicBezierCurve3( // ヨーヨーのウィングの初期値
      new Vector3(wing_width / 2, (radius / 3) * 2),
      new Vector3((wing_width / 4) * 3, (radius / 3) * 2),
      new Vector3((wing_width / 4) * 3, radius),
      new Vector3(wing_width, radius)
    ),
  ]);

  // TODO: YoyoPathProviderにも同様のロジックが存在するので、統一する
  const [rimOutsidePosition, setRimOutsidePosition] = useState(
    new Vector3(width / 2, yoyoCurves[yoyoCurves.length - 1].v3.y)
  );

  return {
    yoyoCurves,
    yoyoCurvesDispatch,
    rimOutsidePosition,
    setRimOutsidePosition,
  };
}
