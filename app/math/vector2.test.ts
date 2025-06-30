import { describe, it, expect } from "vitest";
import { Vector2 } from "./vector2";

describe("Vector2", () => {
  it("should create a new Vector2 instance", () => {
    const v = new Vector2(1, 2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  it("should return a new Vector2 with updated x value", () => {
    const v = new Vector2(1, 2);
    const newV = v.withX(3);
    expect(newV.x).toBe(3);
    expect(newV.y).toBe(2);
    expect(v.x).toBe(1); // Original should not be modified
  });

  it("should return a new Vector2 with updated y value", () => {
    const v = new Vector2(1, 2);
    const newV = v.withY(4);
    expect(newV.x).toBe(1);
    expect(newV.y).toBe(4);
    expect(v.y).toBe(2); // Original should not be modified
  });

  it("should add two vectors", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(3, 4);
    const result = v1.add(v2);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  it("should subtract two vectors", () => {
    const v1 = new Vector2(5, 6);
    const v2 = new Vector2(1, 2);
    const result = v1.sub(v2);
    expect(result.x).toBe(4);
    expect(result.y).toBe(4);
  });

  it("should return true if two vectors are equal", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(1, 2);
    expect(v1.equals(v2)).toBe(true);
  });

  it("should return false if two vectors are not equal", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(3, 4);
    expect(v1.equals(v2)).toBe(false);
  });

  it("should return false if x values are different", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(10, 2);
    expect(v1.equals(v2)).toBe(false);
  });

  it("should return false if y values are different", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(1, 20);
    expect(v1.equals(v2)).toBe(false);
  });
});
