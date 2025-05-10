/**
 * 3DモデルをSTL形式で出力するための処理を行うコンポーネント
 *
 * 3DモデルをSTL形式で出力するために、three.jsのSTLExporterを使用している。
 * 3Dモデルはbearing_seatとwingの2つのパーツに分かれており、meshのnameプロパティで取得するメッシュデータを判別している。
 */
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { STLExporter } from "three/examples/jsm/Addons.js";
import { useModelStore } from "../../yoyo/useModelStore";

export const MODEL_NAME = {
  BEARING_SEAT: "bearing_seat",
  WING: "wing",
} as const;

export function ExportStl() {
  const { scene } = useThree();
  const { setWing } = useModelStore();

  useEffect(() => {
    const wingModel = scene.getObjectByName(MODEL_NAME.WING);
    if (wingModel !== undefined)
      setWing(
        new Blob([new STLExporter().parse(wingModel)], {
          type: "application/stl",
        })
      );
  }, [scene, setWing]);
  return null;
}
