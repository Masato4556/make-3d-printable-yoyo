import type { MetaFunction, LinksFunction } from "@remix-run/node";
import styles from "~/styles/index.css?url";
import { useState } from "react";
import { FormProvider } from "~/contexts/FormContext";
import { Form } from "~/components/form";
import ModelViewer from "~/components/model-viewer";

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
  // TODO: stlダウンロード周りのデータもcontextに持たせる
  const [stl, setStl] = useState<string | null>(null);

  const downloadStl = () => {
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
    <FormProvider>
      <div id="canvas-container">
        <Form downloadStl={downloadStl} />
        <ModelViewer setStl={setStl} />
      </div>
    </FormProvider>
  );
}
