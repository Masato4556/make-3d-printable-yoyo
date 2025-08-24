import { ModeSwitch } from "../ModeSwitch/ModeSwitch";
import classes from "./style.module.scss";

export function MenuBar() {
  return (
    <header className={classes["menu-bar"]}>
      <div className={classes["menu-bar-center"]}>
        <ModeSwitch />
      </div>
    </header>
  );
}
