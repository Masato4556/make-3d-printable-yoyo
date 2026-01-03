import { Restraint, PointsTransition } from "./BaseRestraint";

export class FollowRestraint implements Restraint {
  constructor(
    readonly restrainedPointId: string,
    readonly targetPointId: string,
    readonly options: { follows: { x: boolean; y: boolean } }
  ) { }

  public apply(transition: PointsTransition): void {
    const { before, after } = transition;
    const targetPoint = before.get(this.targetPointId);
    const restrainedPoint = before.get(this.restrainedPointId);
    const updatedTargetPoint = after.get(this.targetPointId);
    const updatedRestrainedPoint = after.get(this.restrainedPointId);

    if (
      !targetPoint ||
      !restrainedPoint ||
      !updatedTargetPoint ||
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
