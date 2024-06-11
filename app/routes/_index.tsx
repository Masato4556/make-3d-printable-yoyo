import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useYoyoGeometry } from "~/hooks/use-yoyo-geometry";
import styles from "~/styles/index.css?url";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { ExportStl } from "~/components/export-stl";
import { LatheGeometry, MeshBasicMaterial, Vector3 } from "three";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://raw.githubusercontent.com/Andy-set-studio/modern-css-reset/master/dist/reset.min.css",
    },
  ];
};

export default function Index() {
  const [diameter, setDiameter] = useState<number>(55);
  const [width, setWidth] = useState<number>(48);
  const [stl, setStl] = useState<string | null>(null);
  const changeDiameter: ChangeEventHandler<HTMLInputElement> = (e) =>
    setDiameter(Number(e.target.value));
  const changeWidth: ChangeEventHandler<HTMLInputElement> = (e) =>
    setWidth(Number(e.target.value));
  const mirroredGeometryRef = useRef<LatheGeometry>();
  const { geometry } = useYoyoGeometry({ diameter, width });

  useEffect(() => {
    // ミラーボックスジオメトリの作成
    const mirroredGeometry = geometry.clone();
    mirroredGeometry.scale(-1, 1, 1);

    // `useRef` に保存して再レンダリング時に変更しないようにする
    mirroredGeometryRef.current = mirroredGeometry;
  }, [geometry]);

  // マテリアル
  const material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

  const downloaStl = () => {
    if (!stl) return;
    const element = document.createElement("a");
    const file = new Blob([stl], { type: "application/stl" });
    element.href = URL.createObjectURL(file);
    element.download = "yoyo.stl";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div id="canvas-container">
      <input
        type="number"
        defaultValue={diameter}
        onChange={changeDiameter}
        min={20}
        max={100}
      />
      <input
        type="number"
        defaultValue={width}
        onChange={changeWidth}
        min={20}
        max={100}
      />
      <button onClick={downloaStl}>ダウンロード</button>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        <group visible={!!mirroredGeometryRef.current}>
          <mesh
            name="yoyo"
            geometry={geometry}
            material={material}
            position={new Vector3(-6, 0, 0)}
          />
          åå
          <mesh
            geometry={mirroredGeometryRef.current}
            material={material}
            position={new Vector3(6, 0, 0)}
          />
        </group>

        <OrbitControls />
        <ExportStl
          setStl={(s: string) => {
            setStl(s);
          }}
        />
      </Canvas>
    </div>
  );
}
