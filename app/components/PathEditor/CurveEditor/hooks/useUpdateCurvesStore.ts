import { useEffect } from "react";
import { Mode, useModeStore } from "../../../../stores/useModeStore";
import { YoyoCurve } from "../../../../yoyo/curves/YoyoCurve";
import { useCurvesStore } from "../../../../yoyo/YoyoCurveContext";

export const useUpdateCurvesStore = (curves: YoyoCurve[]) => {
  const { mode } = useModeStore();
  const { setCurves: setCurvesStore } = useCurvesStore();

  useEffect(() => {
    if (mode === Mode.PATH) {
      return;
    }
    setCurvesStore(curves);
  }, [curves, setCurvesStore, mode]);
};
