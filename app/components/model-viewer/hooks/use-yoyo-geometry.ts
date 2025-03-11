import { useMemo } from "react";
import { useYoyoPath } from "~/yoyo/yoyo-curve-context";
import { GeometryFactory } from "../geometry/geometry-factory";

export function useYoyoGeometry() {
  const bearingType = "sizeC"; // TODO: ベアリングの種類を選択できるようにする

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
