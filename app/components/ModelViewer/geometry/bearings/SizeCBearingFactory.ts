import { Vector2 as ThreeVector2, LatheGeometry } from "three";
import { BEARING_SEAT_PARAMS } from "../bearingSeat";
import { unionGeometry } from "../unionGeometry";

const BEARING_SEAT_HEIGHT = 4;

export const createGeometry = () => {
  const bearingSeatPath = BEARING_SEAT_PARAMS["sizeC"].path;
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
};
