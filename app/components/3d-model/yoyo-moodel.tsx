import { Vector2, LatheGeometry, CubicBezierCurve } from "three";

export const YoyoModel = function () {
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
    ).getPoints(20),
    new CubicBezierCurve(
      new Vector2(15, 10), // 開始点
      new Vector2(17, 12), // コントロールポイント1
      new Vector2(30, 15), // コントロールポイント2
      new Vector2(30, 25) // 終点
    ).getPoints(20),
    [new Vector2(30, 25), new Vector2(0, 25)]
  );

  // LatheGeometryを作成します
  const geometry = new LatheGeometry(combinedPoints, 30);
  geometry.computeVertexNormals();

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial attach="material" color={"#6be092"} />
    </mesh>
  );
};
