import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useYoyoGeometry } from "~/hooks/use-yoyo-geometry";
import styles from "~/styles/index.css?url";
import { ChangeEventHandler, useState } from "react";
import { ExportStl } from "~/components/export-stl";

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
  const [diameter, setDiameter] = useState<number>(30);
  const [width, setWidth] = useState<number>(25);
  const [stl, setStl] = useState<string | null>(null);
  const changeDiameter: ChangeEventHandler<HTMLInputElement> = (e) =>
    setDiameter(Number(e.target.value));
  const changeWidth: ChangeEventHandler<HTMLInputElement> = (e) =>
    setWidth(Number(e.target.value));
  const { geometry } = useYoyoGeometry({ diameter, width });

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
        <mesh geometry={geometry}>
          <meshStandardMaterial attach="material" color={"#6be092"} />
        </mesh>
        <OrbitControls />
        <ExportStl
          setStl={(s: string) => {
            console.log(s);
            setStl(s);
          }}
        />
      </Canvas>
    </div>
  );
}
