import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dispatch, useEffect } from "react";
import { MeshBasicMaterial } from "three";
import {
  useYoyoPathDispatch,
  YoyoPathAction,
} from "~/contexts/YoyoPathContext";
import { DraggableCubicBezierCurve } from "../draggable-cubic-bezier-curve";
import { useYoyoCurve } from "./hooks";

const pointMaterial = new MeshBasicMaterial({ color: "black" });
const curveMaterial = new MeshBasicMaterial({ color: "black" });
const wireMaterial = new MeshBasicMaterial({ color: "grey" });

function EditableYoYoPath(props: {
  hidden: boolean;
  yoyoPathDispatch: Dispatch<YoyoPathAction>;
}) {
  const { hidden, yoyoPathDispatch } = props;
  const { yoyoCurve, yoyoCurveDispatch } = useYoyoCurve();

  // TODO: useEffectを用いない実装にする
  // TODO: DraggableCubicBezierCurveの外側でyoyoPathDispatchを実行するようにする
  useEffect(() => {
    yoyoPathDispatch({ type: "SET_PATH", path: yoyoCurve.getPoints(64) });
  }, [hidden, yoyoPathDispatch]);

  return (
    <DraggableCubicBezierCurve
      bezierCurvePath={yoyoCurve}
      onDragStartPoint={(v) => {
        yoyoCurveDispatch({ target: "start", v });
      }}
      onDragFirstControlPoint={(v) => {
        yoyoCurveDispatch({ target: "first_control", v });
      }}
      onDragSecondControlPoint={(v) => {
        yoyoCurveDispatch({ target: "second_control", v });
      }}
      onDragEndPoint={(v) => {
        yoyoCurveDispatch({ target: "end", v });
      }}
      materials={{
        edgePoint: pointMaterial,
        controlPoint: pointMaterial,
        curve: curveMaterial,
        wire: wireMaterial,
      }}
    />
  );
}

type Props = {
  hidden: boolean;
};

export default function PathEditor(props: Props) {
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
      <EditableYoYoPath hidden={hidden} yoyoPathDispatch={yoyoPathDispatch} />
    </Canvas>
  );
}
