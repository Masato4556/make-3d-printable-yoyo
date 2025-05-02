import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ModeSwitch } from "./ModeSwitch";

describe("ModeSwitch", () => {
  it("should call setMode with 'PATH' when SHAPE button is clicked", async () => {
    const setModeMock = vi.fn();
    render(<ModeSwitch setMode={setModeMock} />);

    const shapeButton = screen.getByText("SHAPE");
    await userEvent.click(shapeButton);

    expect(setModeMock).toHaveBeenCalledWith("PATH");
  });

  it("should call setMode with 'MODEL' when DOWNLOAD button is clicked", async () => {
    const setModeMock = vi.fn();
    render(<ModeSwitch setMode={setModeMock} />);

    const downloadButton = screen.getByText("DOWNLOAD");
    await userEvent.click(downloadButton);

    expect(setModeMock).toHaveBeenCalledWith("MODEL");
  });
});
