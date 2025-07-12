import { describe, it, expect } from "vitest";
import { getCubicBezierCurve } from "./getCubicBezierCurve";
import { Vector2 } from "../models/math/vector2";

describe("getCubicBezierCurve", () => {
  it("should return the correct number of points for a simple curve", () => {
    const v0 = new Vector2(0, 0);
    const v1 = new Vector2(1, 1);
    const v2 = new Vector2(2, 1);
    const v3 = new Vector2(3, 0);
    const numPoints = 5;

    const curve = getCubicBezierCurve({ v0, v1, v2, v3 }, numPoints);

    expect(curve.length).toBe(numPoints);
    // Check start and end points
    expect(curve[0]?.x).toBeCloseTo(v0.x);
    expect(curve[0]?.y).toBeCloseTo(v0.y);
    expect(curve[numPoints - 1]?.x).toBeCloseTo(v3.x);
    expect(curve[numPoints - 1]?.y).toBeCloseTo(v3.y);
  });

  it("should throw an error if numPoints is less than 2", () => {
    const v0 = new Vector2(0, 0);
    const v1 = new Vector2(1, 1);
    const v2 = new Vector2(2, 1);
    const v3 = new Vector2(3, 0);

    expect(() => getCubicBezierCurve({ v0, v1, v2, v3 }, 0)).toThrowError(
      "numPoints must be greater than 2"
    );
    expect(() => getCubicBezierCurve({ v0, v1, v2, v3 }, 1)).toThrowError(
      "numPoints must be greater than 2"
    );
  });

  it("should return points that approximate a straight line for collinear control points", () => {
    const v0 = new Vector2(0, 0);
    const v1 = new Vector2(1, 1);
    const v2 = new Vector2(2, 2);
    const v3 = new Vector2(3, 3);
    const numPoints = 10;

    const curve = getCubicBezierCurve({ v0, v1, v2, v3 }, numPoints);

    expect(curve.length).toBe(numPoints);
    for (let i = 0; i < numPoints; i++) {
      const expectedX = (i / (numPoints - 1)) * 3;
      const expectedY = (i / (numPoints - 1)) * 3;
      expect(curve[i]?.x).toBeCloseTo(expectedX);
      expect(curve[i]?.y).toBeCloseTo(expectedY);
    }
  });

  it("should pass through (0, 0) when the control points are symmetric around (0, 0)", () => {
    const v0 = new Vector2(-1, -1);
    const v1 = new Vector2(-1, 0);
    const v2 = new Vector2(1, 0);
    const v3 = new Vector2(1, 1);
    const numPoints = 3; // Fewer points for easier direct comparison

    const curve = getCubicBezierCurve({ v0, v1, v2, v3 }, numPoints);

    expect(curve.length).toBe(numPoints);

    expect(curve[1]?.x).toBeCloseTo(0);
    expect(curve[1]?.y).toBeCloseTo(0);
  });
});
