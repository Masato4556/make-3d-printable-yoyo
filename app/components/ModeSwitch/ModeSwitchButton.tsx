/**
 * 画面切り替えボタンのコンポーネント
 */

import classes from "./style.module.scss";

type Props = {
  label: string;
  onClick: () => void;
  isActive: boolean;
};

export function ModeSwitchButton({ label, onClick, isActive }: Props) {
  const buttonClasses = [
    classes["mode-button"],
    isActive ? classes.active : "",
  ].join(" ");

  return (
    <button className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
}
