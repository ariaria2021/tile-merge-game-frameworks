<template>
  <div :class="[tileStyles.tile, tileStyles[`tile${cell.value}`], isNew && tileStyles.newTile, mergedFrom && tileStyles.mergedTile]" :style="positionStyle">
    {{ cell.value }}
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import type { Cell } from '@game-frameworks/shared/types'
import tileStyles from '../styles/Tile.module.css'

interface Props {
  cell: Cell
}

const props = defineProps<Props>()

const isNew = computed(() => props.cell.isNew)
const mergedFrom = computed(() => props.cell.mergedFrom)

const positionStyle = computed<CSSProperties>(() => {
  const [row, col] = props.cell.position
  return {
    width: `calc((100% - 3 * var(--gap)) / 4)`,
    height: `calc((100% - 3 * var(--gap)) / 4)`,
    left: `calc(${col} * (25% + var(--gap) / 4))`,
    top: `calc(${row} * (25% + var(--gap) / 4))`,
  }
})
</script>
