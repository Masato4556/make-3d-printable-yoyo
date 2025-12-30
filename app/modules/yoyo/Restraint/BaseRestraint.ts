import { PointMap } from "../Point";

export interface Restraint {
  apply: (points: PointMap, updatedPoints: PointMap) => void;
}
