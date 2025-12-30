# Modules Directory Design Guide

このプロジェクトでは、ロジックの凝集度を高め、依存関係を整理するために `src/modules` ディレクトリにおいて以下の設計ルールを適用します。

## 1. コンセプト
`modules` ディレクトリ配下は、**UI（React）に依存しない純粋なロジック**を格納する場所です。
各ディレクトリを一つの独立した「モジュール」として扱い、内部実装をカプセル化（隠蔽）することで、変更に強い疎結合な構造を維持します。

## 2. ディレクトリ構成
各モジュールは、必ず `index.ts` をエントリーポイントとして持ちます。

```text
src/
  └── modules/
      └── [module-name]/       # 各モジュールのトップディレクトリ
          └── index.ts         # 外部公開用ゲートウェイ（インターフェース）
```


## 3. 運用ルール

### ① index.ts を「インターフェース」として扱う
`index.ts` は、そのモジュールの「顔」となるファイルです。モジュール外部で利用することを許可する機能（関数・型・定数）のみを `export` してください。


✅ 正しい例: 
必要なものだけを再エクスポートする
```typescript
export { targetFunction } from './services';
export type { ModuleData } from './types';
```

❌ 避けるべき例: 
- index.ts 内に直接ロジックを長々と記述する
- モジュール内でしか使わないものを export する

### ② 内部実装の隠蔽 (Encapsulation)
index.ts にエクスポートされていないファイルや関数を、モジュール外から直接参照することを禁止します。外部からは常にディレクトリトップ（index.ts）を経由してアクセスしてください。

- OK: import { someFunction } from '@/modules/my-module';
- NG: import { someFunction } from '@/modules/my-module/services';

### ③ UI（React）との分離
modules 配下のコードは、原則として以下の要素に依存しないようにしてください。

- React Component / JSX
- React Hooks (useState, useEffect 等)
- DOM API (document, window 等) ※必要な場合は引数で注入するか、抽象化を検討してください

## 4. 導入のメリット
* **リファクタリングの容易性:** `index.ts` の定義さえ変えなければ、モジュール内部のファイル分割や関数名の変更を自由に行えます。
* **テストのしやすさ:** 純粋なロジックとして切り出されるため、Unit Test が書きやすくなります。
* **認知負荷の低減:** 他のディレクトリ（Componentsなど）を触る開発者は、`index.ts` だけを見れば、そのモジュールが何を提供しているかを一目で理解できます。