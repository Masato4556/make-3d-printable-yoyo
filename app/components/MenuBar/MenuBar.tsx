import { ModeSwitch } from "./components/ModeSwitch/ModeSwitch";
import classes from "./style.module.scss";

export function MenuBar() {
  return (
    <header className={classes["menu-bar"]}>
      <div className={classes["menu-bar-left"]}></div>
      <div className={classes["menu-bar-center"]}>
        <ModeSwitch />
      </div>
      <div className={classes["menu-bar-right"]}></div>
    </header>
  );
}
