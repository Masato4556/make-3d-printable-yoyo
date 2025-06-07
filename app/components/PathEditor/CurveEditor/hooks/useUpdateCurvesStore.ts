import { useEffect } from "react";
import { Mode, useModeStore } from "../../../../stores/useModeStore";
import { usePathStore } from "../../../../stores/useCurveStore";
import { Vector2 } from "../../../../math/vector2";

export const useUpdateCurvesStore = (path: Vector2[]) => {
  const { mode } = useModeStore();
  const { setPath } = usePathStore();

  useEffect(() => {
    if (mode === Mode.PATH) {
      return;
    }
    setPath(path);
  }, [mode, path, setPath]);
};
