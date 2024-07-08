import { useMemo } from "react";
import {
  Vector2,
  LatheGeometry,
  CubicBezierCurve,
  Mesh,
  BufferGeometry,
} from "three";
import { CSG } from "three-csg-ts";
import { BEARING_TYPES, BearingType } from "~/const/bearing";

type Props = {
  diameter: number;
  width: number;
};

const CORE_HEIGHT = 4; // coreの側面の高さ
const GAP = 0.2; // coreとウィングの間の隙間

// coreのパスを作成
const CORE_PATH: Record<BearingType, Vector2[]> = {
  sizeC: [new Vector2()].concat(
    new Vector2(2, 0),
    new Vector2(2, 4),
    new CubicBezierCurve(
      new Vector2(2.5, 4),
      new Vector2(3.15, 4),
      new Vector2(3.15, 4),
      new Vector2(3.15, 3.5)
    ).getPoints(8),
    new Vector2(3.15, 2),
    new CubicBezierCurve(
      new Vector2(3.85, 2),
      new Vector2(4.15, 2),
      new Vector2(4.15, 2),
      new Vector2(4.15, 1.7)
    ).getPoints(8),
    new Vector2(4.15, 0.59),
    new Vector2(6.45, 0.59),
    new CubicBezierCurve(
      new Vector2(6.45, 2.14 - 0.2),
      new Vector2(6.45, 2.14),
      new Vector2(6.45, 2.14),
      new Vector2(6.45 - 0.2, 2.14)
    ).getPoints(8),
    new CubicBezierCurve(
      new Vector2(7.1 - 0.2, 2.14),
      new Vector2(7.1, 2.14),
      new Vector2(7.1, 2.14),
      new Vector2(7.1, 2.14 - 0.2)
    ).getPoints(8),
    new Vector2(7.1, 0.885),
    new Vector2(9.55, 0.885),
    new CubicBezierCurve(
      new Vector2(9.55, 2.085 - 0.3),
      new Vector2(9.55, 2.085),
      new Vector2(9.55, 2.085),
      new Vector2(9.55 - 0.3, 2.085)
    ).getPoints(8),
    new Vector2(10.55, 2.085),
    new Vector2(10.55, 0),
    new Vector2(10.55, -CORE_HEIGHT),
    new Vector2(2, -CORE_HEIGHT)
  ),
} as const;

const unionGeometry = function (
  geometry1: BufferGeometry,
  geometry2: BufferGeometry
) {
  const mesh1 = new Mesh(geometry1);
  const mesh2 = new Mesh(geometry2);

  // CSG操作
  const csg1 = CSG.fromMesh(mesh1);
  const csg2 = CSG.fromMesh(mesh2);
  const resultCSG = csg2.union(csg1);
  const resultMesh = CSG.toMesh(resultCSG, mesh2.matrix);
  resultMesh.updateMatrix();
  const unionedGeometry = resultMesh.geometry;
  unionedGeometry.computeVertexNormals();
  return unionedGeometry;
};

const useYoyoCore = function (bearingType: BearingType) {
  const { coreGeometry } = useMemo(() => {
    if (!CORE_PATH[bearingType]) {
      throw new Error(`Invalid bearing type: ${bearingType}`);
    }

    const corePath = CORE_PATH[bearingType];
    const core = new LatheGeometry(corePath, 100);
    const napGap = new LatheGeometry(
      [new Vector2()].concat(
        new Vector2(0, 0),
        new Vector2(4.5, 0),
        new Vector2(4.5, -CORE_HEIGHT),
        new Vector2(0, -CORE_HEIGHT)
      ),
      6
    ).scale(-1, 1, 1);

    return { coreGeometry: unionGeometry(core, napGap) };
  }, [bearingType]);

  // 法線の反転
  coreGeometry.scale(1, -1, 1);

  return {
    coreGeometry: coreGeometry.rotateZ(Math.PI / 2),
  };
};

export const useYoyoGeometry = function (props: Props) {
  const bearingType = BEARING_TYPES.sizeC; // TODO: ベアリングの種類を選択できるようにする
  const { diameter, width } = props;

  // coreのパスを作成
  const { coreGeometry } = useYoyoCore(bearingType);

  const wingGeometry = useMemo(() => {
    // ヨーヨーのウィングを作成
    // TODO: ウィングの形状を変更できるようにする
    const wing_width = width;
    const flat_width = 5;
    const chamfer_dist = 1;

    // wingのパスを作成
    const wingPath: Vector2[] = [new Vector2()].concat(
      new Vector2(0, CORE_HEIGHT),
      new Vector2(10.55 + GAP, CORE_HEIGHT),
      new Vector2(10.55 + GAP, -2.085),
      new CubicBezierCurve(
        new Vector2(10.55 + GAP + 1, -2.085),
        new Vector2(25, 10.085),
        new Vector2(25, 10.085),
        new Vector2(diameter / 2, wing_width - flat_width - chamfer_dist)
      ).getPoints(64),
      new Vector2(diameter / 2, wing_width - chamfer_dist),
      new Vector2(diameter / 2 - chamfer_dist, wing_width),
      new Vector2(0, wing_width)
    );

    const geometry = new LatheGeometry(wingPath, 100).rotateZ(Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }, [width, diameter]);

  return { coreGeometry, wingGeometry };
};
