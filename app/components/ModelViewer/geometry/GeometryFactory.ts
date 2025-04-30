import { BufferGeometry, LatheGeometry, Vector2 as ThreeVector2 } from "three";

import { Bearing, BearingSizeType } from "./bearing";
import { Vector2 } from "../../../math/vector2";
import { BEARING_SEAT_PARAMS, BearingSeat } from "./bearingSeat";

/**
 * ヨーヨーの形状を生成するためのフック
 */

const GAP = 0.2;

export class GeometryFactory {
  private bearing: Bearing;
  private bearingSeat: BearingSeat;
  private wingGeometry: BufferGeometry;
  constructor(bearingSizeType: BearingSizeType, wingPath: Vector2[]) {
    this.bearing = Bearing.fromSize(bearingSizeType);
    this.bearingSeat = new BearingSeat(bearingSizeType);
    this.wingGeometry = this.createWingGeometry(wingPath);
  }

  public getBearing() {
    return this.bearing;
  }

  public getBearingSeat() {
    return this.bearingSeat;
  }

  public getWingGeometry() {
    return this.wingGeometry;
  }

  private createWingGeometry(wingPath: Vector2[]) {
    // TODO: ベアリングの種類を選択できるようにする
    const bearingType = "sizeC";

    const bearingCoverPath = [
      new ThreeVector2(0, BEARING_SEAT_PARAMS[bearingType].height),
      new ThreeVector2(10.55 + GAP, BEARING_SEAT_PARAMS[bearingType].height),
      new ThreeVector2(10.55 + GAP, 0),
    ];

    const path: ThreeVector2[] = [new ThreeVector2()]
      .concat(...bearingCoverPath)
      // TODO: ウィングのパスとコアのパスで軸の向きが違うのをここで調整している。この調整せずに済むようにする
      .concat(...wingPath.map((v) => new ThreeVector2(v.y, v.x)));

    const wingGeometry = new LatheGeometry(path, 64).rotateZ(Math.PI / 2);
    wingGeometry.computeVertexNormals();
    return wingGeometry;
  }
}
