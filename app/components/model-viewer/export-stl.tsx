/**
 * 3DモデルをSTL形式で出力するための処理を行うコンポーネント
 *
 * 3DモデルをSTL形式で出力するために、three.jsのSTLExporterを使用している。
 * 3Dモデルはbearing_seatとwingの2つのパーツに分かれており、meshのnameプロパティで取得するメッシュデータを判別している。
 */
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { STLExporter } from "three/examples/jsm/Addons.js";
import { useModelStore } from "~/yoyo/model-store";

export const MODEL_NAME = {
  BEARING_SEAT: "bearing_seat",
  WING: "wing",
} as const;

export function ExportStl() {
  const { scene } = useThree();
  const { setBearingSeat, setWing } = useModelStore();

  useEffect(() => {
    // 左右対称にモデルを配置しているが出力したいのは片側だけなので、”yoyo”とnameがついたオブジェクトだけを取得
    // MEMO: 今後複数パーツに分割して出力したい場合、個別にnameでパーツを取得しstl変換を行う
    const bearingSeatModel = scene.getObjectByName(MODEL_NAME.BEARING_SEAT);
    const wingModel = scene.getObjectByName(MODEL_NAME.WING);
    if (bearingSeatModel !== undefined)
      setBearingSeat(
        new Blob([new STLExporter().parse(bearingSeatModel)], {
          type: "application/stl",
        })
      );
    if (wingModel !== undefined)
      setWing(
        new Blob([new STLExporter().parse(wingModel)], {
          type: "application/stl",
        })
      );
  }, [scene, setBearingSeat, setWing]);
  return null;
}
