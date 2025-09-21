import { useMemo } from "react";
import { GeometryFactory } from "../GeometryFactory/GeometryFactory";
import { useCurveStore } from "../../../stores/useCurveStore";

export function useYoyoGeometry() {
  const bearingType = "sizeC";

  const { shape } = useCurveStore();

  const result = useMemo(() => {
    const path = shape.getPath();
    const geometryFactory = new GeometryFactory(bearingType, path);
    return {
      bearing: geometryFactory.getBearing(),
      wingGeometry: geometryFactory.getWingGeometry(),
    };
  }, [shape]);

  return result;
}
