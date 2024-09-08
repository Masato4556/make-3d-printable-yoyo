import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Vector3 } from "three";

import { BACKGROUND_COLOR } from "~/styles/const";
import { EditableYoyoPath } from "./editable-yoyo-path/editable-yoyo-path";
import { XAxis } from "./XAxis";

type Props = {
  hidden: boolean;
};

export function PathEditor(props: Props) {
  const { hidden } = props;

  return (
    <>
      <Canvas
        id="path-viewer"
        hidden={hidden}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [25, 0, 100],
          lookAt: () => new Vector3(50, 0, 0),
          type: "OrthographicCamera",
        }}
        style={{ background: BACKGROUND_COLOR }}
      >
        <Environment
          preset={"night"}
          background={false}
          backgroundBlurriness={2.0}
          backgroundIntensity={5.7}
        />
        <EditableYoyoPath />
        <XAxis />
      </Canvas>
    </>
  );
}
