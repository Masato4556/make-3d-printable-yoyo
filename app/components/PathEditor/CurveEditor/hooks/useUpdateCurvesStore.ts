import { useEffect } from "react";
import { Mode, useModeStore } from "../../../../stores/useModeStore";
import { YoyoCurve } from "../../../../yoyo/curves/YoyoCurve";
import { usePathStore } from "../../../../stores/useCurveStore";
import { Vector2 } from "../../../../math/vector2";

export const useUpdateCurvesStore = (curves: YoyoCurve[]) => {
  const { mode } = useModeStore();
  const { setPath } = usePathStore();

  useEffect(() => {
    if (mode === Mode.PATH) {
      return;
    }
    setPath(
      curves.reduce<Vector2[]>((acc, cur) => [...acc, ...cur.getPath()], [])
    );
  }, [curves, mode, setPath]);
};
