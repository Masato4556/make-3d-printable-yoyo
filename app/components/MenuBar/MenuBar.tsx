import { BuyMeACoffee } from "./components/BuyMeACoffee/BuyMeACoffee";
import { ModeSwitch } from "./components/ModeSwitch/ModeSwitch";
import { DownloadButton } from "./components/DownloadButton/DownloadButton";
import classes from "./style.module.scss";
import { IconButton } from "../IconButton/IconButton";
import { FaQuestionCircle } from "react-icons/fa";

type Props = {
  openModal: () => void;
};

export function MenuBar({ openModal }: Props) {
  return (
    <header className={classes["menu-bar"]}>
      <div className={classes["menu-bar-left"]}>
        <IconButton icon={<FaQuestionCircle />} onClick={openModal} />
      </div>
      <div className={classes["menu-bar-center"]}>
        <ModeSwitch />
        <DownloadButton />
      </div>
      <div className={classes["menu-bar-right"]}>
        <BuyMeACoffee />
      </div>
    </header>
  );
}
