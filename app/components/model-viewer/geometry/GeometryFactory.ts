import {
  BufferGeometry,
  LatheGeometry,
  Mesh,
  Vector2 as ThreeVector2,
} from "three";
import { BEARING_SEAT_HEIGHT, BEARING_SEAT_PARAMS } from "~/const/bearingSeat";
import { CSG } from "three-csg-ts";
import { BearingSizeType } from "~/const/bearing";
import { Vector2 } from "~/contexts/Vector2";

/**
 * ヨーヨーの形状を生成するためのフック
 * TODO: 要リファクタ(マジックナンバーの除去、パスの生成方法の見直し、パスの向きの統一)
 */

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

export class GeometryFactory {
  private bearingSeatGeometry: BufferGeometry;
  private wingGeometry: BufferGeometry;
  constructor(bearingSizeType: BearingSizeType, wingPath: Vector2[]) {
    this.bearingSeatGeometry = this.createBearingSeatGeometry(bearingSizeType);
    this.wingGeometry = this.createWingGeometry(wingPath);
  }

  public getBearingSeatGeometry() {
    return this.bearingSeatGeometry;
  }

  public getWingGeometry() {
    return this.wingGeometry;
  }

  private createBearingSeatGeometry(bearingSizeType: BearingSizeType) {
    if (!BEARING_SEAT_PARAMS[bearingSizeType].path) {
      throw new Error(`Invalid bearing type: ${bearingSizeType}`);
    }

    const corePath = BEARING_SEAT_PARAMS[bearingSizeType].path;
    const core = new LatheGeometry(corePath, 100);
    const napGap = new LatheGeometry(
      [new ThreeVector2()].concat(
        new ThreeVector2(0, 0),
        new ThreeVector2(4.5, 0),
        new ThreeVector2(4.5, -BEARING_SEAT_HEIGHT),
        new ThreeVector2(0, -BEARING_SEAT_HEIGHT)
      ),
      6 // 六角形にすることで圧入しやすくしている
    ).scale(-1, 1, 1);

    const coreGeometry = unionGeometry(core, napGap);
    // 法線の反転
    coreGeometry.scale(1, -1, 1);
    coreGeometry.translate(0, -BEARING_SEAT_HEIGHT, 0);
    coreGeometry.rotateZ(Math.PI / 2);

    return coreGeometry;
  }

  private createWingGeometry(wingPath: Vector2[]) {
    const bearingType = "sizeC"; // TODO: ベアリングの種類を選択できるようにする

    // wingのパスを作成
    const path: ThreeVector2[] = [new ThreeVector2()]
      .concat(
        // coreを覆う部分
        new ThreeVector2(0, BEARING_SEAT_PARAMS[bearingType].height),
        new ThreeVector2(10.55 + GAP, BEARING_SEAT_PARAMS[bearingType].height),
        new ThreeVector2(10.55 + GAP, 0)
      )
      // TODO: ウィングのパスとコアのパスで軸の向きが違うのをここで調整している。この調整せずに済むようにする
      .concat(...wingPath.map((v) => new ThreeVector2(v.y, v.x)));

    const wingGeometry = new LatheGeometry(path, 64).rotateZ(Math.PI / 2);
    wingGeometry.computeVertexNormals();
    return wingGeometry;
  }
}
