import type { MetaFunction, LinksFunction } from "react-router";
import styles from "~/styles/index.scss?url";
import { ModelViewer } from "~/components/model-viewer/model-viewer";
import { PathEditor } from "~/components/path-editor/path-editor";
import { useState } from "react";
import { ModeSwitch } from "~/components/mode-switch/mode-swtich";
import { YoyoCurveProvider } from "~/yoyo/yoyo-curve-context";

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

export type Mode = "path" | "model";

export default function Index() {
  const [mode, setMode] = useState<Mode>("path");
  return (
    <YoyoCurveProvider>
      <div id="canvas-container">
        <ModeSwitch setMode={setMode} />
        <ModelViewer hidden={mode !== "model"} />
        <PathEditor hidden={mode !== "path"} />
      </div>
    </YoyoCurveProvider>
  );
}
