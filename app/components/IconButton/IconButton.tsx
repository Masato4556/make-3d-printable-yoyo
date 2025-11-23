import { JSX } from "react";
import styles from "./IconButton.module.scss";

type Props = {
  icon: JSX.Element;
  onClick: () => void;
};

export function IconButton({ icon, onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.button}>
      {icon}
    </button>
  );
}
