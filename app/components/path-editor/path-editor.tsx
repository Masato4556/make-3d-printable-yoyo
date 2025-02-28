/**
 * ヨーヨーのパスエディターのトップレベルコンポーネント
 */
import { Inspector } from "./inspector/inspector";
import { CurveEditor } from "./curves/CurveEditor";
import { XAxis } from "./XAxis";
import { Layer, Stage } from "react-konva";

type Props = {
  hidden: boolean;
};

export function PathEditor(props: Props) {
  const { hidden } = props;

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className="background"
        offset={{
          x: -window.innerWidth / 2,
          y: -window.innerHeight / 2,
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
