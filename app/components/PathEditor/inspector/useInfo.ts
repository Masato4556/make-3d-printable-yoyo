/**
 * ヨーヨーの詳細データを計算するhooks
 */

import { useMemo } from "react";
import { Vector2 } from "../../../math/vector2";
import { useCurveStore } from "../../../stores/useCurveStore";
import { calculateVolume } from "../../../functions/calculateVolume";

export function useInfo() {
  const { getPath } = useCurveStore();
  return useMemo(() => {
    const path = getPath();
    const volumeMm3 = calculateYoyoVolume(path);
    return { volumeCm3: volumeMm3 / 1000 };
  }, [getPath]);
}

function calculateYoyoVolume(yoyoPath: Vector2[]): number {
  return yoyoPath.reduce((acc, _, ind, arr) => {
    if (ind === 0) {
      return acc;
    }

    const prev = arr[ind - 1];
    const current = arr[ind];
    if (prev === undefined || current === undefined) {
      return acc;
    }

    const { x: x1, y: y1 } = prev;
    const { x: x2, y: y2 } = current;
    if (x1 === x2) {
      return acc;
    }

    const a = (y2 - y1) / (x2 - x1);
    const b = y1 - a * x1;

    acc += calculateVolume(a, b, { start: x1, end: x2 }, 1000);

    return acc;
  }, 0);
}
