import { Point } from "../../Point";
import { Connection } from "../Connection";
import { LineConnection } from "../LineConnection";
import { applyChamfer } from "../../CornerEffect/functions/applyChamfer";

/**
 * 面取りセグメントの開始点と終了点を保持する型
 */
type ChamferSegment = {
  start: Point; // 面取りの開始点
  end: Point; // 面取りの終了点
};

/**
 * コーナーに面取りを適用すべきかどうかを判定します
 */
function shouldApplyChamfer(
  cornerPoint: Point,
  chamferRegistry: Map<string, ChamferSegment>
): boolean {
  return (
    cornerPoint.cornerEffect?.type === "chamfer" &&
    !chamferRegistry.has(cornerPoint.id)
  );
}

/**
 * 指定されたコーナーに対して面取りを作成します
 */
function createChamferForCorner({
  connection,
  nextConnection,
  getPoint,
  cornerPoint,
}: {
  connection: Connection;
  nextConnection: Connection;
  getPoint: (id: string) => Point;
  cornerPoint: Point;
}): {
  chamferSegment: ChamferSegment;
  generatedChamferPoints: Point[];
} {
  const prevPoint = getPoint(connection.startPointId);
  const pointAfterCorner = getPoint(nextConnection.endPointId);

  const { chamferStartPoint, chamferEndPoint } = applyChamfer(
    cornerPoint,
    prevPoint,
    pointAfterCorner,
    cornerPoint.cornerEffect!.size
  );

  return {
    chamferSegment: {
      start: chamferStartPoint,
      end: chamferEndPoint,
    },
    generatedChamferPoints: [chamferStartPoint, chamferEndPoint],
  };
}

/**
 * 面取り効果を処理し、面取りレジストリを構築します
 */
function buildChamferRegistry(
  connections: Connection[],
  getPoint: (id: string) => Point
): {
  chamferRegistry: Map<string, ChamferSegment>;
  generatedPoints: Map<string, Point>;
} {
  const chamferRegistry = new Map<string, ChamferSegment>();
  const generatedPoints = new Map<string, Point>();

  connections.forEach((connection, index, allConnections) => {
    const cornerPoint = getPoint(connection.endPointId);

    if (shouldApplyChamfer(cornerPoint, chamferRegistry)) {
      const nextConnection =
        allConnections[(index + 1) % allConnections.length];

      if (!nextConnection) {
        throw new Error("次の接続が見つかりません");
      }

      const { chamferSegment, generatedChamferPoints } = createChamferForCorner(
        {
          connection,
          nextConnection,
          getPoint,
          cornerPoint,
        }
      );

      // 生成されたポイントをマップに追加
      generatedChamferPoints.forEach((point: Point) => {
        generatedPoints.set(point.id, point);
      });

      // レジストリに保存
      chamferRegistry.set(cornerPoint.id, chamferSegment);
    }
  });

  return { chamferRegistry, generatedPoints };
}

/**
 * 接続リストにコーナー効果（現在は面取りのみ）を適用し、
 * 新しい接続リストと生成されたポイントを返します
 */
export const generateConnectionsWithEffects = (
  connections: Connection[],
  getPoint: (id: string) => Point
): {
  processedConnections: Connection[];
  generatedPoints: Map<string, Point>;
} => {
  const processedConnections: Connection[] = [];

  // 第1パス: 面取り効果があるコーナーポイントを特定し、面取りセグメントを計算
  const { chamferRegistry, generatedPoints } = buildChamferRegistry(
    connections,
    getPoint
  );

  // 第2パス: 新しい接続リストを構築
  for (let i = 0; i < connections.length; i++) {
    const connection = connections[i];
    if (!connection) continue; // 安全性チェック

    // CubicBezier接続は面取り効果の影響を受けないため、そのまま追加
    if (connection.__brand === "CubicBezierConnection") {
      processedConnections.push(connection);
      continue;
    }

    const startPoint = getPoint(connection.startPointId);
    const endPoint = getPoint(connection.endPointId);

    // 開始点と終了点に対応する面取り情報を取得
    const startPointChamferInfo = chamferRegistry.get(startPoint.id);
    const endPointChamferInfo = chamferRegistry.get(endPoint.id);

    // 面取り効果を考慮して実際の接続ポイントを決定
    const actualStartPoint = startPointChamferInfo?.end ?? startPoint;
    const actualEndPoint = endPointChamferInfo?.start ?? endPoint;

    // メイン接続を追加
    processedConnections.push(
      new LineConnection(actualStartPoint.id, actualEndPoint.id)
    );

    // 終了点に面取りがある場合、面取りセグメント自体も追加
    if (endPointChamferInfo) {
      processedConnections.push(
        new LineConnection(
          endPointChamferInfo.start.id,
          endPointChamferInfo.end.id
        )
      );
    }
  }

  return { processedConnections, generatedPoints };
};
