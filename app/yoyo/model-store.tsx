/**
 * ダウンロードするモデルデータを保持するストア
 */

import { create } from "zustand";

type ModelStore = {
  bearingSeat: Blob | undefined;
  wing: Blob | undefined;
  setBearingSeat: (blob: Blob) => void;
  setWing: (blob: Blob) => void;
};

export const useModelStore = create<ModelStore>((set) => ({
  bearingSeat: undefined,
  wing: undefined,
  setBearingSeat: (blob: Blob) => set({ bearingSeat: blob }),
  setWing: (blob: Blob) => set({ wing: blob }),
}));
