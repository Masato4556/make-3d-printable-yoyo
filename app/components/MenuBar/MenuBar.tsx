import { Mode, useModeStore } from "../../stores/useModeStore";
import { ModeSwitch } from "../ModeSwitch/ModeSwitch";
import classes from "./style.module.scss";

export function MenuBar() {
  const { mode, change } = useModeStore();
  return (
    <header className={classes["menu-bar"]}>
      <div className={classes["menu-bar-left"]}></div>
      <div className={classes["menu-bar-center"]}>
        <button
          className={classes["navigation-button"]}
          onClick={() => change(Mode.PATH)}
          aria-label={"Back to shape editor"}
          style={{ visibility: mode === Mode.MODEL ? "visible" : "hidden" }}
        >
          {"<"}
        </button>
        <ModeSwitch />
        <button
          className={classes["navigation-button"]}
          onClick={() => change(Mode.MODEL)}
          aria-label={"Next to download page"}
          style={{ visibility: mode === Mode.PATH ? "visible" : "hidden" }}
        >
          {">"}
        </button>
      </div>
      <div className={classes["menu-bar-right"]}></div>
    </header>
  );
}
