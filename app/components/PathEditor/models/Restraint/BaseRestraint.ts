import { PointMap } from "../Point/PointMap";

export interface BaseRestraint {
  readonly pointId: string;
  apply: (points: PointMap, updatedPoints: PointMap) => void;
}
