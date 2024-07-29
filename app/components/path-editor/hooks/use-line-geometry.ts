import { useMemo } from "react";
import { CubicBezierCurve3, Vector3, TubeGeometry, LineCurve3 } from "three";

export function useLineGeometry(
  yoyoCurve: CubicBezierCurve3,
  rimOutsidePosition: Vector3
) {
  const mirrerdYoyoCurveGeometry = useMemo(() => {
    const geometry = new TubeGeometry(yoyoCurve, 64, 0.2);
    geometry.scale(1, -1, -1);
    return geometry;
  }, [yoyoCurve]);

  const flatLineGeometry = useMemo(() => {
    const geometry = new TubeGeometry(
      new LineCurve3(yoyoCurve.v3, rimOutsidePosition),
      64,
      0.2
    );
    return geometry;
  }, [rimOutsidePosition, yoyoCurve.v3]);

  const mirreredFlatLineGeometry = useMemo(() => {
    const geometry = new TubeGeometry(
      new LineCurve3(
        new Vector3(yoyoCurve.v3.x, -yoyoCurve.v3.y, 0),
        new Vector3(rimOutsidePosition.x, -rimOutsidePosition.y, 0)
      ),
      64,
      0.2
    );
    return geometry;
  }, [rimOutsidePosition, yoyoCurve.v3]);

  // TODO: パスに含まれていない最後の直線をつい
  const lastLineGeometry = useMemo(() => {
    const geometry = new TubeGeometry(
      new LineCurve3(
        rimOutsidePosition,
        new Vector3(rimOutsidePosition.x, -rimOutsidePosition.y, 0)
      ),
      64,
      0.2
    );
    return geometry;
  }, [rimOutsidePosition]);

  return {
    mirrerdYoyoCurveGeometry,
    flatLineGeometry,
    mirreredFlatLineGeometry,
    lastLineGeometry,
  };
}
