import { useCallback } from "react";
import { useEventStore } from "../../../../stores/useEventStore";
import { useCurveStore } from "../../../../stores/useCurveStore";

export const useCurves = () => {
  const { pointMap, connections, bearingSeat, getPath, updatePoint } =
    useCurveStore();

  const { publishUpdatePathEvent } = useEventStore();

  const updatePointAndRefresh = useCallback(
    (pointId: string, newX: number, newY: number) => {
      updatePoint(pointId, newX, newY);
      publishUpdatePathEvent();
    },
    [publishUpdatePathEvent, updatePoint]
  );

  return {
    points: pointMap,
    connections,
    bearingSeat,
    path: getPath(),
    updatePoint: updatePointAndRefresh,
  };
};
