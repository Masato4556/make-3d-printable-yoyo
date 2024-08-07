import type { MetaFunction, LinksFunction } from "@remix-run/node";
import styles from "~/styles/index.scss?url";
import { ModelViewer } from "~/components/model-viewer/model-viewer";
import { ModelProvider } from "~/contexts/ModelContext";
import { PathEditor } from "~/components/path-editor/path-editor";
import { useState } from "react";
import { YoyoPathProvider } from "~/contexts/YoyoPathContext";
import { ModeSwitch } from "~/components/mode-switch/mode-swtich";

export const meta: MetaFunction = () => {
  return [
    { title: "PrintYoYo" },
    {
      name: "description",
      content: "PrintYoYo is 3d printable yoyo generator",
    },
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

// TODO: モード切り替えのロジックのリファクタリング
export type Mode = "path" | "model";

export default function Index() {
  // TODO: MODEの状態管理のリファクタ
  const [mode, setMode] = useState<Mode>("path");
  return (
    <YoyoPathProvider>
      <ModelProvider>
        <div id="canvas-container">
          <ModeSwitch setMode={setMode} />
          <ModelViewer hidden={mode != "model"} />
          <PathEditor hidden={mode != "path"} />
        </div>
      </ModelProvider>
    </YoyoPathProvider>
  );
}
