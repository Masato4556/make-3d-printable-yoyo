import { useMemo } from "react";

import { useGeometryStore } from "../../../stores/useGeometryStore";

/**
 * ヨーヨーのジオメトリを取得するフック
 */
export function useYoyoGeometry() {
  const { wingGeometry, bearing } = useGeometryStore();

  const mirroredWingGeometry = useMemo(() => {
    if (!wingGeometry) {
      return undefined;
    }
    const mirroredGeometry = wingGeometry.clone();
    // 法線が反転するため、X軸だけでなくY軸も反転させる
    mirroredGeometry.scale(-1, -1, 1);

    return mirroredGeometry;
  }, [wingGeometry]);

  return { wingGeometry, mirroredWingGeometry, bearing };
}
