import { useEffect } from "react";
import { useModeStore } from "../../../../stores/useModeStore";
import { usePathStore } from "../../../../stores/useCurveStore";
import { Vector2 } from "../../../../math/vector2";
import { useEventStore } from "../../../../stores/useEventStore";

export const useUpdateCurvesStore = (path: Vector2[]) => {
  const { mode } = useModeStore();
  const { setPath } = usePathStore();
  const { updatePathEvent } = useEventStore();

  useEffect(() => {
    setPath(path);
  }, [mode, path, setPath, updatePathEvent.lastPublished]);
};
