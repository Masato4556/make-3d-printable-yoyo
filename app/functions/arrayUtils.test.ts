import { describe, expect, it } from "vitest";
import {
  pairwise,
  reducePairwise,
  forEachPairwise,
  mapPairwise,
} from "./arrayUtils";

describe("arrayUtils", () => {
  const testArray = [1, 2, 3, 4, 5];

  describe("pairwise", () => {
    it("should return pairs of adjacent elements", () => {
      const result = pairwise(testArray);
      expect(result).toEqual([
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ]);
    });

    it("should return empty array for arrays with less than 2 elements", () => {
      expect(pairwise([])).toEqual([]);
      expect(pairwise([1])).toEqual([]);
    });
  });

  describe("reducePairwise", () => {
    it("should reduce pairs with accumulator", () => {
      const result = reducePairwise(
        testArray,
        (acc, current, next) => acc + (next - current),
        0
      );
      expect(result).toBe(4); // (2-1) + (3-2) + (4-3) + (5-4) = 4
    });

    it("should return initial value for arrays with less than 2 elements", () => {
      expect(
        reducePairwise([], (acc, current, next) => acc + next - current, 10)
      ).toBe(10);
      expect(
        reducePairwise([1], (acc, current, next) => acc + next - current, 10)
      ).toBe(10);
    });
  });

  describe("forEachPairwise", () => {
    it("should execute callback for each pair", () => {
      const results: number[] = [];
      forEachPairwise(testArray, (current, next) => {
        results.push(next - current);
      });
      expect(results).toEqual([1, 1, 1, 1]);
    });
  });

  describe("mapPairwise", () => {
    it("should map each pair to new values", () => {
      const result = mapPairwise(testArray, (current, next) => next - current);
      expect(result).toEqual([1, 1, 1, 1]);
    });

    it("should work with different types", () => {
      const points = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 4 },
      ];

      const distances = mapPairwise(points, (p1, p2) =>
        Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
      );

      expect(distances).toHaveLength(2);
      expect(distances[0]).toBeCloseTo(Math.sqrt(2));
      expect(distances[1]).toBeCloseTo(Math.sqrt(10));
    });
  });
});
