import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ModeSwitch } from "./mode-swtich";

describe("ModeSwitch", () => {
  it("should call setMode with 'path' when SHAPE button is clicked", async () => {
    const setModeMock = vi.fn();
    render(<ModeSwitch setMode={setModeMock} />);

    const shapeButton = screen.getByText("SHAPE");
    await userEvent.click(shapeButton);

    expect(setModeMock).toHaveBeenCalledWith("path");
  });

  it("should call setMode with 'model' when DOWNLOAD button is clicked", async () => {
    const setModeMock = vi.fn();
    render(<ModeSwitch setMode={setModeMock} />);

    const downloadButton = screen.getByText("DOWNLOAD");
    await userEvent.click(downloadButton);

    expect(setModeMock).toHaveBeenCalledWith("model");
  });
});
