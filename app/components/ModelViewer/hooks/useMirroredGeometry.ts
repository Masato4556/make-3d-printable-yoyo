/**
 * 左右反転したジオメトリを返すカスタムフック
 */

import { useMemo } from "react";
import { BufferGeometry } from "three";

export function useMirroredGeometry(geometry: BufferGeometry) {
  const mirroredGeometry = useMemo(() => {
    const mirroredGeometry = geometry.clone();
    // 法線が反転するため、X軸だけでなくY軸も反転させる
    mirroredGeometry.scale(-1, -1, 1);

    return mirroredGeometry;
  }, [geometry]);

  return mirroredGeometry;
}
