/**
 * ヨーヨーの3Dモデルを作成するコンポーネント
 */

import { MeshPhysicalMaterial, Vector3 } from "three";
import { BearingGeometry } from "~/const/bearing";
import { BEARING_SEAT_PARAMS } from "~/const/bearingSeat";
import { useMirroredGeometry } from "./hooks/use-mirrored-geometry";
import { useYoyoGeometry } from "./hooks/use-yoyo-geometry";

export function YoyoModel() {
  const { bearingSeatGeometry, wingGeometry } = useYoyoGeometry();
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

  const bearingWidth = BearingGeometry.fromSize("sizeC").width;

  return (
    <group visible={!!bearingSeatGeometry}>
      <group position={new Vector3(-bearingWidth / 2, 0, 0)}>
        <mesh
          name="core"
          geometry={bearingSeatGeometry}
          material={material}
          position={new Vector3(-BEARING_SEAT_PARAMS.sizeC.height, 0, 0)}
        />
        <mesh
          name="wing"
          geometry={wingGeometry}
          material={material}
          position={new Vector3(0, 0, 0)}
        />
      </group>
      <group position={new Vector3(bearingWidth / 2, 0, 0)}>
        <mesh
          geometry={mirroredBearingSeatGeometry}
          material={material}
          position={new Vector3(BEARING_SEAT_PARAMS.sizeC.height, 0, 0)}
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
