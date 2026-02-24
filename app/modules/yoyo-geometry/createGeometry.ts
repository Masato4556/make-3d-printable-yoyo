import { LatheGeometry, Vector2 as ThreeVector2 } from "three";

import { BearingSizeType, createBearing } from "../yoyo/bearing";
import { differenceGeometry } from "./unionGeometry";
import { Vector2 } from "../math/vector2";


const createWingGeometry = (wingPath: Vector2[]) => {
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
  ].map((v) => new ThreeVector2(v.x, v.y).add(new ThreeVector2(0, 7)));
  const nutSeatGeometry = new LatheGeometry(nutSeatPath, 6).rotateZ(
    Math.PI / 2
  );
  nutSeatGeometry.scale(1, -1, 1);

  const result = differenceGeometry(wingGeometry, nutSeatGeometry);
  result.computeVertexNormals();
  return result;
}

export const createGeometry = (bearingSizeType: BearingSizeType, wingPath: Vector2[]) => {
  const bearing = createBearing(bearingSizeType);
  const wingGeometry = createWingGeometry(wingPath);
  return { bearing, wingGeometry };
}

