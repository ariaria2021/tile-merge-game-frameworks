<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Board from './components/Board.svelte'
  import Header from './components/Header.svelte'
  import GameOverlay from './components/GameOverlay.svelte'
  import { gridStore, scoreStore, gameOverStore, addScore, resetGame } from './stores/gameStore'
  import './App.css'

  let grid = $state($gridStore)
  let score = $state($scoreStore)
  let finished = $state($gameOverStore)

  const unsubGrid = gridStore.subscribe((v) => (grid = v))
  const unsubScore = scoreStore.subscribe((v) => (score = v))
  const unsubOver = gameOverStore.subscribe((v) => (finished = v))

  onDestroy(() => {
    unsubGrid()
    unsubScore()
    unsubOver()
  })

  // キーボード操作
  function handleKeyDown(e: KeyboardEvent) {
    if (finished) return

    let result = { moved: false, score: 0 }

    switch (e.key) {
      case 'ArrowUp':
        result = gridStore.move('UP')
        e.preventDefault()
        break
      case 'ArrowDown':
        result = gridStore.move('DOWN')
        e.preventDefault()
        break
      case 'ArrowLeft':
        result = gridStore.move('LEFT')
        e.preventDefault()
        break
      case 'ArrowRight':
        result = gridStore.move('RIGHT')
        e.preventDefault()
        break
      default:
        return
    }

    if (result.moved) addScore(result.score)
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  // タッチ操作
  let touchStart: { x: number; y: number } | null = null

  function handleTouchStart(e: TouchEvent) {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!touchStart || finished) return

    const dx = e.changedTouches[0].clientX - touchStart.x
    const dy = e.changedTouches[0].clientY - touchStart.y
    const threshold = 30

    let result = { moved: false, score: 0 }

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > threshold) result = gridStore.move(dx > 0 ? 'RIGHT' : 'LEFT')
    } else {
      if (Math.abs(dy) > threshold) result = gridStore.move(dy > 0 ? 'DOWN' : 'UP')
    }

    if (result.moved) addScore(result.score)
    touchStart = null
  }
</script>

<div
  class="app-container"
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
>
  <Header {score} onreset={resetGame} />

  <div style="position: relative; width: 100%; max-width: 500px; margin: 0 auto">
    <Board {grid} />
    <GameOverlay isGameOver={finished} onretry={resetGame} />
  </div>

  <p style="text-align: center; margin-top: 20px; color: #776e65">
    Use <strong>arrow keys</strong> or <strong>swipe</strong> to join the tiles!
  </p>
</div>
