/**
 * ヨーヨーのパスエディターのトップレベルコンポーネント
 */
import { Inspector } from "./inspector/Inspector";
import { CurveEditor } from "./CurveEditor/CurveEditor";
import { Layer, Stage } from "react-konva";
import { useWindowSize } from "../../hooks/useWindowSize";
import { GridLayer } from "./GridLayer";
import { BearingPathLayer } from "./BearingPathLayer";
import { Bearing } from "../../yoyo/bearing";

type Props = {
  hidden: boolean;
};

export function Editor(props: Props) {
  const { hidden } = props;

  const { width, height } = useWindowSize();

  const bearing = Bearing.fromSize("sizeC");
  const scale = 5;

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
          <CurveEditor bearing={bearing} scale={scale} />
        </Layer>
        <BearingPathLayer bearing={bearing} zIndex={5} scale={scale} />
        <GridLayer width={width} height={height} zIndex={-10} scale={scale} />
      </Stage>
      {!hidden && <Inspector />}
    </>
  );
}
