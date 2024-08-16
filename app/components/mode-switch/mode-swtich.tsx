import { Mode } from "~/routes/_index";
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
          setMode("path");
        }}
      >
        SHAPE
      </button>
      <div>{" > "}</div>
      <button
        className={`${classes["mode-button"]} ${classes["mode-button"]}`}
        onClick={() => {
          setMode("model");
        }}
      >
        DOWNLOAD
      </button>
    </div>
  );
}
