import type { MetaFunction } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { YoyoModel } from "~/components/YoyoModel";
import { WineBottle } from "~/components/wine";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// MEMO: 下記のサンプルコードをそのまま表示してみている
// https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div id="canvas-container">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <YoyoModel />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
