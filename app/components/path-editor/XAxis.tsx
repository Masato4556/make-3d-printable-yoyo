/**
 * ヨーヨーの軸となるX軸を描画するコンポーネント
 * TODO: konva移行がまだできていないので、要対応
 */
import { useMemo } from "react";
import { LineCurve3, MeshBasicMaterial, TubeGeometry, Vector3 } from "three";

export function XAxis() {
  const { geometry, material } = useMemo(
    () => ({
      geometry: new TubeGeometry(
        new LineCurve3(new Vector3(-1000, 0, 0), new Vector3(1000, 0, 0)),
        64,
        0.1
      ),
      material: new MeshBasicMaterial({ color: "white" }),
    }),
    []
  );

  return <mesh geometry={geometry} material={material} />;
}
