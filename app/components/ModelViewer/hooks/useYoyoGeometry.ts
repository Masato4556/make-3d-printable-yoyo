import { useMemo } from "react";
import { GeometryFactory } from "../geometry/GeometryFactory";
import { useCurveVectors } from "../../../yoyo/YoyoCurveContext";

export function useYoyoGeometry() {
  const bearingType = "sizeC";

  const curveVectors = useCurveVectors();

  return useMemo(() => {
    const geometryFactory = new GeometryFactory(bearingType, curveVectors);
    const bearingSeat = geometryFactory.getBearingSeat();
    return {
      bearing: geometryFactory.getBearing(),
      bearingSeatGeometry: bearingSeat.getGeometry(),
      bearingSeatHeight: bearingSeat.getHeight(),
      wingGeometry: geometryFactory.getWingGeometry(),
    };
  }, [bearingType, curveVectors]);
}
