# STLダウンロード機能のパス編集画面対応

## 概要

STLファイルのダウンロード機能をパス編集画面でも利用できるように改善しました。

## 変更点

### 1. `useModelStore`の拡張
- `wingGeometry`プロパティを追加し、BufferGeometryを保持するように拡張
- `setWingGeometry`アクションを追加

### 2. 新しいフック`useStlExport`の作成
- sceneに依存せず、geometryから直接STLファイルを生成
- geometryが利用可能かどうかを判定する`canExport`プロパティを提供

### 3. `useStlManager`フックの作成
- 手動でのSTL出力機能を提供
- ボタンクリックなどでの明示的な出力に対応

### 4. `useYoyoGeometry`フックの改善
- geometryが更新された時に自動的に`useModelStore`を更新

### 5. `ExportStl`コンポーネントのリファクタリング
- モード依存を削除し、geometryの更新を監視してSTLファイルを自動生成
- `useThree`からの`scene`依存を削除

### 6. コンポーネント配置の変更
- `ExportStl`と`DownoadButton`を`Index.tsx`に移動
- モードに関係なく常に利用可能に

## 利点

1. **モード独立**: パス編集モードでもモデル表示モードでもSTLダウンロードが可能
2. **パフォーマンス向上**: sceneのレンダリング状態に依存しないため、より高速
3. **保守性向上**: 関心の分離により、コードの理解とメンテナンスが容易
4. **テスタビリティ**: scene依存がなくなり、単体テストが書きやすい

## 技術的詳細

- Three.jsの`BufferGeometry`から直接`Mesh`を作成してSTL出力
- zustandストアを活用したgeometry状態管理
- useEffectを使用したgeometry更新の監視

## 後方互換性

既存の機能はすべて維持されており、UIの動作に変更はありません。
