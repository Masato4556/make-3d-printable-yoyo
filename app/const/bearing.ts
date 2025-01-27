/**
 * ベアリングに関するデータ
 * 対応するベアリングの種類を増やす場合、ここを変更する
 */
export const BEARING_SIZE: Record<
  BearingType,
  { width: number; innerDiameter: number; outerDiameter: number }
> = {
  sizeC: { width: 4.76, innerDiameter: 6.35, outerDiameter: 12.7 },
} as const;

export type BearingType = "sizeC";

export const BEARING_TYPES = {
  sizeC: "sizeC",
} as const;
