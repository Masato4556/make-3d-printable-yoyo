import type { MetaFunction, LinksFunction } from "react-router";
import styles from "../styles/index.scss?url";

import { ModelViewer } from "../components/ModelViewer/ModelViewer";
import { YoyoShapeEditor } from "../components/YoyoShapeEditor/YoyoShapeEditor";
import { Mode, useModeStore } from "../stores/useModeStore";

import { MenuBar } from "../components/MenuBar/MenuBar";
import { Inspector } from "../components/YoyoShapeEditor/inspector/Inspector";
import { SlideModal } from "../components/SliderModal/SlideModal";
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

  /**
   * スライドの草案
   * 1: このサイトは何？
   * 2: ヨーヨーのデザイン方法(パスエディターの使い方)
   * 3: 3Dプレビューの見方(モデルビューアの使い方)
   * 4: ヨーヨーのスペックを確認する方法(インスペクタの使い方)
   * 5: デザインしたヨーヨーを3Dプリントする方法(3Dモデルのエクスポート)
   * 6: 再度このヘルプを見る方法
   */
  const slide: Slide[] = [
    {
      image: {
        url: "/img/waffle.png",
        alt: "Slide 1",
      },
      title: "Welcome to PrintYoYo",
      description:
        "〇〇へようこそ！ 〇〇は3Dプリント可能なヨーヨーをデザインするためのツールです。",
    },
    {
      image: {
        url: "/img/waffle.png",
        alt: "Slide 2",
      },
      title: "パスエディターの使い方",
      description: "hogehoge",
    },
    {
      image: {
        url: "/img/waffle.png",
        alt: "Slide 3",
      },
      title: "モデルビューアの使い方",
      description: "hogehoge",
    },
    {
      image: {
        url: "/img/waffle.png",
        alt: "Slide 4",
      },
      title: "インスペクタの使い方",
      description: "hogehoge",
    },
    {
      image: {
        url: "/img/waffle.png",
        alt: "Slide 5",
      },
      title: "3Dモデルのエクスポート方法",
      description: "hogehoge",
    },
    {
      image: {
        url: "/img/waffle.png",
        alt: "Slide 6",
      },
      title: "再度このヘルプを見る方法",
      description: "hogehoge",
    },
  ];

  return (
    <IconContext.Provider value={{ size: "2rem", color: "fff" }}>
      <div id="canvas-container">
        <SlideModal slide={slide} modalRef={modalRef} />
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
