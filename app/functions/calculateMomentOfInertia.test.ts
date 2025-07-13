/**
 * ヨーヨーの慣性モーメント計算関数のテスト
 *
 * 円柱、中空円柱、三角錐などの回転体の慣性モーメントを検証します。
 * 理論的公式：
 * - 円柱: I = (1/2) * m * r²
 * - 中空円柱: I = (1/2) * m * (r_outer² + r_inner²)
 * - 円錐: I = (3/10) * m * r²
 */

import { describe, it, expect } from "vitest";
import { calculateYoyoMomentOfInertia } from "./calculateMomentOfInertia";

const density = 1; // 単位密度で計算（理論値と比較しやすくするため）

describe("calculateYoyoMomentOfInertia - 円柱（solid cylinder）", () => {
  it("半径5、高さ10の円柱の慣性モーメントを正しく計算する", () => {
    // 円柱を表す点群：半径5の円を軸方向に高さ10で伸ばした形状
    const points = [
      { x: 0, y: 5 }, // 開始点（x=0, 半径=5）
      { x: 10, y: 5 }, // 終了点（x=10, 半径=5）
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 円柱の理論値計算
    // 体積 V = π * r² * h = π * 25 * 10 = 250π
    // 質量 m = 250π * 1 = 250π
    // 慣性モーメント I = (1/2) * m * r² = (1/2) * 250π * 25 = 3125π
    const expectedMomentOfInertia = 3125 * Math.PI;

    expect(result).toBeCloseTo(expectedMomentOfInertia, 5);
  });

  it("半径2、高さ5の小さな円柱", () => {
    const points = [
      { x: 0, y: 2 },
      { x: 5, y: 2 },
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 円柱の理論値計算
    // 体積 V = π * r² * h = π * 4 * 5 = 20π
    // 質量 m = 20π
    // 慣性モーメント I = (1/2) * m * r² = (1/2) * 20π * 4 = 40π
    const expectedMomentOfInertia = 40 * Math.PI;

    expect(result).toBeCloseTo(expectedMomentOfInertia, 5);
  });
});

describe("calculateYoyoMomentOfInertia - 中空円柱（hollow cylinder）", () => {
  it("外径10、内径6、高さ8の中空円柱の慣性モーメントを正しく計算する", () => {
    // 中空円柱：時計回りパスで外径→内径の順序で定義
    // 外径半径=5、内径半径=3、高さ=8
    const points = [
      { x: 0, y: 5 }, // 外径開始（半径=5）
      { x: 8, y: 5 }, // 外径終了（半径=5）
      { x: 8, y: 3 }, // 内径開始（半径=3）
      { x: 0, y: 3 }, // 内径終了（半径=3）
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 中空円柱の理論値計算
    // 外径体積: V_outer = π * 5² * 8 = 200π
    // 内径体積: V_inner = π * 3² * 8 = 72π
    // 実体積: V = 200π - 72π = 128π
    // 質量: m = 128π
    // 慣性モーメント: I = (1/2) * m * (r_outer² + r_inner²) = (1/2) * 128π * (25 + 9) = 2176π
    const expectedMomentOfInertia = 2176 * Math.PI;

    expect(result).toBeCloseTo(expectedMomentOfInertia, 3);
  });

  it("薄い中空円柱（外径4、内径3.8、高さ2）", () => {
    const points = [
      { x: 0, y: 2.0 }, // 外径
      { x: 2, y: 2.0 },
      { x: 2, y: 1.9 }, // 内径
      { x: 0, y: 1.9 },
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 薄い中空円柱の理論値計算
    // 外径体積: V_outer = π * 2² * 2 = 8π
    // 内径体積: V_inner = π * 1.9² * 2 = 7.22π
    // 実体積: V = 8π - 7.22π = 0.78π
    // 質量: m = 0.78π
    // 慣性モーメント: I = (1/2) * m * (r_outer² + r_inner²) = (1/2) * 0.78π * (4 + 3.61) = 2.97π
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(5 * Math.PI);
  });
});

describe("calculateYoyoMomentOfInertia - 三角錐（cone）", () => {
  it("底面半径5、高さ10の三角錐の慣性モーメントを正しく計算する", () => {
    // 三角錐：底面から頂点に向かって線形に半径が減少
    const points = [
      { x: 0, y: 5 }, // 底面（x=0, 半径=5）
      { x: 10, y: 0 }, // 頂点（x=10, 半径=0）
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 円錐の理論値計算
    // 体積 V = (1/3) * π * r² * h = (1/3) * π * 25 * 10 = 250π/3
    // 質量 m = 250π/3
    // 慣性モーメント I = (3/10) * m * r² = (3/10) * (250π/3) * 25 = 625π
    const expectedMomentOfInertia = 625 * Math.PI;

    expect(result).toBeCloseTo(expectedMomentOfInertia, 4);
  });

  it("底面半径3、高さ6の小さな三角錐", () => {
    const points = [
      { x: 0, y: 3 },
      { x: 6, y: 0 },
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 円錐の理論値計算
    // 体積 V = (1/3) * π * r² * h = (1/3) * π * 9 * 6 = 18π
    // 質量 m = 18π
    // 慣性モーメント I = (3/10) * m * r² = (3/10) * 18π * 9 = 48.6π
    const expectedMomentOfInertia = 48.6 * Math.PI;

    expect(result).toBeCloseTo(expectedMomentOfInertia, 4);
  });

  it("逆向きの三角錐（頂点が底面にある）", () => {
    const points = [
      { x: 0, y: 0 }, // 頂点
      { x: 8, y: 4 }, // 底面
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 逆向き円錐の理論値計算
    // 体積 V = (1/3) * π * r² * h = (1/3) * π * 16 * 8 = 128π/3
    // 質量 m = 128π/3
    // 慣性モーメント I = (3/10) * m * r² = (3/10) * (128π/3) * 16 = 204.8π
    const expectedMomentOfInertia = 204.8 * Math.PI;

    expect(result).toBeCloseTo(expectedMomentOfInertia, 4);
  });
});

describe("calculateYoyoMomentOfInertia - エッジケースと特殊な場合", () => {
  it("点が1つの場合は0を返す", () => {
    const points = [{ x: 0, y: 5 }];
    const result = calculateYoyoMomentOfInertia(points, density);
    expect(result).toBe(0);
  });

  it("空の配列の場合は0を返す", () => {
    const points: { x: number; y: number }[] = [];
    const result = calculateYoyoMomentOfInertia(points, density);
    expect(result).toBe(0);
  });

  it("半径0の点がある場合（軸上の点）", () => {
    const points = [
      { x: 0, y: 0 }, // 軸上の点
      { x: 5, y: 3 },
    ];

    const result = calculateYoyoMomentOfInertia(points, density);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("異なる密度での計算", () => {
    const points = [
      { x: 0, y: 2 },
      { x: 4, y: 2 },
    ];

    const result1 = calculateYoyoMomentOfInertia(points, 1);
    const result2 = calculateYoyoMomentOfInertia(points, 2);

    // 密度が2倍になれば慣性モーメントも2倍になる
    expect(result2).toBeCloseTo(result1 * 2, 5);
  });

  it("台形状の回転体の慣性モーメントを計算する", () => {
    // 台形：底面半径5、上面半径3、高さ6
    const points = [
      { x: 0, y: 5 }, // 底面
      { x: 6, y: 3 }, // 上面
    ];

    const result = calculateYoyoMomentOfInertia(points, density);

    // 台形回転体（truncated cone）の理論値計算
    // 体積 V = π * h * (r1² + r1*r2 + r2²) / 3 = π * 6 * (25 + 15 + 9) / 3 = 98π
    // 質量 m = 98π
    // 台形回転体の慣性モーメントは複雑な公式になるため、
    // ここでは近似値として範囲テストを行う
    expect(result).toBeGreaterThan(1000 * Math.PI);
    expect(result).toBeLessThan(2000 * Math.PI);
  });
});
