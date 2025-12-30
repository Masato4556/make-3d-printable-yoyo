/**
 * ヨーヨーの詳細データを計算するhooks
 */

import { useMemo } from "react";
import { Vector2 } from "../../../modules/math";
import { useCurveStore } from "../../../stores/useCurveStore";
import { calculateVolume } from "../../../functions/calculateVolume";
import { calculateYoyoMomentOfInertia } from "../../../functions/calculateMomentOfInertia";

export function useInfo(infillRate: number, filamentDensity: number) {
  const { shape } = useCurveStore();
  const density = filamentDensity * infillRate;

  return useMemo(() => {
    const volumeMm3 = calculateYoyoVolume(shape.getPath());
    const momentOfInertia = calculateYoyoMomentOfInertia(
      shape.getPath().map((point) => ({
        x: point.x / 1000, // mm to m
        y: point.y / 1000, // mm to m
      })),
      density
    );
    return {
      volumeCm3: (volumeMm3 * 2) / 10 ** 3, // ヨーヨー両側の体積
      massG: ((volumeMm3 * 2) / 10 ** 3) * density,
      momentOfInertia: momentOfInertia * 2, // ヨーヨー両側の慣性モーメント
    };
  }, [density, shape]);
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
