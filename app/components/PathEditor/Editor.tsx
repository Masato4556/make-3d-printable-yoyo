/**
 * ヨーヨーのパスエディターのトップレベルコンポーネント
 */
import { Inspector } from "./inspector/Inspector";
import { CurveEditor } from "./CurveEditor/CurveEditor";
import { Xaxis } from "./Xaxis";
import { Layer, Stage } from "react-konva";
import { useWindowSize } from "../../hooks/useWindowSize";
import { GridLayer } from "./GridLayer";

type Props = {
  hidden: boolean;
};

export function Editor(props: Props) {
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
        <GridLayer width={width} height={height} zIndex={-10} scale={5} />
      </Stage>
      {!hidden && <Inspector />}
    </>
  );
}
