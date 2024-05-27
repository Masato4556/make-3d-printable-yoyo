import { useMemo } from "react";
import { Vector2, LatheGeometry, CubicBezierCurve } from "three";

type Props = {
  diameter: number;
  width: number;
};

export const useYoyoGeometry = function (props: Props) {
  const { diameter, width } = props;

  const geometry = useMemo(() => {
    // 直線部分のポイント
    const points = [
      new Vector2(0, 0), // 底部の開始点
      new Vector2(7, 0), // 底部の直線部分の終点
      new Vector2(7, 2), // 上部へ続く直線
    ];

    // 直線部分と曲線部分のポイントを結合
    const combinedPoints = points.concat(
      new CubicBezierCurve(
        new Vector2(7, 2), // 開始点
        new Vector2(8, 8), // コントロールポイント1
        new Vector2(13, 8), // コントロールポイント2
        new Vector2(15, 10) // 終点
      ).getPoints(30),
      new CubicBezierCurve(
        new Vector2(15, 10), // 開始点
        new Vector2(17, 12), // コントロールポイント1
        new Vector2(diameter, width / 2), // コントロールポイント2
        new Vector2(diameter, width) // 終点
      ).getPoints(30),
      [new Vector2(diameter, width), new Vector2(0, width)]
    );

    // LatheGeometryを作成します
    const geometry = new LatheGeometry(combinedPoints, 100);
    geometry.computeVertexNormals();
    return geometry;
  }, [diameter, width]);

  return { geometry };
};
