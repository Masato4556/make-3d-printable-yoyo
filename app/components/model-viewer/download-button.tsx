import { useCallback } from "react";
import { useModelState } from "~/contexts/ModelContext";
import classes from "./style.module.scss";

export function DownoadButton() {
  const { core, wing } = useModelState();

  const downloadCore = useCallback(() => {
    if (!core.blob || !core.type) return;
    const element = document.createElement("a");
    const file = new Blob([core.blob], { type: core.type });
    element.href = URL.createObjectURL(file);
    element.download = "yoyo.stl";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }, [core]);

  const downloadWing = useCallback(() => {
    if (!wing.blob || !wing.type) return;
    const element = document.createElement("a");
    const file = new Blob([wing.blob], { type: wing.type });
    element.href = URL.createObjectURL(file);
    element.download = "yoyo.stl";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }, [wing]);

  return (
    <div className={classes["overlay-form-box"]}>
      <div className={classes["download-label"]}>DOWNLOAD</div>
      <button className={classes["download-button"]} onClick={downloadCore}>
        CORE
      </button>
      <button className={classes["download-button"]} onClick={downloadWing}>
        WING
      </button>
    </div>
  );
}
