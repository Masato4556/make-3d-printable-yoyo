import { create } from "zustand";

export enum Mode {
  PATH = "PATH",
  MODEL = "MODEL",
}

type ModeStore = {
  mode: Mode;
  change: (mode: Mode) => void;
};

export const useModeStore = create<ModeStore>((set) => ({
  mode: Mode.PATH,
  change: (mode: Mode) => set({ mode }),
}));
