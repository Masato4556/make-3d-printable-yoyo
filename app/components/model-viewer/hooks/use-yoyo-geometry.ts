/**
 * ヨーヨーの形状を生成するためのフック
 * TODO: 要リファクタ(マジックナンバーの除去、パスの生成方法の見直し、パスの向きの統一)
 */

import { useMemo } from "react";
import { Vector2, LatheGeometry, Mesh, BufferGeometry } from "three";
import { CSG } from "three-csg-ts";
import { BearingSizeType } from "~/const/bearing";
import { BEARING_SEAT_HEIGHT, BEARING_SEAT_PARAMS } from "~/const/core";
import { useYoyoPath } from "~/contexts/YoyoCurveContext";

// TODO: どのベアリングを選択したかなどのmodel-viewerとpath-viewerで共に用いるデータをproviderから取得できるようにする

const GAP = 0.2; // coreとウィングの間の隙間

const unionGeometry = function (
  geometry1: BufferGeometry,
  geometry2: BufferGeometry
) {
  const mesh1 = new Mesh(geometry1);
  const mesh2 = new Mesh(geometry2);

  // CSG操作
  const csg1 = CSG.fromMesh(mesh1);
  const csg2 = CSG.fromMesh(mesh2);
  const resultCSG = csg2.union(csg1);
  const resultMesh = CSG.toMesh(resultCSG, mesh2.matrix);
  resultMesh.updateMatrix();
  const unionedGeometry = resultMesh.geometry;
  unionedGeometry.computeVertexNormals();
  return unionedGeometry;
};

const useYoyoCore = function (bearingType: BearingSizeType) {
  const { coreGeometry } = useMemo(() => {
    if (!BEARING_SEAT_PARAMS[bearingType].path) {
      throw new Error(`Invalid bearing type: ${bearingType}`);
    }

    const corePath = BEARING_SEAT_PARAMS[bearingType].path;
    const core = new LatheGeometry(corePath, 100);
    const napGap = new LatheGeometry(
      [new Vector2()].concat(
        new Vector2(0, 0),
        new Vector2(4.5, 0),
        new Vector2(4.5, -BEARING_SEAT_HEIGHT),
        new Vector2(0, -BEARING_SEAT_HEIGHT)
      ),
      6 // 六角形にすることで圧入しやすくしている
    ).scale(-1, 1, 1);

    const coreGeometry = unionGeometry(core, napGap);
    // 法線の反転
    coreGeometry.scale(1, -1, 1);
    coreGeometry.translate(0, -BEARING_SEAT_HEIGHT, 0);
    coreGeometry.rotateZ(Math.PI / 2);

    return { coreGeometry };
  }, [bearingType]);

  return {
    coreGeometry,
  };
};

export const useYoyoGeometry = function () {
  const bearingType = "sizeC"; // TODO: ベアリングの種類を選択できるようにする

  // coreのパスを作成
  const { coreGeometry } = useYoyoCore(bearingType);

  const { yoyoPath } = useYoyoPath();

  const wingGeometry = useMemo(() => {
    // wingのパスを作成
    const wingPath: Vector2[] = [new Vector2()]
      .concat(
        // coreを覆う部分
        new Vector2(0, BEARING_SEAT_PARAMS[bearingType].height),
        new Vector2(10.55 + GAP, BEARING_SEAT_PARAMS[bearingType].height),
        new Vector2(10.55 + GAP, 0)
      )
      // TODO: ウィングのパスとコアのパスで軸の向きが違うのをここで調整している。この調整せずに済むようにする
      .concat(...yoyoPath.map((v) => new Vector2(v.y, v.x)));

    const geometry = new LatheGeometry(wingPath, 64).rotateZ(Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }, [bearingType, yoyoPath]);

  return { coreGeometry, wingGeometry };
};
