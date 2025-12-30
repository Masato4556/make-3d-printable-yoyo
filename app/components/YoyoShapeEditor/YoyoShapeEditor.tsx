/**
 * ヨーヨーのパスエディターのトップレベルコンポーネント
 */
import { InteractiveCurve } from "./InteractiveCurve/InteractiveCurve";
import { Layer, Stage } from "react-konva";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useCurveStore } from "../../stores/useCurveStore";
import { GridLayer } from "./GridLayer";
import { BearingPathLayer } from "./BearingPathLayer";


export function YoyoShapeEditor() {
  const { width, height } = useWindowSize();

  const { shape } = useCurveStore();
  const bearing = shape.getBearing();
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
          <InteractiveCurve bearing={bearing} scale={scale} />
        </Layer>
        <BearingPathLayer bearing={bearing} zIndex={5} scale={scale} />
        <GridLayer width={width} height={height} zIndex={-10} scale={scale} />
      </Stage>
    </>
  );
}
