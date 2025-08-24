/**
 * 画面切り替えボタンのコンポーネント
 */

import { useModeStore, Mode } from "../../stores/useModeStore";
import { ModeSwitchButton } from "./ModeSwitchButton";
import classes from "./style.module.scss";

export function ModeSwitch() {
  const { mode, change } = useModeStore();
  return (
    <div className={classes["ui-header"]}>
      <ModeSwitchButton
        label={"SHAPE"}
        onClick={() => {
          change(Mode.PATH);
        }}
        isActive={mode === Mode.PATH}
      />
      <ModeSwitchButton
        label={"DOWNLOAD"}
        onClick={() => {
          change(Mode.MODEL);
        }}
        isActive={mode === Mode.MODEL}
      />
    </div>
  );
}
