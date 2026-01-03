import { PointMap } from "../Point";
import { Restraint } from "./BaseRestraint";

export class FollowRestraint implements Restraint {
  constructor(
    readonly restrainedPointId: string,
    readonly targetPointId: string,
    readonly options: { follows: { x: boolean; y: boolean } }
  ) {}

  public apply(points: PointMap, updatedPoints: PointMap): void {
    const targetPoint = points.get(this.targetPointId);
    const updatedTargetPoint = updatedPoints.get(this.targetPointId);
    const restrainedPoint = points.get(this.restrainedPointId);
    const updatedRestrainedPoint = updatedPoints.get(this.restrainedPointId);

    if (
      !targetPoint ||
      !updatedTargetPoint ||
      !restrainedPoint ||
      !updatedRestrainedPoint
    ) {
      return;
    }

    // targetPointが動いていない場合スキップ
    if (targetPoint.equals(updatedTargetPoint)) {
      return;
    }

    // オフセットを計算
    const offsetX = restrainedPoint.x - targetPoint.x;
    const offsetY = restrainedPoint.y - targetPoint.y;

    // 新しいターゲット位置にオフセットを加える
    if (this.options.follows.x) {
      updatedRestrainedPoint.x = updatedTargetPoint.x + offsetX;
    }
    if (this.options.follows.y) {
      updatedRestrainedPoint.y = updatedTargetPoint.y + offsetY;
    }
  }
}
