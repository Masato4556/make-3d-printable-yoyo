import { ModeSwitch } from "./components/ModeSwitch/ModeSwitch";
import { NavigationButton } from "./components/NavigationButton/NavigationButton";
import classes from "./style.module.scss";

export function MenuBar() {
  return (
    <header className={classes["menu-bar"]}>
      <div className={classes["menu-bar-left"]}></div>
      <div className={classes["menu-bar-center"]}>
        <NavigationButton direction="left" />
        <ModeSwitch />
        <NavigationButton direction="right" />
      </div>
      <div className={classes["menu-bar-right"]}></div>
    </header>
  );
}
