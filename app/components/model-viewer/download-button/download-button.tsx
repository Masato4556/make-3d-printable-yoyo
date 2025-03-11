/**
 * ヨーヨーのデータをダウンロードするためのボタンコンポーネント
 */

import { useCallback } from "react";
import { useModelState } from "~/yoyo/ModelContext";
import classes from "./style.module.scss";
import { BuyMeACoffee } from "./buy-me-a-coffee/buy-me-a-coffee";

export function DownoadButton() {
  const { bearingSeat, wing } = useModelState();

  const downloadBearingSeat = useCallback(() => {
    if (bearingSeat === undefined) return;
    downloadBlob(bearingSeat, "bearing_seat.stl");
  }, [bearingSeat]);

  const downloadWing = useCallback(() => {
    if (wing === undefined) return;
    downloadBlob(wing, "wing.stl");
  }, [wing]);

  return (
    <div className={classes["overlay-form-box"]}>
      <div>
        <div className={classes["download-label"]}>DOWNLOAD</div>
        <div className={classes["download-button-container"]}>
          <span>BEARING SEAT</span>
          <button
            className={classes["download-button"]}
            onClick={downloadBearingSeat}
          >
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

function downloadBlob(blob: Blob, filename: string) {
  const element = document.createElement("a");
  element.href = URL.createObjectURL(blob);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  element.remove();
}
