/**
 * ヨーヨーのパスエディターのトップレベルコンポーネント
 */
import { Inspector } from "./inspector/inspector";
import { CurveEditor } from "./curves/curve-editor";
import { XAxis } from "./x-axis";
import { Layer, Stage } from "react-konva";
import { useWindowSize } from "~/hooks/use-window-size";

type Props = {
  hidden: boolean;
};

export function PathEditor(props: Props) {
  const { hidden } = props;

  const { width, height } = useWindowSize();

  return (
    <>
      <Stage
        width={width}
        height={height}
        className="background"
        offset={{
          x: -width / 2,
          y: -height / 2,
        }}
      >
        <Layer zIndex={10}>
          <CurveEditor />
        </Layer>
        <Layer zIndex={0}>
          <XAxis />
        </Layer>
      </Stage>
      {!hidden && <Inspector />}
    </>
  );
}
