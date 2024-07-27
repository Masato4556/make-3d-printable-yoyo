import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dispatch, useEffect, useMemo } from "react";
import {
  LineCurve3,
  MeshBasicMaterial,
  TubeGeometry,
  Vector2,
  Vector3,
} from "three";
import {
  useYoyoPathDispatch,
  YoyoPathAction,
} from "~/contexts/YoyoPathContext";
import { DraggableCubicBezierCurve } from "../draggable-cubic-bezier-curve";
import { useYoyoCurve } from "./hooks";
import { XAxis } from "./XAxis";

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
    // このパスとコアのパスでx軸とy軸が入れ替わってしまっているため、ここでその違いを吸収する
    // TODO: 軸を揃える
    const path = yoyoCurve.getPoints(64).map((v) => {
      return new Vector2(v.y, v.x);
    });
    // パスを閉じる
    path.push(new Vector2(0, path.at(-1)?.y ?? 0));
    yoyoPathDispatch({
      type: "SET_PATH",
      path,
    });
  }, [hidden, yoyoPathDispatch]);

  const mirrerdYoyoCurveGeometry = useMemo(() => {
    const geometry = new TubeGeometry(yoyoCurve, 64, 0.2);
    geometry.scale(1, -1, -1);
    return geometry;
  }, [yoyoCurve]);

  // TODO: パスに含まれていない最後の直線をつい
  const lastLineGeometry = useMemo(() => {
    const geometry = new TubeGeometry(
      new LineCurve3(
        yoyoCurve.v3,
        new Vector3(yoyoCurve.v3.x, -yoyoCurve.v3.y, 0)
      ),
      64,
      0.2
    );
    return geometry;
  }, [yoyoCurve]);

  return (
    <>
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
        fixedPoints="start"
      />
      <XAxis />
      <mesh geometry={mirrerdYoyoCurveGeometry} material={curveMaterial} />
      <mesh geometry={lastLineGeometry} material={curveMaterial} />
    </>
  );
}

type Props = {
  hidden: boolean;
};

export default function PathEditor(props: Props) {
  const { hidden } = props;
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

// パス編集時に、ヨーヨー全体のパスが表示されるようにしたい
// - ベアリング受けの部分
// - ウィングの反対側
