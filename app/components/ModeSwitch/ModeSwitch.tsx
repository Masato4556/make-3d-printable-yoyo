/**
 * 画面切り替えボタンのコンポーネント
 */

import { Mode } from "../../stores/useModeStore";
import classes from "./style.module.scss";

type Props = {
  setMode: (mode: Mode) => void;
};

export function ModeSwitch(props: Props) {
  const { setMode } = props;
  return (
    <div className={classes["ui-header"]}>
      <button
        className={`${classes["mode-button"]} ${classes["mode-button"]}`}
        onClick={() => {
          setMode("PATH");
        }}
      >
        SHAPE
      </button>
      <div>{" > "}</div>
      <button
        className={`${classes["mode-button"]} ${classes["mode-button"]}`}
        onClick={() => {
          setMode("MODEL");
        }}
      >
        DOWNLOAD
      </button>
    </div>
  );
}
