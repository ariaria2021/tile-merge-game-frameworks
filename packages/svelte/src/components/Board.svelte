<script lang="ts">
  import type { Grid } from '@game-frameworks/shared/types'
  import Tile from './Tile.svelte'
  import boardStyles from '../styles/Board.module.css'

  let { grid }: { grid: Grid } = $props()

  const tiles = $derived(grid.flat().filter((cell) => cell !== null))
</script>

<div class={boardStyles.boardContainer}>
  <!-- 背景グリッド -->
  <div class={boardStyles.gridContainer}>
    {#each Array(16) as _, i (i)}
      <div class={boardStyles.gridCell}></div>
    {/each}
  </div>

  <!-- タイルレイヤー -->
  <div class={boardStyles.tileContainer}>
    {#each tiles as cell (cell.id)}
      <Tile {cell} />
    {/each}
  </div>
</div>
