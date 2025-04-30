/**
 * ヨーヨーのパスエディターのトップレベルコンポーネント
 */
import { Inspector } from "./inspector/Inspector";
import { CurveEditor } from "./curves/CurveEditor";
import { Xaxis } from "./Xaxis";
import { Layer, Stage } from "react-konva";
import { useWindowSize } from "../../hooks/useWindowSize";

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
          <Xaxis />
        </Layer>
      </Stage>
      {!hidden && <Inspector />}
    </>
  );
}
