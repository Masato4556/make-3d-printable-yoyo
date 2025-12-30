/**
 * オンデマンドでGeometryを生成するためのフック
 *
 * 呼び出された時に常に最新のgeometryを生成・更新する
 */
import { useCallback } from "react";
import { GeometryFactory } from "../modules/yoyo";
import { useCurveStore } from "../stores/useCurveStore";

export function useGeometryManager() {
  const bearingType = "sizeC";

  const { shape } = useCurveStore();

  const generateGeometry = useCallback(() => {
    const path = shape.getPath();
    const geometryFactory = new GeometryFactory(bearingType, path);
    const wingGeometry = geometryFactory.getWingGeometry();
    return wingGeometry;
  }, [shape]);

  return { generateGeometry };
}
