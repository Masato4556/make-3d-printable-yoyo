import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ModeSwitch } from "./ModeSwitch";
import { useModeStore, Mode } from "../../stores/useModeStore";

vi.mock("../../stores/useModeStore");

describe("ModeSwitch", () => {
  it("should call change with 'PATH' when SHAPE button is clicked", async () => {
    const changeMock = vi.fn();
    (useModeStore as unknown as vi.Mock).mockReturnValue({
      mode: Mode.MODEL,
      change: changeMock,
    });

    render(<ModeSwitch />);

    const shapeButton = screen.getByText("SHAPE");
    await userEvent.click(shapeButton);

    expect(changeMock).toHaveBeenCalledWith("PATH");
  });

  it("should call change with 'MODEL' when DOWNLOAD button is clicked", async () => {
    const changeMock = vi.fn();
    (useModeStore as unknown as vi.Mock).mockReturnValue({
      mode: Mode.PATH,
      change: changeMock,
    });

    render(<ModeSwitch />);

    const downloadButton = screen.getByText("DOWNLOAD");
    await userEvent.click(downloadButton);

    expect(changeMock).toHaveBeenCalledWith("MODEL");
  });
});
