import { useReducer } from "react";
import { CubicBezierCurve3, Vector3 } from "three";

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

export function useYoyoCurve() {
  const [yoyoCurve, yoyoCurveDispatch] = useReducer(
    reducerFunc,
    new CubicBezierCurve3(
      new Vector3(0, 0),
      new Vector3(2, 2),
      new Vector3(10, 20),
      new Vector3(20, 10)
    )
  );
  return { yoyoCurve, yoyoCurveDispatch };
}
