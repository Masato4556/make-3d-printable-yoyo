/**
 * ヨーヨーのデータをダウンロードするためのボタンコンポーネント
 */

import { useCallback } from "react";
import classes from "./style.module.scss";
import { useStlExport } from "../../../../hooks/useStlExport";

export function DownloadButton() {
  const { generateStlBlob } = useStlExport();

  const downloadWing = useCallback(() => {
    // 最新の状態からSTL blobを生成してダウンロード
    const wingBlob = generateStlBlob();
    downloadBlob(wingBlob, "wing.stl");
  }, [generateStlBlob]);

  return (
    <button className={classes["download-button"]} onClick={downloadWing}>
      <img src="/svg/download.svg" alt="download icon" width={"20rem"} />
    </button>
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
