import { ref } from 'vue'
import type { Grid, Direction } from '@game-frameworks/shared/types'
import { createEmptyGrid, addRandomTile } from '@game-frameworks/shared/utils'
import { rotateRight, rotateLeft, processRow } from '@game-frameworks/shared/utils'

export const useGame = () => {
  const grid = ref<Grid>(() => {
    let initialGrid = createEmptyGrid()
    initialGrid = addRandomTile(initialGrid)
    initialGrid = addRandomTile(initialGrid)
    return initialGrid
  }())

  const move = (direction: Direction) => {
    let moved = false
    let totalScore = 0

    let processingGrid = [...grid.value]

    // 方向に応じて回転
    if (direction === 'RIGHT') processingGrid = rotateRight(rotateRight(processingGrid))
    if (direction === 'UP') processingGrid = rotateLeft(processingGrid)
    if (direction === 'DOWN') processingGrid = rotateRight(processingGrid)

    // 各行を処理
    const newRows = processingGrid.map((row) => {
      const { newRow, score } = processRow(row)
      totalScore += score
      return newRow
    })

    // 元の向きに戻す
    let computedGrid = newRows
    if (direction === 'RIGHT') computedGrid = rotateLeft(rotateLeft(computedGrid))
    if (direction === 'UP') computedGrid = rotateRight(computedGrid)
    if (direction === 'DOWN') computedGrid = rotateLeft(computedGrid)

    // 変更チェック
    const isChanged =
      JSON.stringify(grid.value.map(r => r.map(c => c?.value))) !==
      JSON.stringify(computedGrid.map(r => r.map(c => c?.value)))

    if (isChanged) {
      moved = true

      // 新しいタイルを追加
      let finalGrid = addRandomTile(computedGrid)

      // position修正
      finalGrid = finalGrid.map((row, r) =>
        row.map((cell, c) => (cell ? { ...cell, position: [r, c] } : null))
      )

      grid.value = finalGrid
    }

    return { moved, score: totalScore }
  }

  const resetGrid = () => {
    let newGrid = createEmptyGrid()
    newGrid = addRandomTile(newGrid)
    newGrid = addRandomTile(newGrid)
    grid.value = newGrid
  }

  return { grid, move, resetGrid }
}
