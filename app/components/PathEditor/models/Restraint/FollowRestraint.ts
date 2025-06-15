import { getMovementVector } from "../../CurveEditor/function/getMovementVector";
import { isMoved } from "../../CurveEditor/function/isMoved";
import { PointMap } from "../Point/PointMap";
import { Restraint } from "./BaseRestraint";

export class FollowRestraint implements Restraint {
  constructor(
    readonly restrainedPointId: string,
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

    const point = updatedPoints.get(this.restrainedPointId);
    if (!this.options?.lock?.x) {
      point.x += targetPointMovementVector.x;
    }
    if (!this.options?.lock?.y) {
      point.y += targetPointMovementVector.y;
    }
  }
}
