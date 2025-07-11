/**
 * 合成シンプソン公式を用いた体積を計算する関数
 * @param a 傾き
 * @param b 切片
 * @param closedInterval 体積を求める区間（閉区間）
 * @param n 区間の分割数
 * @returns 体積
 *
 * 計算誤差を小さくするために合成シンプソン公式を用いている。（おそらく効果あり）
 * 合成シンプソン公式については以下のリンクを参照
 * https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%B3%E3%83%97%E3%82%BD%E3%83%B3%E3%81%AE%E5%85%AC%E5%BC%8F
 */
export function calculateVolume(
  a: number,
  b: number,
  closedInterval: ClosedInterval,
  n: number = 1000
): number {
  const { start, end } = closedInterval;
  const pi = Math.PI;

  // 被積分関数 f(x) = (ax + b)^2
  function f(x: number): number {
    return Math.pow(a * x + b, 2);
  }

  // シンプソン法の適用
  const h = (end - start) / n;
  let sum = f(start) + f(end);

  for (let i = 1; i < n; i += 2) {
    sum += 4 * f(start + i * h);
  }
  for (let i = 2; i < n - 1; i += 2) {
    sum += 2 * f(start + i * h);
  }

  // 体積 = π * ∫[start, end] f(x) dx
  return ((pi * h) / 3) * sum;
}

interface ClosedInterval {
  start: number;
  end: number;
}
