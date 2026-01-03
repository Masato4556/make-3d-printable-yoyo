import { PointsSnapshot } from "../Point";

export interface PointsTransition {
  before: PointsSnapshot;
  after: PointsSnapshot;
}

export interface Restraint {
  apply: (transition: PointsTransition) => void;
}
