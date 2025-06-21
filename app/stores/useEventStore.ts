import { create } from "zustand";

type EventStore = {
  updatePathEvent: { lastPublished?: number | null };
  publishUpdatePathEvent: () => void;
};

export const useEventStore = create<EventStore>((set) => ({
  updatePathEvent: { lastPublished: null },
  publishUpdatePathEvent: () => {

    set((state) => {
      const now = Date.now();
      if (state.updatePathEvent.lastPublished && now - state.updatePathEvent.lastPublished < 10000) {
        return state;
      }
      return {
        ...state,
        updatePathEvent: { lastPublished: now },
      };
    });
  },
}));


