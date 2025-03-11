/**
 * 3DモデルをSTL形式で出力するための処理を行うコンポーネント
 *
 * 3DモデルをSTL形式で出力するために、three.jsのSTLExporterを使用している。
 * 3Dモデルはbearing_seatとwingの2つのパーツに分かれており、meshのnameプロパティで取得するメッシュデータを判別している。
 */
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import { STLExporter } from "three/examples/jsm/Addons.js";
import { useModelDispatch } from "~/yoyo/ModelContext";

export function ExportStl() {
  const { scene } = useThree();

  const dispatch = useModelDispatch();

  const setBearingSeat = useCallback(
    (s: string) => {
      dispatch({ type: "SET_BEARING_SEAT", payload: s });
    },
    [dispatch]
  );

  const setWing = useCallback(
    (s: string) => {
      dispatch({ type: "SET_WING", payload: s });
    },
    [dispatch]
  );

  useEffect(() => {
    // 左右対称にモデルを配置しているが出力したいのは片側だけなので、”yoyo”とnameがついたオブジェクトだけを取得
    // MEMO: 今後複数パーツに分割して出力したい場合、個別にnameでパーツを取得しstl変換を行う
    const bearingSeatModel = scene.getObjectByName("bearing_seat");
    const wingModel = scene.getObjectByName("wing");
    if (bearingSeatModel !== undefined)
      setBearingSeat(new STLExporter().parse(bearingSeatModel));
    if (wingModel !== undefined) setWing(new STLExporter().parse(wingModel));
  }, [scene, setBearingSeat, setWing]);
  return null;
}
