import { useDebounce } from "react-use";
import { Vector3, Vector2 } from "three";
import { useYoyoPathDispatch } from "~/contexts/YoyoPathContext";

export function useSetYoyoPath(
  yoyoCurve: Vector3[],
  rimOutsidePosition: Vector3
) {
  const yoyoPathDispatch = useYoyoPathDispatch();
  useDebounce(
    () => {
      const path = yoyoCurve.map((v) => {
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
    },
    500,
    [rimOutsidePosition, yoyoCurve, yoyoPathDispatch]
  );
}
