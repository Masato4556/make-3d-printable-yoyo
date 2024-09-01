import { MeshPhysicalMaterial, Vector3 } from "three";
import { useMirroredGeometry } from "~/hooks/use-mirrored-geometry";
import { useYoyoGeometry } from "~/hooks/use-yoyo-geometry";

export function YoyoModel() {
  const { coreGeometry, wingGeometry } = useYoyoGeometry();
  const mirroredCoreGeometry = useMirroredGeometry(coreGeometry);
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
    <group visible={!!coreGeometry}>
      <mesh
        name="core"
        geometry={coreGeometry}
        material={material}
        position={new Vector3(-10, 0, 0)}
      />
      <mesh
        name="wing"
        geometry={wingGeometry}
        material={material}
        position={new Vector3(-10, 0, 0)}
      />
      <mesh
        geometry={mirroredCoreGeometry}
        material={material}
        position={new Vector3(10, 0, 0)}
      />
      <mesh
        geometry={mirroredWingGeometry}
        material={material}
        position={new Vector3(10, 0, 0)}
      />
    </group>
  );
}
