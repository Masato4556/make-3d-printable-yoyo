import { ChangeEventHandler, useCallback } from "react";
import { useFormState, useFormDispatch } from "~/contexts/FormContext";
import { useModelState } from "~/contexts/ModelContext";

export function Form() {
  const { diameter, width } = useFormState();
  const { blob, type } = useModelState();
  const dispatch = useFormDispatch();
  const changeDiameter: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({ type: "SET_DIAMETER", payload: e.target.value });
  const changeWidth: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({ type: "SET_WIDTH", payload: e.target.value });

  const downloadStl = useCallback(() => {
    if (!blob || !type) return;
    const element = document.createElement("a");
    const file = new Blob([blob], { type: type });
    element.href = URL.createObjectURL(file);
    element.download = "yoyo.stl";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }, [blob, type]);

  return (
    <div className="overlay-form-box">
      <input
        name="diameter"
        type="number"
        defaultValue={diameter}
        onChange={changeDiameter}
        min={20}
        max={100}
      />
      <input
        type="number"
        defaultValue={width}
        onChange={changeWidth}
        min={20}
        max={100}
      />
      <button onClick={downloadStl}>ダウンロード</button>
    </div>
  );
}
