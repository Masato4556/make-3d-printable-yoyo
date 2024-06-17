// ExportStl.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { STLExporter } from "three/examples/jsm/Addons.js";

type Props = {
  setStl: (stl: string) => void;
};

export function ExportStl(props: Props) {
  const { setStl } = props;
  const { scene } = useThree();
  useEffect(() => {
    // 左右対称にモデルを配置しているが出力したいのは片側だけなので、”yoyo”とnameがついたオブジェクトだけを取得
    // MEMO: 今後複数パーツに分割して出力したい場合、個別にnameでパーツを取得しstl変換を行う
    const model = scene.getObjectByName("yoyo");
    if (model === undefined) return;
    const stl = new STLExporter().parse(model);
    setStl(stl);
  }, [scene, setStl]);
  return null;
}
