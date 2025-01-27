/**
 * 3DモデルをSTL形式で出力するための処理を行うコンポーネント
 *
 * 3DモデルをSTL形式で出力するために、three.jsのSTLExporterを使用している。
 * 3Dモデルはcoreとwingの2つのパーツに分かれており、meshのnameプロパティで取得するメッシュデータを判別している。
 */
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import { STLExporter } from "three/examples/jsm/Addons.js";
import { useModelDispatch } from "~/contexts/ModelContext";

export function ExportStl() {
  // const { setCore, setWing } = props;
  const { scene } = useThree();

  const dispatch = useModelDispatch();

  const setCore = useCallback(
    (s: string) => {
      dispatch({ type: "SET_CORE", payload: s });
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
    const coreModel = scene.getObjectByName("core");
    const wingModel = scene.getObjectByName("wing");
    if (coreModel !== undefined) setCore(new STLExporter().parse(coreModel));
    if (wingModel !== undefined) setWing(new STLExporter().parse(wingModel));
  }, [scene, setCore, setWing]);
  return null;
}
