/**
 * 配列の各ペアに対してコールバック関数を実行する
 * reduceパターンで値を累積する場合に便利
 * @param array - 対象の配列
 * @param callback - 各ペアに対して実行するコールバック関数
 * @param initialValue - 初期値
 * @returns 累積された値
 * @description
 * - 配列の長さが1以下の場合は初期値を返す
 * - コールバック関数は、累積値、現在の要素、次の要素、インデックスを引数に取る
 * - TypeScriptの型安全性を保ちながら処理できる
 * - コールバック関数は、累積値を返す必要がある
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
