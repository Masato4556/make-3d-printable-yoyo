import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useYoyoGeometry } from "~/hooks/use-yoyo-geometry";
import { ExportStl } from "~/components/model-viewer/export-stl";
import { MeshPhysicalMaterial, Vector3 } from "three";
import { useMirroredGeometry } from "~/hooks/use-mirrored-geometry";
import { useModelDispatch } from "~/contexts/ModelContext";
import { useCallback } from "react";
import { DownoadButton } from "./download-button";

type Props = {
  hidden: boolean;
};

export function ModelViewer(props: Props) {
  const { hidden } = props;
  const dispatch = useModelDispatch();
  const { coreGeometry, wingGeometry } = useYoyoGeometry();
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
    <>
      <Canvas
        id="model-viewer"
        hidden={hidden}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 100],
          type: "OrthographicCamera",
        }}
      >
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
      {!hidden && <DownoadButton />}
    </>
  );
}
