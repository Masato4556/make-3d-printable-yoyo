import { useMemo } from "react";
import { useYoyoPath } from "~/contexts/YoyoPathContext";

export function useInfo() {
  const { yoyoPath } = useYoyoPath();
  return useMemo(() => {
    const volumeMm3 = yoyoPath.reduce((acc, _, ind, arr) => {
      if (ind === 0) {
        return acc;
      }

      const { x: x1, y: y1 } = arr[ind - 1];
      const { x: x2, y: y2 } = arr[ind];
      if (x1 === x2) {
        return acc;
      }

      const a = (y2 - y1) / (x2 - x1);
      const b = y1 - a * x1;

      acc += calculateVolume(a, b, x1, x2, 1000);

      return acc;
    }, 0);

    return { volumeCm3: volumeMm3 / 1000 };
  }, [yoyoPath]);
}

/**
 * 合成シンプソン公式を用いた体積を計算する関数
 *
 * 計算誤差を小さくするために合成シンプソン公式を用いている。（おそらく効果あり）
 * 合成シンプソン公式については以下のリンクを参照
 * https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%B3%E3%83%97%E3%82%BD%E3%83%B3%E3%81%AE%E5%85%AC%E5%BC%8F
 */
function calculateVolume(
  a: number, // 傾き
  b: number, // 切片
  p: number, // 積分区間の下限
  q: number, // 積分区間の上限
  n: number = 1000 // 区間の分割数
): number {
  const pi = Math.PI;

  // 被積分関数 f(x) = (ax + b)^2
  function f(x: number): number {
    return Math.pow(a * x + b, 2);
  }

  // シンプソン法の適用
  const h = (q - p) / n; // 区間の幅
  let sum = f(p) + f(q); // 最初と最後の値

  for (let i = 1; i < n; i += 2) {
    sum += 4 * f(p + i * h); // 奇数番目の点
  }
  for (let i = 2; i < n - 1; i += 2) {
    sum += 2 * f(p + i * h); // 偶数番目の点
  }

  // 体積 = π * ∫[p, q] f(x) dx
  return ((pi * h) / 3) * sum;
}
