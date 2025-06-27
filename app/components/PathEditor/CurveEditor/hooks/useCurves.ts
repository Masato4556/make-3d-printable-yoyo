import { useCallback, useState } from "react";
import { useEventStore } from "../../../../stores/useEventStore";
import { useCurveStore } from "../../../../stores/useCurveStore";

export const useCurves = () => {
  const {
    pointMap,
    setPointMap,
    restraints,
    connections,
    setConnections,
    bearingSeat,
    getPath,
  } = useCurveStore();

  const [prevPoints, setPrevPoints] = useState(pointMap.clone());

  // pointの更新をconnectionに伝えて再レンダリングを促す関数dd
  const { publishUpdatePathEvent } = useEventStore();
  const refreshConnections = useCallback(() => {
    restraints.forEach((restraint) => {
      restraint.apply(prevPoints, pointMap);
    });
    setPointMap(pointMap.clone());
    setConnections([...connections]);
    setPrevPoints(pointMap.clone());
    publishUpdatePathEvent();
  }, [
    connections,
    pointMap,
    prevPoints,
    publishUpdatePathEvent,
    restraints,
    setConnections,
    setPointMap,
  ]);

  return {
    points: pointMap,
    connections,
    refreshConnections,
    bearingSeat,
    path: getPath(),
  };
};
