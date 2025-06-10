import { getMovementVector } from "../../CurveEditor/function/getMovementVector";
import { isMoved } from "../../CurveEditor/function/isMoved";
import { PointMap } from "../Point/PointMap";
import { BaseRestraint } from "./BaseRestraint";

export class FollowRestraint implements BaseRestraint {
  constructor(
    readonly pointId: string,
    readonly targetPointId: string,
    readonly options?: { lock: { x: boolean; y: boolean } }
  ) {}

  public apply(points: PointMap, updatedPoints: PointMap): void {
    const targetPoint = points.get(this.targetPointId);
    const updatedTargetPoint = updatedPoints.get(this.targetPointId);
    const targetPointMovementVector = getMovementVector(
      targetPoint,
      updatedTargetPoint
    );

    if (!isMoved(targetPointMovementVector)) {
      return;
    }

    const point = updatedPoints.get(this.pointId);
    if (!this.options?.lock?.x) {
      point.x += targetPointMovementVector.x;
    }
    if (!this.options?.lock?.y) {
      point.y += targetPointMovementVector.y;
    }
  }
}
