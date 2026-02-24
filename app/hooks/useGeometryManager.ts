/**
 * オンデマンドでGeometryを生成するためのフック
 *
 * 呼び出された時に常に最新のgeometryを生成・更新する
 */
import { useCallback } from "react";
import { useCurveStore } from "../stores/useCurveStore";
import { createGeometry } from "../modules/yoyo-geometry/createGeometry";

export function useGeometryManager() {
  const bearingType = "sizeC";

  const { shape } = useCurveStore();

  const generateGeometry = useCallback(() => {
    const path = shape.getPath();
    const { wingGeometry } = createGeometry(bearingType, path);
    return wingGeometry;
  }, [shape]);

  return { generateGeometry };
}
