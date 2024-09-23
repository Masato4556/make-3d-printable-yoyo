import { Environment, Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Vector2, Vector3 } from "three";

import { BACKGROUND_COLOR } from "~/styles/const";
import { EditableYoyoPath } from "./editable-yoyo-path/editable-yoyo-path";
import { XAxis } from "./XAxis";
import { Inspector } from "./inspector/inspector";
import { useYoyoPath } from "~/contexts/YoyoPathContext";
import { BEARING_SIZE } from "~/const/bearing";

type Props = {
  hidden: boolean;
};

export function PathEditor(props: Props) {
  const { hidden } = props;
  const { yoyoPath } = useYoyoPath();

  return (
    <>
      <Canvas
        id="path-viewer"
        hidden={hidden}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 100],
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

        <EditableYoyoPath
          position={new Vector3(BEARING_SIZE.sizeC.width / 2, 0, 0)}
        />
        <Line // 編集できない反対側のパス
          points={genMirrerdPath(yoyoPath)}
          position={new Vector3(-BEARING_SIZE.sizeC.width / 2, 0, 0)}
        />

        <XAxis />
        <OrbitControls
          target={new Vector3(0, 0, 0)}
          enableZoom // マウスホイールでズーム
          enablePan // 右クリックでパン
          enableRotate={false}
        />
      </Canvas>
      {!hidden && <Inspector />}
    </>
  );
}

const genMirrerdPath = (path: Vector2[]) => {
  const mirreredPath = path
    .map((point) => new Vector3(point.x, -point.y, 0))
    .reverse();
  return [...path, ...mirreredPath].map(
    (point) => new Vector3(-point.x, point.y, 0)
  );
};
