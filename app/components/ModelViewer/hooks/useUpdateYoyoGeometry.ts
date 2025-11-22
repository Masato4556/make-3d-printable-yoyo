import { useEffect } from "react";
import { useCurveStore } from "../../../stores/useCurveStore";
import { useGeometryStore } from "../../../stores/useGeometryStore";

/**
 * ヨーヨーの形状が更新されたときにジオメトリを再計算して更新するフック
 */
export function useUpdateYoyoGeometry() {
  const bearingType = "sizeC";
  const { updateGeometry, shoudUpdate } = useGeometryStore();

  const { shape } = useCurveStore();

  useEffect(() => {
    if (!shoudUpdate) return;
    updateGeometry(bearingType, shape);
  }, [shape, shoudUpdate, updateGeometry]);
}
