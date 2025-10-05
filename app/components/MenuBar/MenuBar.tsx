import { BuyMeACoffee } from "./components/BuyMeACoffee/BuyMeACoffee";
import { ModeSwitch } from "./components/ModeSwitch/ModeSwitch";
import { DownloadButton } from "./components/DownloadButton/DownloadButton";
import classes from "./style.module.scss";

export function MenuBar() {
  return (
    <header className={classes["menu-bar"]}>
      <div className={classes["menu-bar-left"]}></div>
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
