/**
 * 作成したヨーヨーの3Dモデルを表示するコンポーネント
 */

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { YoyoModel } from "./YoyoModel";
import { useUpdateYoyoGeometry } from "./hooks/useUpdateYoyoGeometry";

type Props = {
  hidden?: boolean;
};

export function ModelViewer({ hidden }: Props) {
  /**
   * Canvasコンポーネントがhidden状態でもジオメトリの更新を行うために
   * Canvasコンポーネントの外側でジオメトリ更新のフックを呼び出す
   */
  useUpdateYoyoGeometry();

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
        hidden={hidden}
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
