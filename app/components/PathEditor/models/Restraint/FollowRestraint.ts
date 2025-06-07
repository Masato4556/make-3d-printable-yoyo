import { Point } from "../Point/Point";
import { BaseRestraint } from "./BaseRestraint";

export class FollowRestraint implements BaseRestraint {
  constructor(readonly pointId: string, private targetPointId: string) {}

  public apply(
    points: Map<string, Point>,
    updatedPoints: Map<string, Point>
  ): void {
    const targetPoint = points.get(this.targetPointId);
    const updatedTargetPoint = updatedPoints.get(this.targetPointId);
    if (!targetPoint || !updatedTargetPoint) {
      throw new Error(
        `Target point with id ${this.targetPointId} does not exist.`
      );
    }
    if (
      targetPoint.x === updatedTargetPoint.x ||
      targetPoint.y === updatedTargetPoint.y
    ) {
      return;
    }
    const point = points.get(this.pointId);
    if (!point) {
      throw new Error(`Point with id ${this.pointId} does not exist.`);
    }
    point.x += updatedTargetPoint.x - targetPoint.x;
    point.y += updatedTargetPoint.y - targetPoint.y;
  }
}
