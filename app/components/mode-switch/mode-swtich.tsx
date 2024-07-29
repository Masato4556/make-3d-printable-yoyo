import { Mode } from "~/routes/_index";

type Props = {
  setMode: (mode: Mode) => void;
};

export function ModeSwitch(props: Props) {
  const { setMode } = props;
  return (
    <div className="ui-header">
      <button
        className="mode-button flex-item"
        onClick={() => {
          setMode("path");
        }}
      >
        SHAPE
      </button>
      <div>{" > "}</div>
      <button
        className="mode-button flex-item"
        onClick={() => {
          setMode("model");
        }}
      >
        DOWNLOAD
      </button>
    </div>
  );
}
