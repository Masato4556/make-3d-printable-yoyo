
import { Mode, useModeStore } from "../../../../stores/useModeStore";
import classes from "./style.module.scss";

type Props = {
  direction: "left" | "right";
};

export function NavigationButton({ direction }: Props) {
  const { mode, change } = useModeStore();

  const isLeft = direction === "left";
  const targetMode = isLeft ? Mode.PATH : Mode.MODEL;
  const visible = isLeft ? mode === Mode.MODEL : mode === Mode.PATH;
  const label = isLeft ? "Back to shape editor" : "Next to download page";
  const text = isLeft ? "<" : ">";

  return (
    <button
      className={classes["navigation-button"]}
      onClick={() => change(targetMode)}
      aria-label={label}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {text}
    </button>
  );
}
