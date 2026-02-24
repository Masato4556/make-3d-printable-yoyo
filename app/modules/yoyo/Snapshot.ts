import { Point } from "./Point";
import { Restraint } from "./Restraint";

// TODO: YoyoShapeとSnapshotという2つのクラスに分離する意味があるか、考える
export class Snapshot {
    private points: Map<string, Point> = new Map();
    private restraints: Restraint[] = [];

    constructor(initialPoints: Point[] = [], restraints: Restraint[] = []) {
        initialPoints.forEach((point) => this.points.set(point.id, point));
        this.restraints = restraints;
    }

    public set(point: Point): void {
        this.points.set(point.id, point);
    }

    public get(id: string): Point | undefined {
        return this.points.get(id);
    }

    /**
     * 特定の点を更新し、制約を適用した新しいPointsSnapshotを返す
     */
    public movePoint(pointId: string, newX: number, newY: number): Snapshot {
        const nextSnapshot = this.clone();
        const pointToModify = nextSnapshot.get(pointId);
        if (!pointToModify) {
            console.error(`Point with id ${pointId} not found for update.`);
            return nextSnapshot;
        }

        pointToModify.x = newX;
        pointToModify.y = newY;

        this.restraints.forEach((restraint) => {
            restraint.apply({
                before: this.points,
                after: nextSnapshot.points,
            });
        });

        return nextSnapshot;
    }

    private clone(): Snapshot {
        return new Snapshot(
            [...this.points.values()].map((point) => point.clone()),
            this.restraints
        );
    }

    public values(): IterableIterator<Point> {
        return this.points.values();
    }
}
