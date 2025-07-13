import { reducePairwise } from "./arrayUtils";

// MEMO：この関数（およびテストケース）が正しいか自信がない。3DCADの慣性モーメント計算と同様の値になるかを確認したい。
export const calculateYoyoMomentOfInertia = (
  points: { x: number; y: number }[], // x: 軸方向, y: 回転軸からの距離
  density: number
): number =>
  // 回転体として各要素の慣性モーメントを積分
  // I = ∫ r² dm (rは回転軸からの距離)
  reducePairwise(
    points,
    (totalMomentOfInertia, point1, point2) => {
      const r1 = point1.y; // 回転軸からの距離
      const r2 = point2.y;
      const dx = point2.x - point1.x; // x方向の変化（符号を保持）

      // dx=0の場合は体積寄与なし
      if (dx === 0) {
        return totalMomentOfInertia;
      }

      // 台形の回転体の慣性モーメント（正確な公式を使用）
      // I = (π * ρ * h / 10) * (r1⁴ + r1³*r2 + r1²*r2² + r1*r2³ + r2⁴)
      // 質量が負の場合、慣性モーメントも負になる（中空部分の減算を表す）
      const r1_2 = r1 * r1;
      const r2_2 = r2 * r2;
      const r1_4 = r1_2 * r1_2;
      const r2_4 = r2_2 * r2_2;
      const momentOfInertia =
        ((Math.PI * density * dx) / 10) *
        (r1_4 + r1 * r1_2 * r2 + r1_2 * r2_2 + r1 * r2 * r2_2 + r2_4);

      return totalMomentOfInertia + momentOfInertia;
    },
    0
  );
