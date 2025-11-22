import type { MetaFunction, LinksFunction } from "react-router";
import styles from "../styles/index.scss?url";

import { ModelViewer } from "../components/ModelViewer/ModelViewer";
import { YoyoShapeEditor } from "../components/YoyoShapeEditor/YoyoShapeEditor";
import { Mode, useModeStore } from "../stores/useModeStore";
import { MenuBar } from "../components/MenuBar/MenuBar";
import { Inspector } from "../components/YoyoShapeEditor/inspector/Inspector";

export const meta: MetaFunction = () => [
  { title: "PrintYoYo" },
  {
    name: "description",
    content: "PrintYoYo is 3d printable yoyo generator",
  },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "stylesheet",
    href: "https://raw.githubusercontent.com/Andy-set-studio/modern-css-reset/master/dist/reset.min.css",
  },
];

export default function Index() {
  const { mode } = useModeStore();
  return (
    <div id="canvas-container">
      <MenuBar />
      <ModelViewer hidden={mode !== Mode.MODEL} />
      {/* パスの状態を維持するためにパスエディターは常に表示したまま */}
      <YoyoShapeEditor />
      {/* STL出力とダウンロードボタンはモードに関係なく常に利用可能にする */}
      <Inspector />
    </div>
  );
}
