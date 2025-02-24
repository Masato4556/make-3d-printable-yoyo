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

const bearingSizes: BearingSizes = {
  sizeC: {
    width: 4.76,
    innerDiameter: 6.35,
    outerDiameter: 12.7,
  },
};

export type BearingSizeType = keyof typeof bearingSizes;

export class BearingGeometry {
  public width: number;
  public innerDiameter: number;
  public outerDiameter: number;

  constructor(width: number, innerDiameter: number, outerDiameter: number) {
    this.width = width;
    this.innerDiameter = innerDiameter;
    this.outerDiameter = outerDiameter;
  }

  public static fromSize(type: BearingSizeType) {
    const size = bearingSizes[type];
    return new BearingGeometry(
      size.width,
      size.innerDiameter,
      size.outerDiameter
    );
  }
}
