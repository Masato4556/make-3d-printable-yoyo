import type { MetaFunction, LinksFunction } from "@remix-run/node";
import styles from "~/styles/index.css?url";
import { FormProvider } from "~/contexts/FormContext";
import { Form } from "~/components/form";
import ModelViewer from "~/components/model-viewer";
import { ModelProvider } from "~/contexts/ModelContext";

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
  return (
    <FormProvider>
      <ModelProvider>
        <div id="canvas-container">
          <Form />
          <ModelViewer />
        </div>
      </ModelProvider>
    </FormProvider>
  );
}
