<template>
  <div :class="boardStyles.boardContainer">
    <!-- 背景グリッド -->
    <div :class="boardStyles.gridContainer">
      <div v-for="i in 16" :key="i" :class="boardStyles.gridCell" />
    </div>

    <!-- タイルレイヤー -->
    <div :class="boardStyles.tileContainer">
      <Tile v-for="cell in tiles" :key="cell.id" :cell="cell" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Grid } from '@game-frameworks/shared/types'
import Tile from './Tile.vue'
import boardStyles from '../styles/Board.module.css'

interface Props {
  grid: Grid
}

const props = defineProps<Props>()

const tiles = computed(() => {
  return props.grid.flat().filter(cell => cell !== null)
})
</script>
