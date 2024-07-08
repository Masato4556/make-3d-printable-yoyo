import { ChangeEventHandler, useCallback } from "react";
import { useFormState, useFormDispatch } from "~/contexts/FormContext";
import { useModelState } from "~/contexts/ModelContext";

type Props = {
  toggleMode: () => void;
};

export function Form(props: Props) {
  const { toggleMode } = props;
  const { diameter, width } = useFormState();
  const { core, wing } = useModelState();
  const dispatch = useFormDispatch();
  const changeDiameter: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({ type: "SET_DIAMETER", payload: e.target.value });
  const changeWidth: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({ type: "SET_WIDTH", payload: e.target.value });

  const downloadCore = useCallback(() => {
    if (!core.blob || !core.type) return;
    const element = document.createElement("a");
    const file = new Blob([core.blob], { type: core.type });
    element.href = URL.createObjectURL(file);
    element.download = "yoyo.stl";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }, [core]);

  const downloadWing = useCallback(() => {
    if (!wing.blob || !wing.type) return;
    const element = document.createElement("a");
    const file = new Blob([wing.blob], { type: wing.type });
    element.href = URL.createObjectURL(file);
    element.download = "yoyo.stl";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }, [wing]);

  return (
    <div className="overlay-form-box">
      <button onClick={toggleMode}>toggleMode</button>
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
      <button onClick={downloadCore}>COREダウンロード</button>
      <button onClick={downloadWing}>WINGダウンロード</button>
    </div>
  );
}
