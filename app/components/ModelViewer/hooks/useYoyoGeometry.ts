import { useMemo } from "react";
import { GeometryFactory } from "../geometry/GeometryFactory";
import { useCurveStore } from "../../../stores/useCurveStore";

export function useYoyoGeometry() {
  const bearingType = "sizeC";

  const { getPath } = useCurveStore();

  return useMemo(() => {
    const path = getPath();
    const geometryFactory = new GeometryFactory(bearingType, path);
    return {
      bearing: geometryFactory.getBearing(),
      wingGeometry: geometryFactory.getWingGeometry(),
    };
  }, [getPath]);
}
