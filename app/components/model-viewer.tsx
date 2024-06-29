import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useYoyoGeometry } from "~/hooks/use-yoyo-geometry";
import { ExportStl } from "~/components/export-stl";
import { MeshPhysicalMaterial, Vector3 } from "three";
import { useMirroredGeometry } from "~/hooks/use-mirrored-geometry";
import { useFormState } from "~/contexts/FormContext";
import { useModelDispatch } from "~/contexts/ModelContext";
import { useCallback } from "react";

export default function ModelViewer() {
  const { diameter, width } = useFormState();
  const dispatch = useModelDispatch();
  const { coreGeometry, wingGeometry } = useYoyoGeometry({
    diameter,
    width,
  });
  const mirroredCoreGeometry = useMirroredGeometry(coreGeometry);
  const mirroredWingGeometry = useMirroredGeometry(wingGeometry);

  const material = new MeshPhysicalMaterial({
    color: 0x00ff00,
    metalness: 1,
    roughness: 0.4,
  });

  const setCore = useCallback(
    (s: string) => {
      dispatch({ type: "SET_CORE", payload: s });
    },
    [dispatch]
  );

  const setWing = useCallback(
    (s: string) => {
      dispatch({ type: "SET_WING", payload: s });
    },
    [dispatch]
  );

  return (
    <Canvas id="model-viewer">
      <Environment
        preset="studio"
        background={true}
        backgroundBlurriness={2.0}
        backgroundIntensity={0.7}
      />
      <group visible={!!coreGeometry}>
        <mesh
          name="core"
          geometry={coreGeometry}
          material={material}
          position={new Vector3(-6, 0, 0)}
        />
        <mesh
          name="wing"
          geometry={wingGeometry}
          material={material}
          position={new Vector3(-6, 0, 0)}
        />
        <mesh
          geometry={mirroredCoreGeometry}
          material={material}
          position={new Vector3(6, 0, 0)}
        />
        <mesh
          geometry={mirroredWingGeometry}
          material={material}
          position={new Vector3(6, 0, 0)}
        />
      </group>

      <OrbitControls />
      <ExportStl
        setCore={(s: string) => {
          setCore(s);
        }}
        setWing={(s: string) => {
          setWing(s);
        }}
      />
    </Canvas>
  );
}
