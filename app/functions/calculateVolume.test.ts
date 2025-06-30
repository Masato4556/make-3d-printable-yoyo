import { describe, it, expect } from "vitest";
import { calculateVolume } from "./calculateVolume";

describe("calculateVolume", () => {
  it("should calculate the volume of a cylinder (a=0)", () => {
    // 円柱の体積: V = π * r^2 * h
    // f(x) = (0 * x + b)^2 = b^2
    // r = b, h = end - start
    const a = 0;
    const b = 2; // 半径 r = 2
    const closedInterval = { start: 0, end: 10 }; // 高さ h = 10
    const expectedVolume =
      Math.PI * Math.pow(b, 2) * (closedInterval.end - closedInterval.start);
    const volume = calculateVolume(a, b, closedInterval);
    expect(volume).toBeCloseTo(expectedVolume);
  });

  it("should calculate the volume of a cone (a!=0, b=0)", () => {
    // 円錐の体積: V = (1/3) * π * r^2 * h
    // f(x) = (a * x + 0)^2 = (ax)^2
    // r(x) = ax
    // ここでは積分範囲を0からhとして、r(h)が最大半径となるようにする
    const a = 1;
    const b = 0;
    const closedInterval = { start: 0, end: 3 }; // 高さ h = 3
    // 積分: ∫[0,3] π * (x)^2 dx = π * [x^3/3]_0^3 = π * (27/3) = 9π
    const expectedVolume = Math.PI * (Math.pow(closedInterval.end, 3) / 3);
    const volume = calculateVolume(a, b, closedInterval);
    expect(volume).toBeCloseTo(expectedVolume);
  });

  it("should handle negative 'a' value correctly", () => {
    // f(x) = (-x + 5)^2
    const a = -1;
    const b = 5;
    const closedInterval = { start: 0, end: 5 };
    // 積分: ∫[0,5] π * (-x+5)^2 dx = π * [-(-x+5)^3/3]_0^5 = π * (0 - (-5)^3/3) = π * (125/3)
    const expectedVolume = Math.PI * (125 / 3);
    const volume = calculateVolume(a, b, closedInterval);
    expect(volume).toBeCloseTo(expectedVolume);
  });

  it("should handle different interval ranges", () => {
    const a = 0;
    const b = 1;
    const closedInterval = { start: 5, end: 10 };
    const expectedVolume =
      Math.PI * Math.pow(b, 2) * (closedInterval.end - closedInterval.start);
    const volume = calculateVolume(a, b, closedInterval);
    expect(volume).toBeCloseTo(expectedVolume);
  });

  it("should return 0 for zero length interval", () => {
    const a = 1;
    const b = 1;
    const closedInterval = { start: 5, end: 5 };
    const expectedVolume = 0;
    const volume = calculateVolume(a, b, closedInterval);
    expect(volume).toBeCloseTo(expectedVolume);
  });

  it("should use default n value if not provided", () => {
    const a = 0;
    const b = 1;
    const closedInterval = { start: 0, end: 1 };
    const expectedVolume =
      Math.PI * Math.pow(b, 2) * (closedInterval.end - closedInterval.start);
    const volume = calculateVolume(a, b, closedInterval);
    expect(volume).toBeCloseTo(expectedVolume);
  });

  it("should calculate with a custom n value", () => {
    const a = 0;
    const b = 1;
    const closedInterval = { start: 0, end: 1 };
    const n = 100; // 少ない分割数で試す
    const expectedVolume =
      Math.PI * Math.pow(b, 2) * (closedInterval.end - closedInterval.start);
    const volume = calculateVolume(a, b, closedInterval, n);
    expect(volume).toBeCloseTo(expectedVolume);
  });
});
