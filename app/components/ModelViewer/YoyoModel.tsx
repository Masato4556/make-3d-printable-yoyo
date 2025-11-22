/**
 * ヨーヨーの3Dモデルを作成するコンポーネント
 */

import { MeshPhysicalMaterial, Vector3 } from "three";
import { useYoyoGeometry } from "./hooks/useYoyoGeometry";

/**
 * ヨーヨーとベアリングが接する面よりも、ヨーヨーのアクセル受けが高いため、その分ずらしてモデルを表示するための定数
 * TODO: ベアリングシートからこの数値を取得できるようにする
 */
const YOYO_OFFSET = 2.3;

export function YoyoModel() {
  const { bearing, wingGeometry, mirroredWingGeometry } = useYoyoGeometry();

  const material = new MeshPhysicalMaterial({
    color: 0xe64349,
    metalness: 0.5,
    roughness: 0.2,
    ior: 1.5,
    reflectivity: 0.8,
    iridescence: 0.5,
    specularColor: 0x000000,
  });

  if (!wingGeometry || !mirroredWingGeometry) {
    return null;
  }

  return (
    <group>
      <group position={new Vector3(-bearing.width / 2 + YOYO_OFFSET, 0, 0)}>
        <mesh
          geometry={wingGeometry}
          material={material}
          position={new Vector3(0, 0, 0)}
        />
      </group>
      <group position={new Vector3(bearing.width / 2 - YOYO_OFFSET, 0, 0)}>
        <mesh
          geometry={mirroredWingGeometry}
          material={material}
          position={new Vector3(0, 0, 0)}
        />
      </group>
      {/* ベアリング */}
      <mesh
        position={new Vector3(0, 0, 0)}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            bearing.outerDiameter / 2,
            bearing.outerDiameter / 2,
            bearing.width,
            32,
          ]}
        />
        <meshPhysicalMaterial color={0xcccccc} metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}
