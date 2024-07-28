import { useReducer } from "react";
import { CubicBezierCurve3, Vector3 } from "three";
import { CORE_PARAMS } from "~/const/core";

function reducerFunc(
  state: CubicBezierCurve3,
  action: {
    target: "start" | "first_control" | "second_control" | "end";
    v: Vector3;
  }
) {
  const { target, v } = action;
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

export function useYoyoCurve(
  diameter: number,
  width: number,
  trapezeWidth: number
) {
  // TODO: ベアリングの幅を考慮したサイズになっていないので修正が必要
  const wing_width = trapezeWidth / 2;
  const radius = diameter / 2;
  const [yoyoCurve, yoyoCurveDispatch] = useReducer(
    reducerFunc,
    new CubicBezierCurve3(
      new Vector3(
        -CORE_PARAMS["sizeC"].height,
        CORE_PARAMS["sizeC"].radius + 0.2 // コアを覆う幅が必要なので一旦仮で0.2を設定
      ),
      new Vector3(-CORE_PARAMS["sizeC"].height + wing_width / 2, radius / 2),
      new Vector3(-CORE_PARAMS["sizeC"].height + wing_width / 2, radius),
      new Vector3(-CORE_PARAMS["sizeC"].height + wing_width, radius)
    )
  );
  return { yoyoCurve, yoyoCurveDispatch };
}
