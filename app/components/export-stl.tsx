// ExportStl.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { STLExporter } from "three/examples/jsm/Addons.js";

type Props = {
  setStl: (stl: string) => void;
};

export const ExportStl = function (props: Props) {
  const { setStl } = props;
  const { scene } = useThree();
  useEffect(() => {
    const stl = new STLExporter().parse(scene);
    setStl(stl);
  }, [scene, setStl]);
  return null;
};
