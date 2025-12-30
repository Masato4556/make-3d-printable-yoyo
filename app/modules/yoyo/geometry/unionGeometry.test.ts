import { describe, it, expect } from "vitest";
import { BoxGeometry } from "three";
import { differenceGeometry } from "./unionGeometry";

describe("differenceGeometry", () => {
  it("should return a BufferGeometry after performing difference operation", () => {
    const geometry1 = new BoxGeometry(10, 10, 10);
    const geometry2 = new BoxGeometry(5, 5, 5);
    const result = differenceGeometry(geometry1, geometry2);

    // 結果が BufferGeometry のインスタンスであることを確認
    expect(result.isBufferGeometry).toBe(true);

    // 頂点数や面数で厳密なテストをするのは難しいので、
    // とりあえずエラーなく実行され、BufferGeometryが返ることを確認する
    expect(result.attributes.position?.count).toBeGreaterThan(0);
  });
});
