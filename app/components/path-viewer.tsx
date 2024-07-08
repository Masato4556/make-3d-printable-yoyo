import { DragControls, Environment } from "@react-three/drei";
import { Canvas, MeshProps } from "@react-three/fiber";
import { MeshBasicMaterial, SphereGeometry } from "three";

const globalGeometry = new SphereGeometry(1);
const globalMaterial = new MeshBasicMaterial({ color: "black" });

function DraggablePoint(props: MeshProps) {
  return (
    <DragControls>
      <mesh
        {...props}
        geometry={globalGeometry}
        material={globalMaterial}
      ></mesh>
    </DragControls>
  );
}

type Props = {
  hidden: boolean;
};

export default function PathViewer(props: Props) {
  const { hidden } = props;
  return (
    <Canvas
      id="path-viewer"
      hidden={hidden}
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 100] }}
    >
      <Environment
        preset="studio"
        background={true}
        backgroundBlurriness={2.0}
        backgroundIntensity={0.7}
      />
      <DraggablePoint />
    </Canvas>
  );
}
