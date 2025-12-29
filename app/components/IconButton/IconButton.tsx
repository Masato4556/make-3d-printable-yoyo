import { JSX } from "react";
import styles from "./IconButton.module.scss";

type Props = {
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
};

export function IconButton({ icon, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {icon}
    </button>
  );
}
