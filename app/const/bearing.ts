export const BEARING_SIZE: Record<
  BearingType,
  { width: number; innerDiameter: number; outerDiameter: number }
> = {
  sizeC: { width: 4.76, innerDiameter: 6.35, outerDiameter: 12.7 },
} as const;

export type BearingType = "sizeC";

export const BEARING_TYPES: Record<string, BearingType> = {
  sizeC: "sizeC",
} as const;
