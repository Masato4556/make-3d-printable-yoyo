import { describe, it, expect } from "vitest";
import { generateConnectionsWithEffects } from "./generateConnectionsWithEffects";
import { Point } from "../../Point";
import { LineConnection } from "../LineConnection";

describe("generateConnectionsWithEffects", () => {
  it("should apply chamfer to a corner", () => {
    const p1 = new Point({ x: 0, y: 0 });
    const p2 = new Point({
      x: 10,
      y: 0,
      cornerEffect: { type: "chamfer", size: 2 },
    });
    const p3 = new Point({ x: 10, y: 10 });

    const connections = [
      new LineConnection(p1.id, p2.id),
      new LineConnection(p2.id, p3.id),
    ];

    const getPoint = (id: string) => {
      if (id === p1.id) return p1;
      if (id === p2.id) return p2;
      if (id === p3.id) return p3;
      throw new Error("Point not found");
    };

    const { processedConnections, generatedPoints } =
      generateConnectionsWithEffects(connections, getPoint);

    expect(processedConnections.length).toBe(3);
    expect(generatedPoints.size).toBe(2);

    const chamferStartPoint = generatedPoints.get(
      processedConnections[1]!.startPointId
    );
    const chamferEndPoint = generatedPoints.get(
      processedConnections[1]!.endPointId
    );

    expect(chamferStartPoint!.x).toBeCloseTo(8);
    expect(chamferStartPoint!.y).toBeCloseTo(0);
    expect(chamferEndPoint!.x).toBeCloseTo(10);
    expect(chamferEndPoint!.y).toBeCloseTo(2);
  });
});
