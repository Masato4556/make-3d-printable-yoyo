/**
 * ヨーヨーのデータをダウンロードするためのボタンコンポーネント
 */

import { useCallback } from "react";
import classes from "./style.module.scss";
import { BuyMeACoffee } from "./BuyMeACoffee/BuyMeACoffee";
import { useStlExport } from "../hooks/useStlExport";

export function DownoadButton() {
  const { generateStlBlob } = useStlExport();

  const downloadWing = useCallback(() => {
    // 最新の状態からSTL blobを生成してダウンロード
    const wingBlob = generateStlBlob();
    downloadBlob(wingBlob, "wing.stl");
  }, [generateStlBlob]);

  return (
    <div className={classes["overlay-form-box"]}>
      <div className={classes["download-button-container"]}>
        <div className={classes["download-label"]}>DOWNLOAD</div>
        <button className={classes["download-button"]} onClick={downloadWing}>
          <img src="/svg/download.svg" alt="download icon" width={"20rem"} />
        </button>
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
