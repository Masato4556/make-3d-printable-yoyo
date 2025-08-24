import type { MetaFunction, LinksFunction } from "react-router";
import styles from "../styles/index.scss?url";

import { ModelViewer } from "../components/ModelViewer/ModelViewer";
import { YoyoShapeEditor } from "../components/YoyoShapeEditor/YoyoShapeEditor";
import { useModeStore } from "../stores/useModeStore";
import { MenuBar } from "../components/MenuBar/MenuBar";

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
      {mode === "MODEL" && <ModelViewer />}
      {/* パスの状態を維持するためにパスエディターは非表示にするだけ、 */}
      <YoyoShapeEditor hidden={mode !== "PATH"} />
    </div>
  );
}
