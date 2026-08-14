import { writable, derived } from 'svelte/store'
import type { Grid, Direction } from '@game-frameworks/shared/types'
import {
    createEmptyGrid,
    addRandomTile,
    isGameOver,
} from '@game-frameworks/shared/utils'
import { rotateRight, rotateLeft, processRow } from '@game-frameworks/shared/utils'

// ゲームグリッドのストア
const createGridStore = () => {
    const initGrid = (): Grid => {
        let g = createEmptyGrid()
        g = addRandomTile(g)
        g = addRandomTile(g)
        return g
    }

    const { subscribe, set, update } = writable<Grid>(initGrid())

    const move = (direction: Direction): { moved: boolean; score: number } => {
        let result = { moved: false, score: 0 }

        update((grid) => {
            let processingGrid = [...grid]

            if (direction === 'RIGHT') processingGrid = rotateRight(rotateRight(processingGrid))
            if (direction === 'UP') processingGrid = rotateLeft(processingGrid)
            if (direction === 'DOWN') processingGrid = rotateRight(processingGrid)

            let totalScore = 0
            const newRows = processingGrid.map((row) => {
                const { newRow, score } = processRow(row)
                totalScore += score
                return newRow
            })

            let computedGrid = newRows
            if (direction === 'RIGHT') computedGrid = rotateLeft(rotateLeft(computedGrid))
            if (direction === 'UP') computedGrid = rotateRight(computedGrid)
            if (direction === 'DOWN') computedGrid = rotateLeft(computedGrid)

            const isChanged =
                JSON.stringify(grid.map((r) => r.map((c) => c?.value))) !==
                JSON.stringify(computedGrid.map((r) => r.map((c) => c?.value)))

            if (isChanged) {
                result = { moved: true, score: totalScore }
                let finalGrid = addRandomTile(computedGrid)
                finalGrid = finalGrid.map((row, r) =>
                    row.map((cell, c) => (cell ? { ...cell, position: [r, c] as [number, number] } : null))
                )
                return finalGrid
            }

            return grid
        })

        return result
    }

    const reset = () => {
        set(initGrid())
    }

    return { subscribe, move, reset }
}

export const gridStore = createGridStore()

// スコアのストア
export const scoreStore = writable(0)
export const bestScoreStore = writable(0)

// ゲームオーバー判定（derived store）
export const gameOverStore = derived(gridStore, ($grid) => isGameOver($grid))

// スコア更新
export const addScore = (added: number) => {
    if (added <= 0) return
    scoreStore.update((s) => {
        const newScore = s + added
        bestScoreStore.update((best) => (newScore > best ? newScore : best))
        return newScore
    })
}

// リセット
export const resetGame = () => {
    gridStore.reset()
    scoreStore.set(0)
}
