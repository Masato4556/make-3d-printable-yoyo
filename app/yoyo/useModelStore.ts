/**
 * ダウンロードするモデルデータを保持するストア
 */

import { create } from "zustand";

type ModelStore = {
  wing: Blob | undefined;
  setWing: (blob: Blob) => void;
};

export const useModelStore = create<ModelStore>((set) => ({
  wing: undefined,
  setWing: (blob: Blob) => set({ wing: blob }),
}));
