import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useYoyoGeometry } from "~/hooks/use-yoyo-geometry";
import { ExportStl } from "~/components/export-stl";
import { MeshBasicMaterial, Vector3 } from "three";
import { useMirroredGeometry } from "~/hooks/use-mirrored-geometry";
import { useFormState } from "~/contexts/FormContext";
import { useModelDispatch } from "~/contexts/ModelContext";
import { useCallback } from "react";

export default function ModelViewer() {
  const { diameter, width } = useFormState();
  const dispatch = useModelDispatch();
  const { geometry } = useYoyoGeometry({ diameter, width });
  const mirroredGeometry = useMirroredGeometry(geometry);

  // マテリアル
  const material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

  const setStl = useCallback(
    (s: string) => {
      dispatch({ type: "SET_STL", payload: s });
    },
    [dispatch]
  );

  return (
    <Canvas id="model-viewer">
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <group visible={!!mirroredGeometry}>
        <mesh
          name="yoyo"
          geometry={geometry}
          material={material}
          position={new Vector3(-6, 0, 0)}
        />
        <mesh
          geometry={mirroredGeometry}
          material={material}
          position={new Vector3(6, 0, 0)}
        />
      </group>

      <OrbitControls />
      <ExportStl
        setStl={(s: string) => {
          setStl(s);
        }}
      />
    </Canvas>
  );
}
