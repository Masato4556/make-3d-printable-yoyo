/**
 * 作成したヨーヨーの3Dモデルを表示するコンポーネント
 */

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { DownoadButton } from "./DownoadButton/DownoadButton";
import { YoyoModel } from "./YoyoModel";
import { ExportStl } from "./ExportStl";

type Props = {
  hidden: boolean;
};

export function ModelViewer(props: Props) {
  const { hidden } = props;

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
        <ExportStl />
      </Canvas>
      {!hidden && <DownoadButton />}
    </>
  );
}
