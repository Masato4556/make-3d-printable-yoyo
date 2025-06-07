import { Point } from "../Point/Point";

export interface BaseRestraint {
  readonly pointId: string;
  apply: (
    points: Map<string, Point>,
    updatedPoints: Map<string, Point>
  ) => void;
}
