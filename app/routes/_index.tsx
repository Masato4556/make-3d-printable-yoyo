import type { MetaFunction, LinksFunction } from "@remix-run/node";
import styles from "~/styles/index.css?url";
import { FormProvider } from "~/contexts/FormContext";
import { Form } from "~/components/form";
import ModelViewer from "~/components/model-viewer";
import { ModelProvider } from "~/contexts/ModelContext";
import PathViewer from "~/components/path-viewer";
import { useCallback, useState } from "react";
import { YoyoPathProvider } from "~/contexts/YoyoPathContext";

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

// TODO: モード切り替えのロジックのリファクタリング
type Mode = "path" | "model";

export default function Index() {
  const [mode, setMode] = useState<Mode>("model");
  const toggleMode = useCallback(() => {
    setMode(mode == "path" ? "model" : "path");
  }, [mode, setMode]);
  return (
    <FormProvider>
      <YoyoPathProvider>
        <ModelProvider>
          <div id="canvas-container">
            <Form toggleMode={toggleMode} />
            <ModelViewer hidden={mode != "model"} />
            <PathViewer hidden={mode != "path"} />
          </div>
        </ModelProvider>
      </YoyoPathProvider>
    </FormProvider>
  );
}
