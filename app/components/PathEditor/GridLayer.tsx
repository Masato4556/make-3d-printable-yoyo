import { Layer, Line } from "react-konva";
import { GRID_COLOR } from "./style";
import { ComponentProps, useEffect, useMemo } from "react";

type Props = {
  width: number;
  height: number;
  zIndex: number;
  scale?: number;
};

const GRID_SIZE = 10;

export function GridLayer({ width, height, zIndex, scale = 1 }: Props) {
  const { horizontalLines, verticalLines } = useMemo(() => {
    const scaledGridSize = GRID_SIZE * scale;
    const adjustedWidth = Math.ceil(width / scaledGridSize) * scaledGridSize;
    const adjustedHeight = Math.ceil(height / scaledGridSize) * scaledGridSize;

    const horizontalLines = [];
    for (let y = 0; y <= adjustedHeight / 2; y += scaledGridSize) {
      horizontalLines.push(
        createGridLine({
          key: `h-${y}`,
          points: [-adjustedWidth / 2, y, adjustedWidth / 2, y],
        }),
        createGridLine({
          key: `h-${y}`,
          points: [-adjustedWidth / 2, -y, adjustedWidth / 2, -y],
        })
      );
    }

    const verticalLines = [];
    for (let x = 0; x <= adjustedWidth / 2; x += scaledGridSize) {
      verticalLines.push(
        createGridLine({
          key: `v-${x}`,
          points: [x, -adjustedHeight / 2, x, adjustedHeight / 2],
        }),
        createGridLine({
          key: `v-${x}`,
          points: [-x, -adjustedHeight / 2, -x, adjustedHeight / 2],
        })
      );
    }

    return { horizontalLines, verticalLines };
  }, [height, scale, width]);

  return (
    <Layer zIndex={zIndex}>
      {horizontalLines}
      {verticalLines}
    </Layer>
  );
}

const createGridLine = ({
  key,
  points,
}: {
  key: string;
  points: ComponentProps<typeof Line>["points"];
}) => (
  <Line
    key={key}
    stroke={GRID_COLOR}
    strokeWidth={0.8}
    lineCap="round"
    points={points}
  />
);
