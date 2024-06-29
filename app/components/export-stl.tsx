// ExportStl.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { STLExporter } from "three/examples/jsm/Addons.js";

type Props = {
  setCore: (stl: string) => void;
  setWing: (stl: string) => void;
};

export function ExportStl(props: Props) {
  const { setCore, setWing } = props;
  const { scene } = useThree();
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
