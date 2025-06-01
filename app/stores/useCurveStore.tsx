/**
 * ヨーヨーのカーブを管理するコンテキスト
 */

import { create } from "zustand";
import { Vector2 } from "../math/vector2";

type PathStore = {
  path: Vector2[];
  setPath: (path: Vector2[]) => void;
};

export const usePathStore = create<PathStore>((set) => ({
  path: [],
  setPath: (path: Vector2[]) => set({ path }),
}));
