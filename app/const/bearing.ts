export const BEARING_SIZE: Record<BearingType, { width: number }> = {
  sizeC: { width: 3.18 },
} as const;

export type BearingType = "sizeC";

export const BEARING_TYPES: Record<string, BearingType> = {
  sizeC: "sizeC",
} as const;
