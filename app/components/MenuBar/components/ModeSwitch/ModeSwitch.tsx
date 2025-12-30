/**
 * 画面切り替えボタンのコンポーネント
 */

import { useModeStore, Mode } from "../../../../stores/useModeStore";

import { ModeSwitchButton } from "./ModeSwitchButton";
import classes from "./style.module.scss";

export function ModeSwitch() {
  const { mode, change } = useModeStore();

  const toggleMode = () => {
    const nextMode = mode === Mode.MODEL ? Mode.PATH : Mode.MODEL;
    change(nextMode);
  };

  const label = mode === Mode.MODEL ? "PREVIEW: ON" : "PREVIEW: OFF";

  // もう少しプログレス感、進行している感（EDITの次がPREVIEWですよ！っていう感じ）が欲しい
  return (
    <div className={classes["ui-header"]}>
      <ModeSwitchButton
        label={label}
        onClick={toggleMode}
        isActive={mode === Mode.MODEL}
      />
    </div>
  );
}
