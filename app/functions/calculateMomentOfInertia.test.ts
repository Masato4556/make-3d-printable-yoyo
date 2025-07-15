/**
 * ヨーヨーの慣性モーメント計算関数のテスト
 * 
 * 基本的な回転体の理論値検証とエッジケースをカバーする
 * 冗長なテストを排除し、必要最小限の検証に集約
 */

import { describe, it, expect } from "vitest";
import { calculateYoyoMomentOfInertia } from "./calculateMomentOfInertia";

const density = 1; // 単位密度で理論値との比較を簡単にする

function testBasicShapes() {
  describe("基本的な回転体の理論値検証", () => {
    it("円柱の慣性モーメントを正しく計算する", () => {
      // 半径5、高さ10の円柱
      const points = [
        { x: 0, y: 5 },
        { x: 10, y: 5 },
      ];

      const result = calculateYoyoMomentOfInertia(points, density);

      // 円柱の理論値: I = (1/2) * m * r²
      // 体積 V = π * r² * h = π * 25 * 10 = 250π
      // 質量 m = 250π * 1 = 250π
      // 慣性モーメント I = (1/2) * 250π * 25 = 3125π
      const expectedMomentOfInertia = 3125 * Math.PI;

      expect(result).toBeCloseTo(expectedMomentOfInertia, 3);
    });

    it("中空円柱の慣性モーメントを正しく計算する", () => {
      // 外径半径=5、内径半径=3、高さ=8
      const points = [
        { x: 0, y: 5 }, // 外径
        { x: 8, y: 5 },
        { x: 8, y: 3 }, // 内径
        { x: 0, y: 3 },
      ];

      const result = calculateYoyoMomentOfInertia(points, density);

      // 中空円柱の理論値: I = (1/2) * m * (r_outer² + r_inner²)
      // 実体積: V = π * (5² - 3²) * 8 = 128π
      // 質量: m = 128π
      // 慣性モーメント: I = (1/2) * 128π * (25 + 9) = 2176π
      const expectedMomentOfInertia = 2176 * Math.PI;

      expect(result).toBeCloseTo(expectedMomentOfInertia, 2);
    });

    it("円錐の慣性モーメントを正しく計算する", () => {
      // 底面半径5、高さ10の円錐
      const points = [
        { x: 0, y: 5 }, // 底面
        { x: 10, y: 0 }, // 頂点
      ];

      const result = calculateYoyoMomentOfInertia(points, density);

      // 円錐の理論値: I = (3/10) * m * r²
      // 体積 V = (1/3) * π * r² * h = (1/3) * π * 25 * 10 = 250π/3
      // 質量 m = 250π/3
      // 慣性モーメント I = (3/10) * (250π/3) * 25 = 625π
      const expectedMomentOfInertia = 625 * Math.PI;

      expect(result).toBeCloseTo(expectedMomentOfInertia, 2);
    });
  });
}

function testEdgeCases() {
  describe("エッジケース", () => {
    it("空の配列の場合は0を返す", () => {
      const points: { x: number; y: number }[] = [];
      const result = calculateYoyoMomentOfInertia(points, density);
      expect(result).toBe(0);
    });

    it("点が1つの場合は0を返す", () => {
      const points = [{ x: 0, y: 5 }];
      const result = calculateYoyoMomentOfInertia(points, density);
      expect(result).toBe(0);
    });

    it("dx=0の区間を正しく処理する", () => {
      const points = [
        { x: 0, y: 3 },
        { x: 0, y: 3 }, // dx=0の区間
        { x: 5, y: 3 },
      ];

      const result = calculateYoyoMomentOfInertia(points, density);
      
      // dx=0の区間は無視され、有効な区間のみが計算される
      const expectedPoints = [{ x: 0, y: 3 }, { x: 5, y: 3 }];
      const expected = calculateYoyoMomentOfInertia(expectedPoints, density);
      
      expect(result).toBeCloseTo(expected, 3);
    });
  });
}

function testPhysicalValidity() {
  describe("物理的妥当性", () => {
    it("密度に対して線形にスケールする", () => {
      const shape = [{ x: 0, y: 20 }, { x: 10, y: 20 }];

      const baseDensity = 1.0;
      const baseResult = calculateYoyoMomentOfInertia(shape, baseDensity);
      
      // 異なる密度での線形性を検証
      const densities = [1.25, 2.7, 7.85]; // PLA、アルミニウム、鋼鉄
      
      densities.forEach(density => {
        const result = calculateYoyoMomentOfInertia(shape, density);
        expect(result).toBeCloseTo(baseResult * density, 3);
      });
    });

    it("正の値を返し、基本的な物理法則に従う", () => {
      const simpleShape = [{ x: 0, y: 10 }, { x: 5, y: 10 }];
      const result = calculateYoyoMomentOfInertia(simpleShape, 1);
      
      // 慣性モーメントは常に正の値
      expect(result).toBeGreaterThan(0);
      
      // より大きな半径の形状はより大きな慣性モーメントを持つ
      const largerShape = [{ x: 0, y: 20 }, { x: 5, y: 20 }];
      const largerResult = calculateYoyoMomentOfInertia(largerShape, 1);
      expect(largerResult).toBeGreaterThan(result);
    });
  });
}

describe("calculateYoyoMomentOfInertia", () => {
  testBasicShapes();
  testEdgeCases();
  testPhysicalValidity();
});
