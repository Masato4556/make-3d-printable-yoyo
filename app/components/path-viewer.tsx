import { DragControls, Environment } from "@react-three/drei";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Dispatch, useEffect, useMemo, useReducer, useRef } from "react";
import {
  BoxGeometry,
  BufferGeometry,
  CubicBezierCurve3,
  LineCurve3,
  MeshBasicMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import {
  useYoyoPathDispatch,
  YoyoPathAction,
} from "~/contexts/YoyoPathContext";

type PointShape = "circle" | "rectangle";
const POINT_GEOMETRY: Record<PointShape, BufferGeometry> = {
  circle: new SphereGeometry(1),
  rectangle: new BoxGeometry(1.5, 1.5, 0.01),
};
const globalMaterial = new MeshBasicMaterial({ color: "black" });
const controlWireMaterial = new MeshBasicMaterial({ color: "grey" });

function DraggablePoint(
  props: MeshProps & {
    initialPosition: Vector3;
    onDrag: (vector: Vector3) => void;
    shape?: "circle" | "rectangle";
  }
) {
  const { onDrag, initialPosition, shape = "circle" } = props;
  const geometry = useMemo(() => {
    return POINT_GEOMETRY[shape];
  }, [shape]);
  return (
    <DragControls
      axisLock="z"
      onDrag={(e) => {
        const v = initialPosition.clone();
        const move_v = new Vector3();

        move_v.setFromMatrixPosition(e);
        v.add(move_v);

        onDrag(v);
      }}
    >
      <mesh
        geometry={geometry}
        material={globalMaterial}
        {...props}
        position={initialPosition}
      ></mesh>
    </DragControls>
  );
}

function reducerFunc(
  state: CubicBezierCurve3,
  action: {
    target: "start" | "first_control" | "second_control" | "end";
    v: Vector3;
  }
) {
  const { target, v } = action;
  const next_state = state.clone();
  switch (target) {
    case "start":
      next_state.v0 = v;
      break;
    case "first_control":
      next_state.v1 = v;
      break;
    case "second_control":
      next_state.v2 = v;
      break;
    case "end":
      next_state.v3 = v;
      break;
    default:
      throw new Error(`Not found ${target}`);
  }
  return next_state;
}

function DraggableCubicBezierCurve(props: {
  hidden: boolean;
  yoyoPathDispatch: Dispatch<YoyoPathAction>;
}) {
  const { hidden, yoyoPathDispatch } = props;
  const [bezierCurvePath, bezierCurveDispatch] = useReducer(
    reducerFunc,
    new CubicBezierCurve3(
      new Vector3(0, 0),
      new Vector3(2, 2),
      new Vector3(10, 20),
      new Vector3(20, 10)
    )
  );
  const initialbezierCurvePath = useRef(bezierCurvePath.clone());
  const { bezierCurveGeometry, controlWire1, controlWire2 } = useMemo(() => {
    return {
      bezierCurveGeometry: new TubeGeometry(bezierCurvePath, 64, 0.1),
      controlWire1: new TubeGeometry(
        new LineCurve3(bezierCurvePath.v0, bezierCurvePath.v1),
        64,
        0.1
      ),
      controlWire2: new TubeGeometry(
        new LineCurve3(bezierCurvePath.v2, bezierCurvePath.v3),
        64,
        0.1
      ),
    };
  }, [bezierCurvePath]);

  // TODO: useEffectを用いない実装にする
  // TODO: DraggableCubicBezierCurveの外側でyoyoPathDispatchを実行するようにする
  useEffect(() => {
    yoyoPathDispatch({ type: "SET_PATH", path: bezierCurvePath.getPoints(64) });
  }, [hidden, yoyoPathDispatch]);

  return (
    <>
      <mesh geometry={bezierCurveGeometry} material={globalMaterial} />
      <mesh geometry={controlWire1} material={controlWireMaterial} />
      <mesh geometry={controlWire2} material={controlWireMaterial} />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v0}
        onDrag={(v) => {
          bezierCurveDispatch({ target: "start", v });
        }}
      />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v1}
        onDrag={(v) => {
          bezierCurveDispatch({ target: "first_control", v });
        }}
        shape={"rectangle"}
      />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v2}
        onDrag={(v) => {
          bezierCurveDispatch({ target: "second_control", v });
        }}
        shape={"rectangle"}
      />
      <DraggablePoint
        initialPosition={initialbezierCurvePath.current.v3}
        onDrag={(v) => {
          bezierCurveDispatch({ target: "end", v });
        }}
      />
    </>
  );
}

type Props = {
  hidden: boolean;
};

export default function PathViewer(props: Props) {
  const { hidden } = props;
  // TODO: 画面を3Dモデル表示に切り替えるタイミングで、yoyoのpathをproviderのdispath経由で登録
  const yoyoPathDispatch = useYoyoPathDispatch();

  return (
    <Canvas
      id="path-viewer"
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
      <DraggableCubicBezierCurve
        hidden={hidden}
        yoyoPathDispatch={yoyoPathDispatch}
      />
    </Canvas>
  );
}

// TODO: ファイル分割
