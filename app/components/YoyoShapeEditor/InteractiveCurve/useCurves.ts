import { useCallback } from "react";
import { useEventStore } from "../../../stores/useEventStore";
import { useCurveStore } from "../../../stores/useCurveStore";

export const useCurves = () => {
  const { shape, getPath, movePoint } = useCurveStore();

  const { publishUpdatePathEvent } = useEventStore();

  const updatePointAndRefresh = useCallback(
    (pointId: string, newX: number, newY: number) => {
      movePoint(pointId, newX, newY);
      publishUpdatePathEvent();
    },
    [publishUpdatePathEvent, movePoint]
  );

  return {
    points: shape.getPoints(),
    connections: shape.getConnections(),
    bearingSeat: shape.getBearingSeat(),
    path: getPath(),
    updatePoint: updatePointAndRefresh,
  };
};
