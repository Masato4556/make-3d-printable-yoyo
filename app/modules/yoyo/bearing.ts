/**
 * ベアリングに関するデータ
 * 対応するベアリングの種類を増やす場合、ここを変更する
 */

type BearingType = "sizeC";

type BearingSize = {
  width: number;
  innerDiameter: number;
  outerDiameter: number;
};

type BearingSizes = Record<BearingType, BearingSize>;

export const BEARING_SIZE: BearingSizes = {
  sizeC: {
    width: 4.76,
    innerDiameter: 6.35,
    outerDiameter: 12.7,
  },
};

export type BearingSizeType = keyof typeof BEARING_SIZE;

export type Bearing = (typeof BEARING_SIZE)[BearingSizeType];

export const createBearing = (sizeType: BearingSizeType): Bearing => {
  const size = BEARING_SIZE[sizeType];
  if (!size) {
    throw new Error(`Unknown bearing size type: ${sizeType}`);
  }
  return {
    width: size.width,
    innerDiameter: size.innerDiameter,
    outerDiameter: size.outerDiameter,
  };
};
