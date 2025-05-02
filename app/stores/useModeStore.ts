import { create } from "zustand";

export type Mode = "PATH" | "MODEL";

type ModeStore = {
  mode: Mode;
  change: (mode: Mode) => void;
};

export const useModeStore = create<ModeStore>((set) => ({
  mode: "PATH",
  change: (mode: Mode) => set({ mode }),
}));
