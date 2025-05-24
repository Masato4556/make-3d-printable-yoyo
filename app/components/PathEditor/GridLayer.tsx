import { Layer, Line } from "react-konva";
import { GRID_COLOR } from "./style";

type Props = {
  width: number;
  height: number;
  zIndex: number;
  scale?: number;
};

const GRID_SIZE = 10;

export function GridLayer({ width, height, zIndex, scale = 1 }: Props) {
  const scaledGridSize = GRID_SIZE * scale;
  const adjustedWidth = Math.ceil(width / scaledGridSize) * scaledGridSize;
  const adjustedHeight = Math.ceil(height / scaledGridSize) * scaledGridSize;

  const horizontalLines = [];
  const verticalLines = [];

  // Generate horizontal lines
  for (
    let y = -adjustedHeight / 2;
    y <= adjustedHeight / 2;
    y += scaledGridSize
  ) {
    horizontalLines.push(
      <Line
        key={`h-${y}`}
        stroke={GRID_COLOR}
        strokeWidth={0.8}
        lineCap="round"
        points={[-adjustedWidth / 2, y, adjustedWidth / 2, y]}
      />
    );
  }

  // Generate vertical lines
  for (
    let x = -adjustedWidth / 2;
    x <= adjustedWidth / 2;
    x += scaledGridSize
  ) {
    verticalLines.push(
      <Line
        key={`v-${x}`}
        stroke={GRID_COLOR}
        strokeWidth={0.8}
        lineCap="round"
        points={[x, -adjustedHeight / 2, x, adjustedHeight / 2]}
      />
    );
  }

  return (
    <Layer zIndex={zIndex}>
      {horizontalLines}
      {verticalLines}
    </Layer>
  );
}
