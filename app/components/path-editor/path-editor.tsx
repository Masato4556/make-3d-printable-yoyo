import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { MeshBasicMaterial, Vector3 } from "three";
import { DraggableCubicBezierCurve } from "./draggable-cubic-bezier-curve";
import { useYoyoCurve } from "./hooks/use-yoyo-curve";
import { XAxis } from "./XAxis";
import { DraggablePoint } from "./draggable-point";
import { useSetYoyoPath } from "./hooks/use-set-yoyo-path";
import { useLineGeometry } from "./hooks/use-line-geometry";

const pointMaterial = new MeshBasicMaterial({ color: "black" });
const curveMaterial = new MeshBasicMaterial({ color: "black" });
const wireMaterial = new MeshBasicMaterial({ color: "grey" });

function EditableYoYoPath() {
  const {
    yoyoCurve,
    yoyoCurveDispatch,
    rimOutsidePosition,
    setRimOutsidePosition,
  } = useYoyoCurve();

  const rimPosition = useMemo(() => {
    return new Vector3(rimOutsidePosition.x, 0);
  }, [rimOutsidePosition]);

  useSetYoyoPath(yoyoCurve, rimOutsidePosition);

  const {
    mirrerdYoyoCurveGeometry,
    flatLineGeometry,
    mirreredFlatLineGeometry,
    lastLineGeometry,
  } = useLineGeometry(yoyoCurve, rimOutsidePosition);

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
          setRimOutsidePosition(new Vector3(rimOutsidePosition.x, v.y));
        }}
        materials={{
          edgePoint: pointMaterial,
          controlPoint: pointMaterial,
          curve: curveMaterial,
          wire: wireMaterial,
        }}
        fixedPoints="start"
      />
      <DraggablePoint
        position={rimPosition}
        onDrag={(v) => {
          setRimOutsidePosition(new Vector3(v.x, rimOutsidePosition.y));
        }}
        material={pointMaterial}
        dragLimits={[undefined, [0, 0], [0, 0]]}
      />
      <XAxis />

      <mesh geometry={mirrerdYoyoCurveGeometry} material={curveMaterial} />
      <mesh geometry={mirreredFlatLineGeometry} material={curveMaterial} />
      <mesh geometry={flatLineGeometry} material={curveMaterial} />
      <mesh geometry={lastLineGeometry} material={curveMaterial} />
    </>
  );
}

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
        <EditableYoYoPath />
      </Canvas>
    </>
  );
}

// パス編集時に、ヨーヨー全体のパスが表示されるようにしたい
// - ベアリング受けの部分
// - リムに曲線をつけられるようにする
