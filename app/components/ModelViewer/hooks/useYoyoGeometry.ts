import { useMemo } from "react";
import { GeometryFactory } from "../geometry/GeometryFactory";
import { useYoyoPath } from "../../../yoyo/YoyoCurveContext";

export function useYoyoGeometry() {
  const bearingType = "sizeC";

  const { yoyoPath } = useYoyoPath();

  return useMemo(() => {
    const geometryFactory = new GeometryFactory(bearingType, yoyoPath);
    const bearingSeat = geometryFactory.getBearingSeat();
    return {
      bearing: geometryFactory.getBearing(),
      bearingSeatGeometry: bearingSeat.getGeometry(),
      bearingSeatHeight: bearingSeat.getHeight(),
      wingGeometry: geometryFactory.getWingGeometry(),
    };
  }, [bearingType, yoyoPath]);
}
