# Product Portfolio

個人開発によるソフトウェアプロダクトのポートフォリオです。
このドキュメントは AI アシスタントに文脈をまとめて渡すことを想定して構成されています。

最終更新: 2026-08-29

---

## リリース済みプロダクト

| プロダクト | ブランド | プラットフォーム | 配信 | 状況 |
|---|---|---|---|---|
| yamago（山と歩く） | HAPIVERI | iOS + Apple Watch | App Store | v1.6 審査提出中 |
| ここね（Kokone） | HAPIVERI | iOS | App Store | 公開中・改善継続 |
| Sweepline for Mac | STROBOFACTORY | macOS | 直販（Shopify） | v1.1 公開中 |
| PKPassport for Mac | STROBOFACTORY | macOS | 直販（Shopify） | v1.2 公開中 |
| 江戸の刻 | STROBOFACTORY | iOS | App Store（¥300） | v1.2 公開中 |
| おてつだいスター！ | STROBOFACTORY | iOS | App Store | 公開中 |
| シンプル ナンプレ | STROBOFACTORY | iOS / Chrome拡張 | App Store / Chrome Web Store | 公開中 |
| PDF Markly | STROBOFACTORY | Chrome拡張 | Chrome Web Store | v1.4.3 公開中 |

---

## プロダクト詳細

### yamago（山と歩く）— HAPIVERI Healthcare.ai

登山中の生体データと位置情報を記録し、危険の予兆を検知する iOS + Apple Watch アプリ。

- **プラットフォーム**: iOS / watchOS
- **バージョン**: v1.6（App Store 審査提出中）
- **主要機能**
  - 心拍・血中酸素（SpO2）の連続計測と、GPX / CSV への記録埋め込み
  - 心拍スパイク・低SpO2の検知アラート（誤検知を抑えるゲーティング処理を実装）
  - 地理院地形図のオフライン利用
  - WeatherKit による気象情報表示
  - Apple Watch 単体で完結する6ページ構成の表示
  - 山ごとの目標設定機能
  - 音声読み上げによるハンズフリー通知
- **技術スタック**: SwiftUI / HealthKit / CloudKit / WeatherKit / MapKit / StoreKit 2 / WatchConnectivity / AVSpeechSynthesizer / Sign in with Apple
- **アーキテクチャ上の特徴**: 自前サーバーを一切持たず、Apple のマネージドサービスのみで構成
- **実地検証**: 2026-08-22 高尾山にて全機能を実機検証済み

---

### ここね（Kokone）— HAPIVERI Healthcare.ai

日々の感情を記録し、AI が分析して可視化するジャーナリングアプリ。

- **プラットフォーム**: iOS
- **状況**: 公開中（リリース後13回の改善リリースを実施）
- **主要機能**
  - 手書き文字の OCR 読み取りによる記録
  - Claude API による感情分析
  - 期間セレクタ付きの推移グラフ
  - 複数の記録モードの継続利用
- **技術スタック**: SwiftUI / Claude API (Anthropic) / Vercel / Upstash KV
- **運用**: Slack Webhook による通知、Upstash KV によるレート制限
- **今後**: CloudKit 移行（v1.1）、過去エントリの詳細ナビゲーション

---

### Sweepline for Mac — STROBOFACTORY

macOS 向けユーティリティ。自社サイトからの直接販売。

- **バージョン**: v1.1
- **配信**: Shopify による直販（App Store 非経由）
- **技術スタック**: Swift / Sparkle 2.6+（EdDSA 署名による自動アップデート）

---

### PKPassport for Mac — STROBOFACTORY

macOS 向けユーティリティ。自社サイトからの直接販売。

- **バージョン**: v1.2
- **配信**: Shopify による直販
- **技術スタック**: Swift / Sparkle 2.6+

---

### 江戸の刻 — STROBOFACTORY

江戸時代の不定時法（季節によって一刻の長さが変わる時刻制度）を現代に再現する iOS アプリ。

- **バージョン**: v1.2（有料 ¥300）
- **今後の展開**
  - v1.3: 季節ごとの背景カラーパレット、環境音、江戸期の情景テキスト
  - v1.4: Apple TV（tvOS）対応
  - v1.5: Mac Catalyst 対応

---

### おてつだいスター！ — STROBOFACTORY

子ども向けのお手伝い記録アプリ。

- **プラットフォーム**: iOS
- **状況**: App Store 公開中

---

### シンプル ナンプレ — STROBOFACTORY

数独パズルアプリ。iOS と Chrome 拡張の両方で展開。

- **プラットフォーム**: iOS / Chrome拡張
- **状況**: 両プラットフォームで公開中

---

### PDF Markly — STROBOFACTORY

ブラウザ上で PDF に注釈・マークアップを行う Chrome 拡張。

- **バージョン**: v1.4.3
- **技術スタック**: Manifest V3 準拠の Vanilla JavaScript
- **設計方針**: 単一の canonical HTML ソースから Python の変換スクリプトで拡張機能ビルドを生成する構成

---

## 開発中・計画中

| プロダクト | 種別 | 状況 |
|---|---|---|
| STROBO SELECT | macOS 写真セレクトアプリ | Swift スケルトン構築済み・プロトタイプ検証完了 |
| StroboShot | macOS 画面キャプチャ | 仕様策定完了・リリースパイプライン統合待ち |
| 道先（Michisaki） | 交通情報アプリ | 構想段階 |
| HAPIVERI Food Log | 食事記録 | 構想段階 |
| メノハピ | ヘルスケア | 構想段階 |
| NEXT ACADEMY AI サポート層 | 教育向け AI エージェント | アーキテクチャ設計完了 |
| 喫茶店エディトリアル企画 | 英語圏向けメディア | 戦略評価中 |

---

## 共通アーキテクチャ

### iOS / macOS（App Store 配信）
自前サーバーを持たず、Apple のマネージドサービスで完結させる方針。

```
SwiftUI + CloudKit + StoreKit 2 + HealthKit / WeatherKit / MapKit
```

### macOS 直販（App Store 非経由）
ライセンス管理とアップデート配信を自前スタックで構築。

```
Shopify（決済）
  └─ Webhook（HMAC-SHA256 タイミングセーフ比較）
       └─ Vercel（ライセンス発行 API）
            ├─ Upstash KV（ライセンス台帳）
            ├─ Resend（ライセンスキー送付）
            └─ Ed25519 署名（CryptoKit Curve25519）
                 └─ アプリ側でオフライン検証
```

- ライセンスキー形式: `[PREFIX]-XXXXX-XXXXX-XXXXX`（誤読を避けるため 0 / O / 1 / I を除外）
- 自動アップデート: Sparkle 2.6+（EdDSA 署名）

### Chrome 拡張
Manifest V3 準拠。インラインスクリプト不可、`innerHTML` 不使用（`createElement` / `textContent` で CSP 準拠）。

---

## 開発の進め方

- **プロトタイプ先行** — Swift を書く前に HTML プロトタイプで UI/UX を検証する。ネイティブ固有領域（画面キャプチャ、写真処理）は例外。
- **コード生成による構成管理** — Xcode プロジェクトは `gen_xcodeproj.py` を正とし、`.pbxproj` を手編集しない。静的検証スクリプトでビルド前の構成崩れを検出する。
- **canonical source の単一化** — 正となるソースを編集し、派生物は生成する。生成物を直接編集しない。
- **外部レビューの統合** — 重要な意思決定の前に複数の外部レビューを収集し、合意点と相違点を整理して判断する。

---

## 更新について

このドキュメントはリリースのたびに更新されます。変更履歴はこのリポジトリのコミット履歴を参照してください。
