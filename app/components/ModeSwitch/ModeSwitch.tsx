/**
 * 画面切り替えボタンのコンポーネント
 */

import { useModeStore, Mode } from "../../stores/useModeStore";
import { ModeSwitchButton } from "./ModeSwitchButton";
import classes from "./style.module.scss";

export function ModeSwitch() {
  const { mode, change } = useModeStore();

  // もう少しプログレス感、進行している感（EDITの次がPREVIEWですよ！っていう感じ）が欲しい
  return (
    <div className={classes["ui-header"]}>
      <ModeSwitchButton
        label={"EDIT"}
        onClick={() => {
          change(Mode.PATH);
        }}
        isActive={mode === Mode.PATH}
      />
      <ModeSwitchButton
        label={"PREVIEW"}
        onClick={() => {
          change(Mode.MODEL);
        }}
        isActive={mode === Mode.MODEL}
      />
    </div>
  );
}
