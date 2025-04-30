/**
 * コア（ベアリングと噛み合わせるパーツ。よりわかりやすい命名を検討中）に関するデータ
 * 対応するベアリングの種類を増やす場合、ここを変更する
 */

import {
  CubicBezierCurve,
  Mesh,
  Vector2 as ThreeVector2,
  BufferGeometry,
  LatheGeometry,
} from "three";
import { BearingSizeType } from "./bearing";
import { CSG } from "three-csg-ts";

type BearingSeatSize = {
  height: number;
  radius: number;
  path: ThreeVector2[];
};

const BEARING_SEAT_HEIGHT = 4;

export const BEARING_SEAT_PARAMS: { [k in BearingSizeType]: BearingSeatSize } =
  {
    sizeC: {
      height: 2.085 + BEARING_SEAT_HEIGHT,
      radius: 10.55,
      path: [new ThreeVector2()]
        .concat(
          new ThreeVector2(2, 0),
          new ThreeVector2(2, 4),
          new CubicBezierCurve(
            new ThreeVector2(2.5, 4),
            new ThreeVector2(3.15, 4),
            new ThreeVector2(3.15, 4),
            new ThreeVector2(3.15, 3.5)
          ).getPoints(8),
          new ThreeVector2(3.15, 2),
          new CubicBezierCurve(
            new ThreeVector2(3.85, 2),
            new ThreeVector2(4.15, 2),
            new ThreeVector2(4.15, 2),
            new ThreeVector2(4.15, 1.7)
          ).getPoints(8),
          new ThreeVector2(4.15, 0.59),
          new ThreeVector2(6.45, 0.59),
          new CubicBezierCurve(
            new ThreeVector2(6.45, 2.14 - 0.2),
            new ThreeVector2(6.45, 2.14),
            new ThreeVector2(6.45, 2.14),
            new ThreeVector2(6.45 - 0.2, 2.14)
          ).getPoints(8),
          new CubicBezierCurve(
            new ThreeVector2(7.1 - 0.2, 2.14),
            new ThreeVector2(7.1, 2.14),
            new ThreeVector2(7.1, 2.14),
            new ThreeVector2(7.1, 2.14 - 0.2)
          ).getPoints(8),
          new ThreeVector2(7.1, 0.885),
          new ThreeVector2(9.55, 0.885),
          new CubicBezierCurve(
            new ThreeVector2(9.55, 2.085 - 0.3),
            new ThreeVector2(9.55, 2.085),
            new ThreeVector2(9.55, 2.085),
            new ThreeVector2(9.55 - 0.3, 2.085)
          ).getPoints(8),
          new ThreeVector2(10.55, 2.085),
          new ThreeVector2(10.55, 0),
          // ウィングとコアの接続部分
          new ThreeVector2(10.55, -BEARING_SEAT_HEIGHT),
          new ThreeVector2(2, -BEARING_SEAT_HEIGHT)
        )
        .map((point) => new ThreeVector2(point.x, point.y)),
    },
  } as const;

// ベアリングの座を生成するクラス
/** MEMO:
 * ベアリングシートのジオメトリとその高さの情報を持つクラスが、現実世界の何と対応しているのかわからない。
 * ベアリングシートの
 */
export class BearingSeat {
  private bearingSizeType: BearingSizeType;
  private geometry: BufferGeometry;
  private height: number;
  constructor(bearingSizeType: BearingSizeType) {
    this.bearingSizeType = bearingSizeType;
    this.height = BEARING_SEAT_PARAMS[bearingSizeType].height;
    this.geometry = this.createGeometry();
  }

  public getGeometry() {
    return this.geometry;
  }
  public getHeight() {
    return this.height;
  }

  private createGeometry() {
    const bearingSeatPath = BEARING_SEAT_PARAMS[this.bearingSizeType].path;
    const bearingSeat = new LatheGeometry(bearingSeatPath, 100);

    // 六角形にすることで圧入しやすくしている
    const napGap = new LatheGeometry(
      [new ThreeVector2()].concat(
        new ThreeVector2(0, 0),
        new ThreeVector2(4.5, 0),
        new ThreeVector2(4.5, -BEARING_SEAT_HEIGHT),
        new ThreeVector2(0, -BEARING_SEAT_HEIGHT)
      ),
      6
    ).scale(-1, 1, 1);

    const geometry = unionGeometry(bearingSeat, napGap);
    // 法線の反転
    geometry.scale(1, -1, 1);
    geometry.translate(0, -BEARING_SEAT_HEIGHT, 0);
    geometry.rotateZ(Math.PI / 2);

    return geometry;
  }
}

function unionGeometry(geometry1: BufferGeometry, geometry2: BufferGeometry) {
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
}
