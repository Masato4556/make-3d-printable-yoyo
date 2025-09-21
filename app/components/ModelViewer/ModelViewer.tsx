/**
 * 作成したヨーヨーの3Dモデルを表示するコンポーネント
 */

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { YoyoModel } from "./YoyoModel";

export function ModelViewer() {
  return (
    <>
      <Canvas
        id="model-viewer"
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 100],
          type: "OrthographicCamera",
        }}
        className="background"
      >
        <Environment
          preset={"night"}
          background={false}
          backgroundBlurriness={2.0}
          backgroundIntensity={5.7}
        />
        <YoyoModel />
        <ambientLight intensity={0.5} />

        <OrbitControls />
      </Canvas>
    </>
  );
}
