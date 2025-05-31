import { useMemo } from "react";
import { GeometryFactory } from "../geometry/GeometryFactory";
import { useCurveVectors } from "../../../stores/useCurveStore";

export function useYoyoGeometry() {
  const bearingType = "sizeC";

  const curveVectors = useCurveVectors();

  return useMemo(() => {
    const geometryFactory = new GeometryFactory(bearingType, curveVectors);
    return {
      bearing: geometryFactory.getBearing(),
      wingGeometry: geometryFactory.getWingGeometry(),
    };
  }, [bearingType, curveVectors]);
}
