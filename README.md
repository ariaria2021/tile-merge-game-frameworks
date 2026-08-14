# Tile Merge Game - Framework Comparison

同じゲームをReactとVue3で実装し、フレームワークの違いを学ぶためのリポジトリです。

## ✨ Features

- **🎯 同じゲーム、複数のフレームワーク**：Monorepoで管理される React, Vue3, Svelte 版
- **🏗️ Shared Logic**：ゲームロジック（グリッド操作、スコア計算）はTypeScriptで統一
- **🎨 Identical UI/UX**：各バージョンで同じスタイル、アニメーション、操作感
- **📚 Learning Resource**：React/Vue/Svelte の状態管理、ライフサイクル、コンポーネント設計の比較
- **🚀 CI/CD Ready**：GitHub Actions で自動ビルド・デプロイ

## 🛠️ Tech Stack

### Shared
- TypeScript 5.9
- ゲームロジック：gridUtils.ts, moveUtils.ts

### React Package
- React 19
- TypeScript
- Vite
- Hooks (useState, useCallback, useEffect)
- CSS Modules

### Vue3 Package
- Vue 3.5+
- TypeScript
- Vite
- Composition API (<script setup>)
- CSS Modules

### Svelte Package
- Svelte 5
- TypeScript
- Vite
- Runes ($state, $derived) + Writable Stores
- CSS Modules

## 🚀 Quick Start

### Prerequisites
- Node.js >= 24.0.0
- pnpm 8+

### Installation
```bash
cd tile-merge-game-frameworks
npm install
```

### Development
```bash
# React版を開発
npm run dev:react

# Vue3版を開発
npm run dev:vue3

# Svelte版を開発
npm run dev:svelte
```

### Build
```bash
# 全パッケージをビルド
npm run build
```

## 📁 Project Structure

```
tile-merge-game-frameworks/
├── packages/
│   ├── shared/          # 共有ゲームロジック
│   │   └── src/
│   │       ├── types/   # 型定義
│   │       └── utils/   # gridUtils, moveUtils
│   ├── react/           # React実装
│   │   └── src/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── styles/
│   ├── vue3/            # Vue3実装
│   │   └── src/
│   │       ├── components/
│   │       ├── composables/
│   │       └── styles/
│   └── svelte/          # Svelte実装
│       └── src/
│           ├── components/
│           ├── stores/
│           └── styles/
├── .github/workflows/   # GitHub Actions
└── tsconfig.json        # ルートTypeScript設定
```

## 🎮 Game Rules

- **操作**：矢印キー（PC）またはスワイプ（モバイル）
- **目標**：タイルをマージして 2048 を作成
- **スコア**：マージされたタイルの値がスコアに加算
- **ゲームオーバー**：新しいタイルが置けなくなったとき

## 📖 Learning Guide

### React vs Vue3 比較
このリポジトリは、React と Vue3 の主な違いを学ぶのに最適です：

1. **状態管理**：`useState` vs `ref()` / `computed()` vs `writable` / `$state`
2. **ライフサイクル**：`useEffect` vs `onMounted` / `watch` vs `onMount` / `$effect`
3. **カスタムHook vs Composable vs Store**：`useGrid` → `useGame` → `gameStore`
4. **イベント処理**：キーボード・タッチ入力の実装方法
5. **スタイリング**：CSS Modules / `<style scoped>` / CSS Modules

詳細は、[ブログ記事](https://ariaria2021.github.io/blog/react-to-vue3-tile-merge-game/) を参照してください。

## 🚀 Deployment

GitHub Actions により、main ブランチへのプッシュ時に自動的に GitHub Pages へデプロイされます。

**公開URL**：`https://[username].github.io/tile-merge-game-frameworks/`

- React版：`/react/`
- Vue3版：`/vue3/`
- Svelte版：`/svelte/`

## 📝 License

MIT

## 🙋 Contributing

フレームワーク追加（Svelte, Solid.js など）のプルリクエストを歓迎します！

---

**Made with ❤️ for developers exploring different JavaScript frameworks.**
