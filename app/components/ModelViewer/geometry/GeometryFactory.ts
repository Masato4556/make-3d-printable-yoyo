import { BufferGeometry, LatheGeometry, Vector2 as ThreeVector2 } from "three";

import { Bearing, BearingSizeType } from "./bearing";
import { Vector2 } from "../../../math/vector2";

/**
 * ヨーヨーの形状を生成するためのフック
 */

export class GeometryFactory {
  private bearing: Bearing;
  private wingGeometry: BufferGeometry;
  constructor(bearingSizeType: BearingSizeType, wingPath: Vector2[]) {
    this.bearing = Bearing.fromSize(bearingSizeType);
    this.wingGeometry = createWingGeometry(wingPath);
  }

  public getBearing() {
    return this.bearing;
  }

  public getWingGeometry() {
    return this.wingGeometry;
  }
}

function createWingGeometry(wingPath: Vector2[]) {
  const path: ThreeVector2[] = [new ThreeVector2()].concat(
    ...wingPath.map((v) => new ThreeVector2(v.y, v.x))
  );

  const wingGeometry = new LatheGeometry(path, 64).rotateZ(Math.PI / 2);
  wingGeometry.computeVertexNormals();
  return wingGeometry;
}
