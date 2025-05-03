/**
 * 画面切り替えボタンのコンポーネント
 */

import { Mode } from "../../stores/useModeStore";
import { ModeSwitchButton } from "./ModeSwitchButton";
import classes from "./style.module.scss";

type Props = {
  setMode: (mode: Mode) => void;
};

export function ModeSwitch(props: Props) {
  const { setMode } = props;
  return (
    <div className={classes["ui-header"]}>
      <ModeSwitchButton
        label={"SHAPE"}
        onClick={() => {
          setMode("PATH");
        }}
      />
      <div>{" > "}</div>
      <ModeSwitchButton
        label={"DOWNLOAD"}
        onClick={() => {
          setMode("MODEL");
        }}
      />
    </div>
  );
}
