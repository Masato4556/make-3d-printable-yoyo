import { ChangeEventHandler } from "react";
import { useFormState, useFormDispatch } from "~/contexts/FormContext";

type Props = {
  downloadStl: () => void;
};

export function Form(props: Props) {
  const { downloadStl } = props;
  const { diameter, width } = useFormState();
  const dispatch = useFormDispatch();
  const changeDiameter: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({ type: "SET_DIAMETER", payload: e.target.value });
  const changeWidth: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({ type: "SET_WIDTH", payload: e.target.value });

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
