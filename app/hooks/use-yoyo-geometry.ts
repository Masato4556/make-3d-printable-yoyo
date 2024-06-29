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

// coreのパスを作成
const CORE_PATH: Record<BearingType, Vector2[]> = {
  sizeC: [new Vector2()].concat(
    new Vector2(0, 1), // 底部の開始点
    new Vector2(2, 1),
    new Vector2(2, 5),
    new CubicBezierCurve(
      new Vector2(2.5, 5), // 開始点
      new Vector2(3.15, 5), // コントロールポイント1
      new Vector2(3.15, 5), // コントロールポイント2
      new Vector2(3.15, 4.5) // 終点
    ).getPoints(8),
    new Vector2(3.15, 3),
    new CubicBezierCurve(
      new Vector2(3.85, 3), // 開始点
      new Vector2(4.15, 3), // コントロールポイント1
      new Vector2(4.15, 3), // コントロールポイント2
      new Vector2(4.15, 2.7) // 終点
    ).getPoints(8),
    new Vector2(4.15, 1.59),
    new Vector2(6.45, 1.59),
    new CubicBezierCurve(
      new Vector2(6.45, 3.14 - 0.2), // 開始点
      new Vector2(6.45, 3.14), // コントロールポイント1
      new Vector2(6.45, 3.14), // コントロールポイント2
      new Vector2(6.45 - 0.2, 3.14) // 終点
    ).getPoints(8),
    new CubicBezierCurve(
      new Vector2(7.1 - 0.2, 3.14), // 開始点
      new Vector2(7.1, 3.14), // コントロールポイント1
      new Vector2(7.1, 3.14), // コントロールポイント2
      new Vector2(7.1, 3.14 - 0.2) // 終点
    ).getPoints(8),
    new Vector2(7.1, 1.885),
    new Vector2(9.55, 1.885),
    new CubicBezierCurve(
      new Vector2(9.55, 3.085 - 0.3), // 開始点
      new Vector2(9.55, 3.085), // コントロールポイント1
      new Vector2(9.55, 3.085), // コントロールポイント2
      new Vector2(9.55 - 0.3, 3.085) // 終点
    ).getPoints(8),
    new Vector2(10.55, 3.085),
    new Vector2(10.55, 0),
    new Vector2(0, 0)
  ),
} as const;

const useYoyoCorePath = function (bearingType: BearingType) {
  const corePath: Vector2[] = useMemo(() => {
    // coreのパスを作成
    // 底面のy座標を0とし、ベアリング受けの部位をy軸負方向に伸ばしている
    // FIXME: y軸負方向に伸ばしているのは分かりにくいので、正方向に伸ばすように修正したい
    if (!CORE_PATH[bearingType]) {
      throw new Error(`Invalid bearing type: ${bearingType}`);
    }

    return CORE_PATH[bearingType];
  }, [bearingType]);
  const [coreWidth, coreHeight] = corePath.reduce(
    (acc, cur) => {
      return [Math.max(acc[0], cur.x), Math.max(acc[1], -cur.y)];
    },
    [0, 0]
  );

  return {
    corePath: corePath.map((v) => new Vector2(v.x, -v.y)), // y座標0をcoreとwingの接合部にするため、coreをy座標負の方向に伸ばす
    coreWidth,
    coreHeight,
  };
};

export const useYoyoGeometry = function (props: Props) {
  const bearingType = BEARING_TYPES.sizeC; // TODO: ベアリングの種類を選択できるようにする
  const { diameter, width } = props;

  // coreのパスを作成
  const { corePath, coreHeight } = useYoyoCorePath(bearingType);

  return useMemo(() => {
    // ヨーヨーのウィングを作成
    // TODO: ウィングの形状を変更できるようにする
    const wing_height =
      width / 2 - coreHeight - BEARING_SIZE[bearingType].width / 2;

    // wingのパスを作成
    const wingPath: Vector2[] = [new Vector2()].concat(
      new Vector2(0, -0.5),
      new Vector2(10.55, -0.5),
      new Vector2(10.55, -3.085),
      new CubicBezierCurve(
        new Vector2(10.55 + 1, -3.085), // 開始点
        new Vector2(12, 5), // コントロールポイント1
        new Vector2(diameter / 2, 5), // コントロールポイント2
        new Vector2(diameter / 2, wing_height) // 終点
      ).getPoints(64),
      new Vector2(0, wing_height)
    );

    // パスを回転してヨーヨーの形状を作成
    const coreGeometry = new LatheGeometry(corePath, 100).rotateZ(Math.PI / 2);
    const wingGeometry = new LatheGeometry(wingPath, 100).rotateZ(Math.PI / 2);
    return { coreGeometry, wingGeometry };
  }, [width, coreHeight, bearingType, corePath, diameter]);
};
