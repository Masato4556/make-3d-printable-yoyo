import { describe, expect, it } from "vitest";
import { reducePairwise } from "./reducePairwise";

describe("arrayUtils", () => {
  const testArray = [1, 2, 3, 4, 5];

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
});
