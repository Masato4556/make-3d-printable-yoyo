/**
 * STL出力のためのカスタムフック
 *
 * sceneに依存せず、geometryから直接STLファイルを生成する
 * 呼び出される度に最新のgeometryを生成してSTL blobを返す
 */
import { useCallback } from "react";
import { Mesh } from "three";
import { STLExporter } from "three/examples/jsm/Addons.js";
import { useGeometryManager } from "../../hooks/useGeometryManager";

export function useStlExport() {
  const { generateGeometry } = useGeometryManager();

  const generateStlBlob = useCallback((): Blob => {
    // 毎回最新のgeometryを生成
    const geometry = generateGeometry();

    // geometryから一時的なmeshを作成してSTLを出力
    const tempMesh = new Mesh(geometry);
    const stlData = new STLExporter().parse(tempMesh);
    const blob = new Blob([stlData], { type: "application/stl" });

    return blob;
  }, [generateGeometry]);

  return {
    generateStlBlob,
  };
}
