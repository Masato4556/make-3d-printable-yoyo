import { BufferGeometry, LatheGeometry, Vector2 as ThreeVector2 } from "three";

import { Bearing, BearingSizeType } from "../../../yoyo/bearing";
import { Vector2 } from "../../../math/vector2";
import { differenceGeometry } from "./unionGeometry";

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

  const nutSeatPath = [
    new ThreeVector2(0, 0),
    new ThreeVector2(0, 50),
    new ThreeVector2(4.5, 50),
    new ThreeVector2(4.5, 0),
    new ThreeVector2(0, 0),
  ].map((v) => new ThreeVector2(v.x, v.y).add(new ThreeVector2(0, 4)));
  const nutSeatGeometry = new LatheGeometry(nutSeatPath, 6).rotateZ(
    Math.PI / 2
  );
  nutSeatGeometry.scale(1, -1, 1);

  const result = differenceGeometry(wingGeometry, nutSeatGeometry);
  result.computeVertexNormals();
  return result;
}
