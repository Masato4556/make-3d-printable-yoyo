import type { MetaFunction, LinksFunction } from "react-router";
import styles from "../styles/index.scss?url";

import { useState } from "react";
import { YoyoCurveProvider } from "../yoyo/YoyoCurveContext";
import { ModeSwitch } from "../components/ModeSwitch/ModeSwitch";
import { ModelViewer } from "../components/ModelViewer/ModelViewer";
import { PathEditor } from "../components/PathEditor/PathEditor";
import { Mode } from "../types/mode";

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
