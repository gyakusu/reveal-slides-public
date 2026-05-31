# Claude Code スタートダッシュガイド — reveal.js スライド作成プラン

## Context
`presentations/260327/references.md` の内容（Claude Code スタートダッシュガイド）を、reveal.jsスライドとして `presentations/260327/slides.html` に作成する。既存の `presentations/260312/slides.html` のHTML構造・スタイルパターンを参考にする。

## 方針
- **index.html**: すでにテンプレートが存在。`<title>` タグのみ更新 ✅ 完了（PR #12）
- **slides.html**: 新規作成（メインの作業） ⬜ 未着手
- **NSKテーマ**: `common/css/presentation-theme.css` をそのまま使用
- **NSK.png**: 260312からコピー済み ✅ 完了（PR #12）

## スライド構成（全18〜21枚程度）

| # | スライド | 内容 |
|---|---------|------|
| 1 | タイトル | 「Claude Code スタートダッシュガイド」+ 対象・前提 |
| 2 | このガイドの思想（§0） | 3つの核心（①セッションを使い捨てろ ②ツールに任せろ ③コンテキストを守れ）+ 段階的開示の定義（動的コンテキスト読み込み）+ Skillsが段階的開示の中核である旨（PR #10） |
| 3 | インストールと最初の起動（§1） | npm installコマンド、確認コマンド |
| 4 | CLAUDE.md 概要（§2前半） | 書くべきこと / 書いてはいけないこと |
| 5 | CLAUDE.md 良い例（§2中盤） | コードブロック全文 |
| 6 | CLAUDE.md 原則と配置（§2後半） | 重要な原則 + 配置場所テーブル |
| 7 | セッションの使い捨て（§3前半） | 推奨フロー図 |
| 8 | コンテキスト管理（§3後半） | /compact, /clear, /model, /effort |
| 9 | スクリプト化と冪等性（§4前半） | 良い例・悪い例 |
| 10 | 品質管理のツール化（§4後半） | CLAUDE.md記載例 + hooks設定JSON |
| 10b | mypyのもう一つの価値（§4追加） | 型はLLMにとってのドキュメント。NG例（型なし）vs OK例（型あり）の比較（PR #11） |
| 11 | サブエージェント概要（§5前半） | 組み込みサブエージェント |
| 12 | カスタムサブエージェント（§5中盤） | .claude/agents/ のMarkdown例 |
| 13 | 委譲の判断基準（§5後半） | いつ委譲するかテーブル |
| 14 | Skills — 段階的開示の中核（§6） | §0で述べた段階的開示の実現手段としてのSkills。skillの作り方 + CLAUDE.md vs Skillの使い分け（PR #10） |
| 15 | 設定ファイル（§7） | settings.json例 + /init |
| 16 | カスタムコマンド（§8） | .claude/commands/ のMarkdown例 |
| 17 | よく使うコマンド一覧（§9） | コマンドテーブル + ワンライナー |
| 18 | まとめ | 明日から使う3つの習慣 + タスク固有の知識はSkillsで必要なときだけ読み込む旨（PR #10） |

## 変更対象ファイル

1. **`presentations/260327/slides.html`** — 新規作成 ⬜ 未着手
2. **`presentations/260327/index.html`** — `<title>` を更新 ✅ 完了（PR #12）
3. **`presentations/260327/images/NSK.png`** — ロゴ画像追加 ✅ 完了（PR #12）

## HTML構造パターン（260312準拠）

- 最外層: `<div class="slides">`
- 各スライド: `<section>` タグ
- タイトルスライド: `class="section-divider"` + `<h1>` + `<p>`
- 通常スライド: `<h2>` + `<div class="content">` 内にコンテンツ
- コードブロック: `<pre><code class="language-xxx">` （RevealHighlightプラグイン対応）
- テーブル: 素のHTML `<table>` （presentation-theme.cssでスタイル済み）
- 2カラム: CSS Grid `display: grid; grid-template-columns: 1fr 1fr;`
- 強調ボックス: `border-left` + グラデーション背景のパターン

## 検証方法
- ブラウザで `presentations/260327/index.html` を開いてスライドが正しく表示されることを確認
- 全スライドのナビゲーションが動作すること
- コードブロックがシンタックスハイライトされること

## 進捗サマリ

| PR | 内容 | スライドへの影響 | ステータス |
|----|------|-----------------|-----------|
| #10 | §0思想リファクタ（3原則の再整理、段階的開示の定義、Skills強調）、§6タイトル変更、まとめ更新 | スライド2, 14, 18 | ✅ マージ済み |
| #11 | §4にmypyの副次的価値（型はLLMにとってのドキュメント）追加 | スライド10b（新規追加） | ✅ マージ済み |
| #12 | plan.md作成、index.htmlタイトル更新、NSK.png追加 | — | ✅ マージ済み |
| — | slides.html の作成 | 全スライド | ⬜ 次のステップ |
