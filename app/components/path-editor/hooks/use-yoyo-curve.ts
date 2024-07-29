import { useReducer, useState } from "react";
import { CubicBezierCurve3, Vector3 } from "three";
import { CORE_PARAMS } from "~/const/core";
import { useYoyoPathState } from "~/contexts/YoyoPathContext";

function reducerFunc(
  state: CubicBezierCurve3,
  action:
    | {
        target: "start" | "first_control" | "second_control" | "end";
        v: Vector3;
      }
    | {
        target: "path";
        v: CubicBezierCurve3;
      }
) {
  const { target, v } = action;
  if (target == "path") return v;

  const next_state = state.clone();
  switch (target) {
    case "start":
      next_state.v0 = v;
      break;
    case "first_control":
      next_state.v1 = v;
      break;
    case "second_control":
      next_state.v2 = v;
      break;
    case "end":
      next_state.v3 = v;
      break;
    default:
      throw new Error(`Not found ${target}`);
  }
  return next_state;
}

export function useYoyoCurve() {
  const { width, trapezeWidth } = useYoyoPathState();

  // TODO: ベアリングの幅を考慮したサイズになっていないので修正が必要
  const wing_width = trapezeWidth / 2;
  const radius = 55 / 2;
  const [yoyoCurve, yoyoCurveDispatch] = useReducer(
    reducerFunc,
    new CubicBezierCurve3( // ヨーヨーのウィングの初期値
      new Vector3(
        -CORE_PARAMS["sizeC"].height,
        CORE_PARAMS["sizeC"].radius + 0.2 // コアを覆う幅が必要なので一旦仮で0.2を設定
      ),
      new Vector3(-CORE_PARAMS["sizeC"].height + wing_width / 2, radius / 2),
      new Vector3(-CORE_PARAMS["sizeC"].height + wing_width / 2, radius),
      new Vector3(-CORE_PARAMS["sizeC"].height + wing_width, radius)
    )
  );

  // TODO: YoyoPathProviderにも同様のロジックが存在するので、統一する
  const [rimOutsidePosition, setRimOutsidePosition] = useState(
    new Vector3(width / 2, yoyoCurve.v3.y)
  );

  return {
    yoyoCurve,
    yoyoCurveDispatch,
    rimOutsidePosition,
    setRimOutsidePosition,
  };
}
