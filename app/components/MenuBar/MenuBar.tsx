import { ModeSwitch } from "../ModeSwitch/ModeSwitch";
import { Mode } from "../../stores/useModeStore";
import classes from "./style.module.scss";

type Props = {
  setMode: (mode: Mode) => void;
};

export function MenuBar(props: Props) {
  const { setMode } = props;
  return (
    <header className={classes["menu-bar"]}>
      <div className={classes["menu-bar-center"]}>
        <ModeSwitch setMode={setMode} />
      </div>
    </header>
  );
}
