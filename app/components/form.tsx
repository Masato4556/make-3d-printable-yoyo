import { useCallback } from "react";
import { useModelState } from "~/contexts/ModelContext";

type Props = {
  toggleMode: () => void;
};

export function Form(props: Props) {
  const { toggleMode } = props;
  const { core, wing } = useModelState();

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
      <button onClick={downloadCore}>COREダウンロード</button>
      <button onClick={downloadWing}>WINGダウンロード</button>
    </div>
  );
}
