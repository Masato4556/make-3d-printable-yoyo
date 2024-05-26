import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { YoyoModel } from "~/components/3d-model/yoyo-moodel";
import styles from "~/styles/index.css?url";

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

// MEMO: 下記のサンプルコードをそのまま表示してみている
// https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js

export default function Index() {
  return (
    <div id="canvas-container">
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
        <YoyoModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
