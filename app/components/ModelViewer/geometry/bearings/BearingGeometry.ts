import { BufferGeometry } from "three";
import { BearingType } from "../bearing";
import { createGeometry } from "./SizeCBearingFactory";

export const BearingGeometry: Record<BearingType, () => BufferGeometry> = {
  sizeC: createGeometry,
};
