import { describe, expect, it } from "vitest";
import { YoyoShape, Point, CSizeBearingPresetYoyoShapeBuilder } from "./index";

describe("YoyoShape", () => {
  describe("createDefault", () => {
    it("should create a default YoyoShape with points, connections, and a bearing seat", () => {
      const yoyoShape = CSizeBearingPresetYoyoShapeBuilder.build();

      expect(yoyoShape).toBeInstanceOf(YoyoShape);
      expect(yoyoShape.getPoints().length).toBeGreaterThan(0);
      expect(yoyoShape.getConnections().length).toBeGreaterThan(0);
      expect(yoyoShape.getBearing()).toBeDefined();
      expect(yoyoShape.getPath().length).toBeGreaterThan(0);
    });
  });

  describe("getPoint", () => {
    it("should get a point by its ID", () => {
      const yoyoShape = CSizeBearingPresetYoyoShapeBuilder.build();
      const firstPoint = yoyoShape.getPoints()[0];
      expect(firstPoint).toBeDefined();

      const foundPoint = yoyoShape.getPoint(firstPoint!.id);
      expect(foundPoint).toBe(firstPoint);
    });

    it("should throw an error if the point ID does not exist", () => {
      const yoyoShape = CSizeBearingPresetYoyoShapeBuilder.build();
      expect(() => yoyoShape.getPoint("non-existent-id")).toThrow();
    });
  });

  describe("movePoint", () => {
    it("should return a new YoyoShape instance and not mutate the original", () => {
      const initialShape = CSizeBearingPresetYoyoShapeBuilder.build();
      const pointToMove = initialShape
        .getPoints()
        .find((p: Point) => p.option?.editable);
      expect(pointToMove, "No editable point found for testing").toBeDefined();

      const pointId = pointToMove!.id;
      const originalPointPosition = { x: pointToMove!.x, y: pointToMove!.y };
      const newPosition = {
        x: originalPointPosition.x + 5,
        y: originalPointPosition.y - 5,
      };

      const newShape = initialShape.movePoint(
        pointId,
        newPosition.x,
        newPosition.y
      );

      // 1. Check if a new instance is returned
      expect(newShape).toBeInstanceOf(YoyoShape);
      expect(newShape).not.toBe(initialShape);

      // 2. Check if the point in the new instance is moved
      const movedPoint = newShape.getPoint(pointId);
      expect(movedPoint.x).toBe(newPosition.x);
      expect(movedPoint.y).toBe(newPosition.y);

      // 3. Check if the point in the original instance is not moved (immutability)
      const pointInOriginalShape = initialShape.getPoint(pointId);
      expect(pointInOriginalShape.x).toBe(originalPointPosition.x);
      expect(pointInOriginalShape.y).toBe(originalPointPosition.y);
    });

    it("should apply 'FollowY' restraint when a controlling point is moved", () => {
      const initialShape = CSizeBearingPresetYoyoShapeBuilder.build();
      const points = initialShape.getPoints();

      // From the definition in YoyoCurveBuilder, the point at (21, 27.5) controls the Y-coordinate of the point at (28, 27.5)
      const controllingPoint = points.find(
        (p: Point) => p.x === 21 && p.y === 27.5
      );
      const followerPoint = points.find(
        (p: Point) => p.x === 28 && p.y === 27.5
      );

      expect(
        controllingPoint,
        "Controlling point for FollowY not found"
      ).toBeDefined();
      expect(
        followerPoint,
        "Follower point for FollowY not found"
      ).toBeDefined();

      const newY = controllingPoint!.y + 10;
      const newShape = initialShape.movePoint(
        controllingPoint!.id,
        controllingPoint!.x,
        newY
      );

      const followerInNewShape = newShape.getPoint(followerPoint!.id);

      // The Y-coordinate should follow due to the FollowY restraint
      expect(followerInNewShape.y).toBe(newY);
      // The X-coordinate should remain unchanged
      expect(followerInNewShape.x).toBe(followerPoint!.x);
    });
  });
});
