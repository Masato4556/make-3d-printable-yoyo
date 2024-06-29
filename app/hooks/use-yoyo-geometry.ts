import { useMemo } from "react";
import { Vector2, LatheGeometry, CubicBezierCurve } from "three";

type Props = {
  diameter: number;
  width: number;
};

const BEARING_SIZE: Record<BearingType, { width: number }> = {
  sizeC: { width: 3.18 },
} as const;

type BearingType = "sizeC";

const BEARING_TYPES: Record<string, BearingType> = {
  sizeC: "sizeC",
} as const;

const CORE_HEIGHT = 3; // coreの高さ

// coreのパスを作成
const CORE_PATH: Record<BearingType, Vector2[]> = {
  sizeC: [new Vector2()].concat(
    new Vector2(0, 0), // 底部の開始点
    new Vector2(2, 0),
    new Vector2(2, 4),
    new CubicBezierCurve(
      new Vector2(2.5, 4), // 開始点
      new Vector2(3.15, 4), // コントロールポイント1
      new Vector2(3.15, 4), // コントロールポイント2
      new Vector2(3.15, 3.5) // 終点
    ).getPoints(8),
    new Vector2(3.15, 2),
    new CubicBezierCurve(
      new Vector2(3.85, 2), // 開始点
      new Vector2(4.15, 2), // コントロールポイント1
      new Vector2(4.15, 2), // コントロールポイント2
      new Vector2(4.15, 1.7) // 終点
    ).getPoints(8),
    new Vector2(4.15, 0.59),
    new Vector2(6.45, 0.59),
    new CubicBezierCurve(
      new Vector2(6.45, 2.14 - 0.2), // 開始点
      new Vector2(6.45, 2.14), // コントロールポイント1
      new Vector2(6.45, 2.14), // コントロールポイント2
      new Vector2(6.45 - 0.2, 2.14) // 終点
    ).getPoints(8),
    new CubicBezierCurve(
      new Vector2(7.1 - 0.2, 2.14), // 開始点
      new Vector2(7.1, 2.14), // コントロールポイント1
      new Vector2(7.1, 2.14), // コントロールポイント2
      new Vector2(7.1, 2.14 - 0.2) // 終点
    ).getPoints(8),
    new Vector2(7.1, 0.885),
    new Vector2(9.55, 0.885),
    new CubicBezierCurve(
      new Vector2(9.55, 2.085 - 0.3), // 開始点
      new Vector2(9.55, 2.085), // コントロールポイント1
      new Vector2(9.55, 2.085), // コントロールポイント2
      new Vector2(9.55 - 0.3, 2.085) // 終点
    ).getPoints(8),
    new Vector2(10.55, 2.085),
    new Vector2(10.55, -CORE_HEIGHT),
    new Vector2(0, -CORE_HEIGHT)
  ),
} as const;

const useYoyoCore = function (bearingType: BearingType) {
  const corePath: Vector2[] = useMemo(() => {
    // coreのパスを作成
    // 底面のy座標を0とし、ベアリング受けの部位をy軸負方向に伸ばしている
    // FIXME: y軸負方向に伸ばしているのは分かりにくいので、正方向に伸ばすように修正したい
    if (!CORE_PATH[bearingType]) {
      throw new Error(`Invalid bearing type: ${bearingType}`);
    }

    return CORE_PATH[bearingType];
  }, [bearingType]).map((v) => new Vector2(v.x, -v.y));

  const [coreWidth, coreHeight] = corePath.reduce(
    (acc, cur) => {
      return [Math.max(acc[0], cur.x), Math.max(acc[1], -cur.y)];
    },
    [0, 0]
  );

  return {
    coreGeometry: new LatheGeometry(corePath, 100).rotateZ(Math.PI / 2),
    coreWidth,
    coreHeight,
  };
};

export const useYoyoGeometry = function (props: Props) {
  const bearingType = BEARING_TYPES.sizeC; // TODO: ベアリングの種類を選択できるようにする
  const { diameter, width } = props;

  // coreのパスを作成
  const { coreGeometry, coreHeight } = useYoyoCore(bearingType);

  const wingGeometry = useMemo(() => {
    // ヨーヨーのウィングを作成
    // TODO: ウィングの形状を変更できるようにする
    const wing_height =
      width / 2 - coreHeight - BEARING_SIZE[bearingType].width / 2;
    const flat_width = 5;
    const chamfer_dist = 1;
    // wingのパスを作成
    const wingPath: Vector2[] = [new Vector2()].concat(
      new Vector2(0, CORE_HEIGHT),
      new Vector2(10.55, CORE_HEIGHT),
      new Vector2(10.55, -2.085),
      new CubicBezierCurve(
        new Vector2(10.55 + 1, -2.085), // 開始点
        new Vector2(12, -3.085), // コントロールポイント1
        new Vector2(diameter / 2, 0), // コントロールポイント2
        new Vector2(diameter / 2, wing_height - flat_width - chamfer_dist)
      ).getPoints(64),
      new Vector2(diameter / 2, wing_height - chamfer_dist),
      new Vector2(diameter / 2 - chamfer_dist, wing_height),
      new Vector2(0, wing_height)
    );

    return new LatheGeometry(wingPath, 100).rotateZ(Math.PI / 2);
  }, [width, coreHeight, bearingType, diameter]);

  return { coreGeometry, wingGeometry };
};
