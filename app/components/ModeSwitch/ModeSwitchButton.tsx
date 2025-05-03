/**
 * 画面切り替えボタンのコンポーネント
 */

import classes from "./style.module.scss";

type Props = {
  label: string;
  onClick: () => void;
};

export function ModeSwitchButton({ label, onClick }: Props) {
  return (
    <button
      className={`${classes["mode-button"]} ${classes["mode-button"]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
