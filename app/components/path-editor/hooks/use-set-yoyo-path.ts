import { useEffect } from "react";
import { CubicBezierCurve3, Vector3, Vector2 } from "three";
import { useYoyoPathDispatch } from "~/contexts/YoyoPathContext";

export function useSetYoyoPath(
  yoyoCurve: CubicBezierCurve3,
  rimOutsidePosition: Vector3
) {
  const yoyoPathDispatch = useYoyoPathDispatch();
  useEffect(() => {
    const path = yoyoCurve.getPoints(64).map((v) => {
      return new Vector2(v.x, v.y);
    });
    yoyoPathDispatch({
      type: "SET_WING_PATH",
      path,
    });
    yoyoPathDispatch({
      type: "SET_FLAT_END_POINT",
      value: new Vector2(rimOutsidePosition.x, rimOutsidePosition.y),
    });
  }, [rimOutsidePosition, yoyoCurve, yoyoPathDispatch]);
}
