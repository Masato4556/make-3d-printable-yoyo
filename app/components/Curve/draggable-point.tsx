import { DragControls } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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
    position: Vector3;
    onDrag: (vector: Vector3) => void;
    shape?: "circle" | "rectangle";
    material?: Material | Material[] | undefined;
    fixed?: boolean;
    dragLimits?: [
      [number, number] | undefined,
      [number, number] | undefined,
      [number, number] | undefined
    ];
  }
) {
  const {
    onDrag,
    position,
    shape = "circle",
    material,
    fixed,
    dragLimits,
  } = props;
  const positionRef = useRef(position);
  const geometry = useMemo(() => {
    return POINT_GEOMETRY[shape];
  }, [shape]);
  if (fixed) {
    return (
      <mesh
        geometry={geometry}
        material={material}
        {...props}
        position={positionRef.current}
      ></mesh>
    );
  }
  return (
    <DragControls
      axisLock="z"
      onDrag={(e) => {
        // 移動後のポイントのpositionをonDragに渡す
        const v = positionRef.current.clone();
        const move_v = new Vector3();

        move_v.setFromMatrixPosition(e);
        v.add(move_v);

        onDrag(v);
      }}
      onHover={(hovering) => {
        // 操作できるポイントの上にカーソルがあるときはカーソルを掴むカーソルに変更
        document.body.style.cursor = hovering ? "grab" : "auto";
      }}
      dragLimits={dragLimits}
    >
      <mesh
        geometry={geometry}
        material={material}
        {...props}
        position={positionRef.current}
      ></mesh>
    </DragControls>
  );
}
