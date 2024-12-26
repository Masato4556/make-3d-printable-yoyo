import { Line } from "@react-three/drei";
import { YoyoVerticalLine } from "~/contexts/curves/Curve/YoyoVerticalLine";
import { PATH_COLOR } from "~/styles/const";
import { DraggablePoint } from "./draggable-point";

type Props = {
  curve: YoyoVerticalLine;
};

export function VerticalLine(props: Props) {
  const { curve } = props;
  console.log("aaaaa");

  return (
    <>
      <Line points={[curve.v0, curve.v1]} color={PATH_COLOR} lineWidth={3} />
      {curve.option?.editablePoint == "start" && (
        <DraggablePoint
          position={curve.v0}
          onDrag={(v) => {
            curve.v0.x = v.x;
            curve.v1.x = v.x;
            curve.updateDispath(curve, curve.index);
          }}
        />
      )}
      {curve.option?.editablePoint == "end" && (
        <DraggablePoint
          position={curve.v1}
          onDrag={(v) => {
            curve.v0.x = v.x;
            curve.v1.x = v.x;
            console.log(v);
            curve.updateDispath(curve, curve.index);
          }}
          dragLimits={[undefined, [0, 0], [0, 0]]}
        />
      )}
    </>
  );
}
