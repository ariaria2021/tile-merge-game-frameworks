<template>
  <div
    class="app-container"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <Header :score="score" @reset="handleReset" />

    <div style="position: relative; width: 100%; max-width: 500px; margin: 0 auto">
      <Board :grid="grid" />
      <GameOverlay :is-game-over="finished" @retry="handleReset" />
    </div>

    <p style="text-align: center; margin-top: 20px; color: #776e65">
      Use <strong>arrow keys</strong> or <strong>swipe</strong> to join the tiles!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { isGameOver } from '@game-frameworks/shared/utils'
import { useGame } from './composables/useGame'
import Board from './components/Board.vue'
import Header from './components/Header.vue'
import GameOverlay from './components/GameOverlay.vue'
import './App.css'

const { grid, move, resetGrid } = useGame()
const score = ref(0)
const bestScore = ref(0)
const finished = ref(false)

// ゲームオーバー判定を監視
watch(
  () => grid.value,
  () => {
    finished.value = isGameOver(grid.value)
  }
)

// スコア更新処理
const updateScore = (addedScore: number) => {
  if (addedScore > 0) {
    score.value += addedScore
    if (score.value > bestScore.value) {
      bestScore.value = score.value
    }
  }
}

// リセット処理
const handleReset = () => {
  resetGrid()
  score.value = 0
  finished.value = false
}

// キーボード操作
const handleKeyDown = (e: KeyboardEvent) => {
  if (finished.value) return

  let result = { moved: false, score: 0 }

  switch (e.key) {
    case 'ArrowUp':
      result = move('UP')
      e.preventDefault()
      break
    case 'ArrowDown':
      result = move('DOWN')
      e.preventDefault()
      break
    case 'ArrowLeft':
      result = move('LEFT')
      e.preventDefault()
      break
    case 'ArrowRight':
      result = move('RIGHT')
      e.preventDefault()
      break
    default:
      return
  }

  if (result.moved) {
    updateScore(result.score)
  }
}

// タッチ操作
const touchStart = ref<{ x: number; y: number } | null>(null)

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!touchStart.value || finished.value) return

  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const diffX = touchEndX - touchStart.value.x
  const diffY = touchEndY - touchStart.value.y
  const threshold = 30

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (Math.abs(diffX) > threshold) {
      const result = move(diffX > 0 ? 'RIGHT' : 'LEFT')
      if (result.moved) updateScore(result.score)
    }
  } else {
    if (Math.abs(diffY) > threshold) {
      const result = move(diffY > 0 ? 'DOWN' : 'UP')
      if (result.moved) updateScore(result.score)
    }
  }
  touchStart.value = null
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
