import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "./useWindowSize";
import { describe, it, expect } from "vitest";

describe("useWindowSize", () => {
  it("should return the initial window size", () => {
    const { result } = renderHook(() => useWindowSize());
    // happy-domでの画面解像度のデフォルト値
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("should update the window size on resize", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 500;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 500, height: 500 });
  });
});
