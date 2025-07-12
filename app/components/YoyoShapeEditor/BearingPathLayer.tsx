import { Layer, Line } from "react-konva";
import { BEARING_COLOR } from "./style";
import { Bearing } from "../../models/yoyo/bearing";

type Props = {
  bearing: Bearing;
  zIndex: number;
  scale?: number;
};

export function BearingPathLayer({ bearing, zIndex, scale = 1 }: Props) {
  return (
    <Layer zIndex={zIndex}>
      <Line
        points={[
          bearing.width / 2,
          bearing.outerDiameter / 2,
          -bearing.width / 2,
          bearing.outerDiameter / 2,
          -bearing.width / 2,
          bearing.innerDiameter / 2,
          bearing.width / 2,
          bearing.innerDiameter / 2,
        ].map((v) => v * scale)}
        strokeEnabled={false}
        fill={BEARING_COLOR}
        closed={true}
      />
      <Line
        points={[
          bearing.width / 2,
          -bearing.outerDiameter / 2,
          -bearing.width / 2,
          -bearing.outerDiameter / 2,
          -bearing.width / 2,
          -bearing.innerDiameter / 2,
          bearing.width / 2,
          -bearing.innerDiameter / 2,
          bearing.width / 2,
          -bearing.outerDiameter / 2,
        ].map((v) => v * scale)}
        strokeEnabled={false}
        fill={BEARING_COLOR}
        closed={true}
      />
    </Layer>
  );
}
