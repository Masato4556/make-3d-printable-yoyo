import type { MetaFunction, LinksFunction } from "react-router";
import styles from "../styles/index.scss?url";

import { ModelViewer } from "../components/ModelViewer/ModelViewer";
import { YoyoShapeEditor } from "../components/YoyoShapeEditor/YoyoShapeEditor";
import { Mode, useModeStore } from "../stores/useModeStore";
import { MenuBar } from "../components/MenuBar/MenuBar";
import { Inspector } from "../components/YoyoShapeEditor/inspector/Inspector";
import { SliderModal } from "../components/SliderModal/SliderModal";
import { Slide } from "../components/SliderModal/hooks/useSlider";
import { useRef } from "react";
import { IconContext } from "react-icons";

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
  const modalRef = useRef<HTMLDialogElement>(null);
  const { mode } = useModeStore();
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const slide: Slide[] = [
    {
      image: {
        url: "/slides/slide1.png",
        alt: "Slide 1",
      },
      title: "Welcome to PrintYoYo",
      description: "Create your own 3D printable yoyo designs easily!",
    },
    {
      image: {
        url: "/slides/slide2.png",
        alt: "Slide 2",
      },
      title: "Design Your Yoyo",
      description:
        "Use our intuitive editor to shape your yoyo just the way you want.",
    },
    {
      image: {
        url: "/slides/slide3.png",
        alt: "Slide 3",
      },
      title: "Export and Print",
      description:
        "Export your design as an STL file and print it with your 3D printer.",
    },
  ];

  return (
    <IconContext.Provider value={{ size: "2rem", color: "fff" }}>
      <div id="canvas-container">
        <SliderModal slide={slide} modalRef={modalRef} />
        <MenuBar openModal={openModal} />
        <ModelViewer hidden={mode !== Mode.MODEL} />
        {/* パスの状態を維持するためにパスエディターは常に表示したまま */}
        <YoyoShapeEditor />
        {/* STL出力とダウンロードボタンはモードに関係なく常に利用可能にする */}
        <Inspector />
        {/* TODO: Footerを作成して、その中にInspectorを入れる */}
      </div>
    </IconContext.Provider>
  );
}
