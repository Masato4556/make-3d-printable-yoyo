import { useMemo } from "react";
import { BufferGeometry } from "three";

export function useMirroredGeometry(geometry: BufferGeometry) {
  const mirroredGeometry = useMemo(() => {
    // ミラーボックスジオメトリの作成
    const mirroredGeometry = geometry.clone();
    mirroredGeometry.scale(-1, 1, 1);
    return mirroredGeometry;
  }, [geometry]);

  return mirroredGeometry;
}
