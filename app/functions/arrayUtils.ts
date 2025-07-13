/**
 * 配列の連続する2つの要素を安全に処理するためのユーティリティ関数
 */

/**
 * 配列をペア（隣接する2つの要素）に分割する
 * TypeScriptの型安全性を保ちながら処理できる
 */
export function pairwise<T>(array: T[]): [T, T][] {
  const pairs: [T, T][] = [];
  for (let i = 0; i < array.length - 1; i++) {
    pairs.push([array[i]!, array[i + 1]!]);
  }
  return pairs;
}

/**
 * 配列の各ペアに対してコールバック関数を実行する
 * reduceパターンで値を累積する場合に便利
 */
export function reducePairwise<T, R>(
  array: T[],
  callback: (accumulator: R, current: T, next: T, index: number) => R,
  initialValue: R
): R {
  if (array.length < 2) {
    return initialValue;
  }

  let accumulator = initialValue;
  for (let i = 0; i < array.length - 1; i++) {
    accumulator = callback(accumulator, array[i]!, array[i + 1]!, i);
  }
  return accumulator;
}

/**
 * 配列の各ペアに対してコールバック関数を実行する
 * forEachパターン（戻り値なし）
 */
export function forEachPairwise<T>(
  array: T[],
  callback: (current: T, next: T, index: number) => void
): void {
  for (let i = 0; i < array.length - 1; i++) {
    callback(array[i]!, array[i + 1]!, i);
  }
}

/**
 * 配列の各ペアをマップして新しい配列を作成
 */
export function mapPairwise<T, R>(
  array: T[],
  callback: (current: T, next: T, index: number) => R
): R[] {
  const result: R[] = [];
  for (let i = 0; i < array.length - 1; i++) {
    result.push(callback(array[i]!, array[i + 1]!, i));
  }
  return result;
}
