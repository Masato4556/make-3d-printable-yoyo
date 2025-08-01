# ドキュメント運用方針

本プロジェクトにおけるドキュメントの運用方針は以下の通りです。

## 1. ドキュメントの配置場所

全てのドキュメントは、プロジェクトルートの `docs` ディレクトリ配下に配置します。

## 2. ドキュメントの種類と記述場所

### 2.1. 局所的な説明（JSDoc）

クラス、関数、変数などのコードに密接に関連する仕様や、個別の機能に関する局所的な説明は、JSDoc形式でコード内に直接記述します。これにより、コードとドキュメントの一貫性を保ち、開発者がコードを読みながら直接仕様を確認できるようにします。

**例:**

```javascript
/**
 * 2つの数値を加算します。
 * @param {number} a - 最初の数値。
 * @param {number} b - 2番目の数値。
 * @returns {number} - 2つの数値の合計。
 */
function add(a, b) {
  return a + b;
}
```

### 2.2. 設計方針・意思決定記録（ADR: Architectural Decision Record）

プロジェクトの設計に関する重要な意思決定、その背景、選択肢、決定理由、および結果については、ADR (Architectural Decision Record) として記録します。ADRは `docs/ADR` ディレクトリ配下に配置し、以下の原則に従って記述します。

- **不変性:** 一度決定されたADRは、原則として変更しません。もし決定が覆された場合は、新しいADRを作成してその旨を記録します。
- **一意性:** 各ADRは一意のIDを持ち、ファイル名に含めます。
- **簡潔性:** 意思決定の核心を簡潔に記述し、冗長な説明は避けます。

**ADRのファイル名例:** `0001-use-react-for-frontend.md`

**ADRの推奨テンプレート:**

```markdown
# [ADR ID] - [タイトル]

## 状態
[提案中 / 承認済み / 却下済み / 廃止済み / 代替済み]

## コンテキスト
この決定が必要となった背景や問題点について記述します。

## 決定
どのような決定がなされたかを明確に記述します。

## 理由
なぜその決定がなされたのか、他の選択肢と比較してその決定が優れている点を記述します。

## 結果
この決定によってもたらされる影響（良い点、悪い点、トレードオフなど）について記述します。
```

## 3. ドキュメントの更新と管理

- ドキュメントは、コードの変更や設計の変更に合わせて常に最新の状態に保つように努めます。
- 新しい機能の追加や既存機能の変更を行う際は、関連するドキュメントも同時に更新することを推奨します。
- ADRは、重要な設計上の意思決定が行われた際に必ず作成します。

---