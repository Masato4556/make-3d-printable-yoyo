import { DragControls } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { useMemo } from "react";
import {
  BoxGeometry,
  BufferGeometry,
  Material,
  SphereGeometry,
  Vector3,
} from "three";

const POINT_GEOMETRY: Record<PointShape, BufferGeometry> = {
  circle: new SphereGeometry(1),
  rectangle: new BoxGeometry(1.5, 1.5, 0.01),
};

export type PointShape = "circle" | "rectangle";

export function DraggablePoint(
  props: MeshProps & {
    initialPosition: Vector3;
    onDrag: (vector: Vector3) => void;
    shape?: "circle" | "rectangle";
    material?: Material | Material[] | undefined;
  }
) {
  const { onDrag, initialPosition, shape = "circle", material } = props;
  const geometry = useMemo(() => {
    return POINT_GEOMETRY[shape];
  }, [shape]);
  return (
    <DragControls
      axisLock="z"
      onDrag={(e) => {
        // 移動後のポイントのpositionをonDragに渡す
        const v = initialPosition.clone();
        const move_v = new Vector3();

        move_v.setFromMatrixPosition(e);
        v.add(move_v);

        onDrag(v);
      }}
    >
      <mesh
        geometry={geometry}
        material={material}
        {...props}
        position={initialPosition}
      ></mesh>
    </DragControls>
  );
}