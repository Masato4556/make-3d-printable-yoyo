import { useMemo } from "react";
import { useYoyoCurve } from "../hooks/use-yoyo-curve";
import { BufferGeometry, Vector3 } from "three";
import { useSetYoyoPath } from "../hooks/use-set-yoyo-path";
import { useLineGeometry } from "../hooks/use-line-geometry";
import { DraggablePoint } from "./draggable-point";
import { XAxis } from "../XAxis";
import { Text3D } from "@react-three/drei";
import { DraggableCubicBezierCurve } from "./draggable-cubic-bezier-curve";
import {
  pointMaterial,
  curveMaterial,
  wireMaterial,
  lineMaterial,
} from "./material";

export function EditableYoyoPath() {
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

  const { leftEdgeLine, rightEdgeLine, widhtLineGeometry } = useMemo(() => {
    const leftEdgeLine = new BufferGeometry().setFromPoints([
      new Vector3(yoyoCurve.v0.x, yoyoCurve.v0.y, 0),
      new Vector3(yoyoCurve.v0.x, yoyoCurve.v3.y + 13, 0),
    ]);
    const rightEdgeLine = new BufferGeometry().setFromPoints([
      new Vector3(rimOutsidePosition.x, yoyoCurve.v3.y, 0),
      new Vector3(rimOutsidePosition.x, yoyoCurve.v3.y + 13, 0),
    ]);

    const widhtLineGeometry = new BufferGeometry().setFromPoints([
      new Vector3(yoyoCurve.v0.x, yoyoCurve.v3.y + 10, 0),
      new Vector3(rimOutsidePosition.x, yoyoCurve.v3.y + 10, 0),
    ]);

    // const positions = new
    return {
      leftEdgeLine,
      rightEdgeLine,
      widhtLineGeometry,
    };
  }, [rimOutsidePosition.x, yoyoCurve.v0.x, yoyoCurve.v0.y, yoyoCurve.v3.y]);

  const { upperEdgeLine, bottomEdgeLine, heightLineGeometry } = useMemo(() => {
    const upperEdgeLine = new BufferGeometry().setFromPoints([
      new Vector3(rimOutsidePosition.x, yoyoCurve.v3.y, 0),
      new Vector3(rimOutsidePosition.x + 15, yoyoCurve.v3.y, 0),
    ]);
    const bottomEdgeLine = new BufferGeometry().setFromPoints([
      new Vector3(rimOutsidePosition.x, -yoyoCurve.v3.y, 0),
      new Vector3(rimOutsidePosition.x + 15, -yoyoCurve.v3.y, 0),
    ]);

    const heightLineGeometry = new BufferGeometry().setFromPoints([
      new Vector3(rimOutsidePosition.x + 10, yoyoCurve.v3.y, 0),
      new Vector3(rimOutsidePosition.x + 10, -yoyoCurve.v3.y, 0),
    ]);

    // const positions = new
    return {
      upperEdgeLine,
      bottomEdgeLine,
      heightLineGeometry,
    };
  }, [rimOutsidePosition.x, yoyoCurve.v3.y]);

  const { flatLeftEdgeLine, flatRightEdgeLine, flatWidthLine } = useMemo(() => {
    const flatLeftEdgeLine = new BufferGeometry().setFromPoints([
      new Vector3(yoyoCurve.v3.x, -yoyoCurve.v3.y, 0),
      new Vector3(yoyoCurve.v3.x, -yoyoCurve.v3.y - 15, 0),
    ]);
    const flatRightEdgeLine = new BufferGeometry().setFromPoints([
      new Vector3(rimOutsidePosition.x, -yoyoCurve.v3.y, 0),
      new Vector3(rimOutsidePosition.x, -yoyoCurve.v3.y - 15, 0),
    ]);

    const flatWidthLine = new BufferGeometry().setFromPoints([
      new Vector3(yoyoCurve.v3.x, -yoyoCurve.v3.y - 10, 0),
      new Vector3(rimOutsidePosition.x, -yoyoCurve.v3.y - 10, 0),
    ]);

    // const positions = new
    return {
      flatLeftEdgeLine,
      flatRightEdgeLine,
      flatWidthLine,
    };
  }, [rimOutsidePosition.x, yoyoCurve.v3.x, yoyoCurve.v3.y]);

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

      <Text3D
        font={"/font/Roboto_Regular.json"}
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={new Vector3(yoyoCurve.v0.x, yoyoCurve.v3.y + 14, 0)}
      >
        {`${(rimPosition.x - yoyoCurve.v0.x).toFixed(2)}mm`}
      </Text3D>
      <line geometry={leftEdgeLine} material={lineMaterial} />
      <line geometry={rightEdgeLine} material={lineMaterial} />
      <line geometry={widhtLineGeometry} material={lineMaterial} />

      <Text3D
        font={"/font/Roboto_Regular.json"} // TODO: フォントの指定の仕方をリファクタリングする
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={new Vector3(rimOutsidePosition.x + 15, 2, 0)}
      >
        {`${(yoyoCurve.v3.y * 2).toFixed(2)}mm`}
      </Text3D>
      <line geometry={upperEdgeLine} material={lineMaterial} />
      <line geometry={bottomEdgeLine} material={lineMaterial} />
      <line geometry={heightLineGeometry} material={lineMaterial} />

      <Text3D
        font={"/font/Roboto_Regular.json"}
        height={0.0001}
        scale={4}
        material={curveMaterial}
        position={new Vector3(yoyoCurve.v3.x, -yoyoCurve.v3.y - 20, 0)}
      >
        {`${(rimOutsidePosition.x - yoyoCurve.v3.x).toFixed(2)}mm`}
      </Text3D>
      <line geometry={flatLeftEdgeLine} material={lineMaterial} />
      <line geometry={flatRightEdgeLine} material={lineMaterial} />
      <line geometry={flatWidthLine} material={lineMaterial} />
    </>
  );
}

// パス編集時に、ヨーヨー全体のパスが表示されるようにしたい
// - ベアリング受けの部分
// - リムに曲線をつけられるようにする
