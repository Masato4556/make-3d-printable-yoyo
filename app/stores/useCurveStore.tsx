/**
 * ヨーヨーのカーブを管理するコンテキスト
 */

import { create } from "zustand";
import { YoyoCurve } from "../yoyo/curves/YoyoCurve";
import { useMemo } from "react";
import { Vector2 } from "../math/vector2";

type CurvesStore = {
  curves: YoyoCurve[];
  setCurves: (curves: YoyoCurve[]) => void;
};

export const useCurvesStore = create<CurvesStore>((set) => ({
  curves: [],
  setCurves: (curves: YoyoCurve[]) => set({ curves }),
}));

export const useCurveVectors = () => {
  const { curves } = useCurvesStore();
  return useMemo(
    () =>
      curves.reduce<Vector2[]>((acc, cur) => [...acc, ...cur.getPath()], []),
    [curves]
  );
};
