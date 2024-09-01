import { useCallback } from "react";
import { useModelState } from "~/contexts/ModelContext";
import classes from "./style.module.scss";
import { BuyMeACoffee } from "./buy-me-a-coffee/buy-me-a-coffee";

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
      <div>
        <div className={classes["download-label"]}>DOWNLOAD</div>
        <div className={classes["download-button-container"]}>
          <span>CORE</span>
          <button className={classes["download-button"]} onClick={downloadCore}>
            <img src="/svg/download.svg" alt="download icon" width={"20rem"} />
          </button>
          <span>WING</span>
          <button className={classes["download-button"]} onClick={downloadWing}>
            <img src="/svg/download.svg" alt="download icon" width={"20rem"} />
          </button>
        </div>
      </div>
      <BuyMeACoffee />
    </div>
  );
}
