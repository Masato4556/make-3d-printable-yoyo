import { describe, it, expect } from "vitest";
import { createPathFromConnections } from "./createPathFromConnections";
import { Point } from "../../Point/Point";
import { LineConnection } from "../LineConnection";
import { CubicBezierConnection } from "../CubicBezierConnection";
import { Vector2 } from "../../../../../math/vector2";
import { Connection } from "../Connection";

describe("createPathFromConnections", () => {
  const p1 = new Point({ id: "p1", x: 0, y: 0 });
  const p2 = new Point({ id: "p2", x: 10, y: 20 });
  const p3 = new Point({ id: "p3", x: 30, y: 40 });
  const p4 = new Point({ id: "p4", x: 50, y: 60 });
  const p5 = new Point({ id: "p5", x: 70, y: 80 });
  const points = [p1, p2, p3, p4, p5];

  const getPoint = (id: string) => points.find((p) => p.id === id)!;

  it("should return an empty path when an empty array of connections is passed", () => {
    const connections: Connection[] = [];
    const path = createPathFromConnections(connections, getPoint);
    expect(path).toEqual([]);
  });

  it("should generate the correct path from a LineConnection", () => {
    const connections = [new LineConnection(p1.id, p2.id)];
    const path = createPathFromConnections(connections, getPoint);
    expect(path).toEqual([new Vector2(p1.x, p1.y), new Vector2(p2.x, p2.y)]);
  });

  it("should generate the correct path from a CubicBezierConnection", () => {
    const connections = [
      new CubicBezierConnection({
        id: "c2",
        startPointId: p2.id,
        endPointId: p5.id,
        control1Id: p3.id,
        control2Id: p4.id,
      }),
    ];
    const path = createPathFromConnections(connections, getPoint);
    expect(path.length).toBe(100);
    // 最初と最後の点だけでも確認
    // TODO: きちんとベジェ曲線の形状を確認するテストを追加する
    expect(path[0]?.x).toBeCloseTo(p2.x);
    expect(path[0]?.y).toBeCloseTo(p2.y);
    expect(path[99]?.x).toBeCloseTo(p5.x);
    expect(path[99]?.y).toBeCloseTo(p5.y);
  });

  it("should generate paths from multiple different types of connections", () => {
    const connections = [
      new LineConnection(p1.id, p2.id),
      new CubicBezierConnection({
        id: "c2",
        startPointId: p2.id,
        endPointId: p5.id,
        control1Id: p3.id,
        control2Id: p4.id,
      }),
    ];
    const path = createPathFromConnections(connections, getPoint);
    // Line (2) + Cubic Bezier (100) = 102
    expect(path.length).toBe(102);
    expect(path[0]).toEqual(new Vector2(p1.x, p1.y));
    expect(path[1]).toEqual(new Vector2(p2.x, p2.y));
    expect(path[101]?.x).toBeCloseTo(p5.x);
    expect(path[101]?.y).toBeCloseTo(p5.y);
  });
});
