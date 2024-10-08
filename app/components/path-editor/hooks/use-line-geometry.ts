import { useMemo } from "react";
import { Vector3 } from "three";

export function useLineGeometry(
  yoyoCurve: Vector3[],
  rimOutsidePosition: Vector3
) {
  return useMemo(() => {
    const yoyoCurveLastPoint = yoyoCurve[yoyoCurve.length - 1];

    const mirrerdYoyoCurvePoints = yoyoCurve.map(
      (v) => new Vector3(v.x, -v.y, 0)
    );

    const flatLinePoints = [yoyoCurveLastPoint, rimOutsidePosition];

    const mirreredFlatLinePoints = [
      new Vector3(yoyoCurveLastPoint.x, -yoyoCurveLastPoint.y, 0),
      new Vector3(rimOutsidePosition.x, -rimOutsidePosition.y, 0),
    ];

    // TODO: パスに含まれていない最後の直線をつい
    const rimLinePoints = [
      rimOutsidePosition,
      new Vector3(rimOutsidePosition.x, -rimOutsidePosition.y, 0),
    ];

    return {
      flatLinePoints,
      rimLinePoints,
      mirrerdPoints: [...mirrerdYoyoCurvePoints, ...mirreredFlatLinePoints],
    };
  }, [rimOutsidePosition, yoyoCurve]);
}
