import { PointMap } from "../Point/PointMap";

export interface Restraint {
  apply: (points: PointMap, updatedPoints: PointMap) => void;
}
