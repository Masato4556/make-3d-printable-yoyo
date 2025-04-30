/**
 * ヨーヨーの3Dモデルを作成するコンポーネント
 */

import { MeshPhysicalMaterial, Vector3 } from "three";
import { useMirroredGeometry } from "./hooks/useMirroredGeometry";
import { useYoyoGeometry } from "./hooks/useYoyoGeometry";
import { MODEL_NAME } from "./ExportStl";

export function YoyoModel() {
  const { bearing, bearingSeatGeometry, bearingSeatHeight, wingGeometry } =
    useYoyoGeometry();
  const mirroredBearingSeatGeometry = useMirroredGeometry(bearingSeatGeometry);
  const mirroredWingGeometry = useMirroredGeometry(wingGeometry);

  const material = new MeshPhysicalMaterial({
    color: 0xe64349,
    metalness: 0.5,
    roughness: 0.2,
    ior: 1.5,
    reflectivity: 0.8,
    iridescence: 0.5,
    specularColor: 0x000000,
  });

  return (
    <group visible={!!bearingSeatGeometry}>
      <group position={new Vector3(-bearing.width / 2, 0, 0)}>
        <mesh
          name={MODEL_NAME.BEARING_SEAT}
          geometry={bearingSeatGeometry}
          material={material}
          position={new Vector3(-bearingSeatHeight, 0, 0)}
        />
        <mesh
          name={MODEL_NAME.WING}
          geometry={wingGeometry}
          material={material}
          position={new Vector3(0, 0, 0)}
        />
      </group>
      <group position={new Vector3(bearing.width / 2, 0, 0)}>
        <mesh
          geometry={mirroredBearingSeatGeometry}
          material={material}
          position={new Vector3(bearingSeatHeight, 0, 0)}
        />
        <mesh
          geometry={mirroredWingGeometry}
          material={material}
          position={new Vector3(0, 0, 0)}
        />
      </group>
    </group>
  );
}
