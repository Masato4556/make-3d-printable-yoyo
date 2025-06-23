import { useMemo } from "react";
import { GeometryFactory } from "../geometry/GeometryFactory";
import { usePathStore } from "../../../stores/usePathStore";

export function useYoyoGeometry() {
  const bearingType = "sizeC";

  const { path } = usePathStore();

  return useMemo(() => {
    const geometryFactory = new GeometryFactory(bearingType, path);
    return {
      bearing: geometryFactory.getBearing(),
      wingGeometry: geometryFactory.getWingGeometry(),
    };
  }, [path]);
}
