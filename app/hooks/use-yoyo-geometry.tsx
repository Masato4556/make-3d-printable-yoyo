import { useMemo } from "react";
import { Vector2, LatheGeometry, CubicBezierCurve } from "three";

type Props = {
  diameter: number;
  width: number;
};

export const useYoyoGeometry = function (props: Props) {
  const { diameter, width } = props;

  const geometry = useMemo(() => {
    const core_height = 3.085;
    const bearing_height = 3.18;
    const wing_height = width / 2 - core_height - bearing_height / 2;

    // coreのパスを作成
    const core: Vector2[] = [new Vector2()].concat(
      new Vector2(0, -1), // 底部の開始点
      new Vector2(2, -1),
      new Vector2(2, -5),
      new CubicBezierCurve(
        new Vector2(2.5, -5), // 開始点
        new Vector2(3.15, -5), // コントロールポイント1
        new Vector2(3.15, -5), // コントロールポイント2
        new Vector2(3.15, -4.5) // 終点
      ).getPoints(8),
      new Vector2(3.15, -3),
      new CubicBezierCurve(
        new Vector2(3.85, -3), // 開始点
        new Vector2(4.15, -3), // コントロールポイント1
        new Vector2(4.15, -3), // コントロールポイント2
        new Vector2(4.15, -2.7) // 終点
      ).getPoints(8),
      new Vector2(4.15, -1.59),
      new Vector2(6.45, -1.59),
      new CubicBezierCurve(
        new Vector2(6.45, -(3.14 - 0.2)), // 開始点
        new Vector2(6.45, -3.14), // コントロールポイント1
        new Vector2(6.45, -3.14), // コントロールポイント2
        new Vector2(6.45 - 0.2, -3.14) // 終点
      ).getPoints(8),
      new CubicBezierCurve(
        new Vector2(7.1 - 0.2, -3.14), // 開始点
        new Vector2(7.1, -3.14), // コントロールポイント1
        new Vector2(7.1, -3.14), // コントロールポイント2
        new Vector2(7.1, -(3.14 - 0.2)) // 終点
      ).getPoints(8),
      new Vector2(7.1, -1.885),
      new Vector2(9.55, -1.885),
      new CubicBezierCurve(
        new Vector2(9.55, -(3.085 - 0.3)), // 開始点
        new Vector2(9.55, -3.085), // コントロールポイント1
        new Vector2(9.55, -3.085), // コントロールポイント2
        new Vector2(9.55 - 0.3, -3.085) // 終点
      ).getPoints(8),
      new Vector2(10.55, -3.085)
    );

    // wingのパスを作成
    const wing: Vector2[] = [new Vector2()].concat(
      new CubicBezierCurve(
        new Vector2(10.55, -core_height), // 開始点
        new Vector2(12, 5), // コントロールポイント1
        new Vector2(diameter / 2, 5), // コントロールポイント2
        new Vector2(diameter / 2, wing_height) // 終点
      ).getPoints(64),
      new Vector2(0, wing_height)
    );

    // パスを回転してヨーヨーの形状を作成
    const geometry = new LatheGeometry(core.concat(wing), 100);
    return geometry;
  }, [diameter, width]);

  return { geometry };
};
