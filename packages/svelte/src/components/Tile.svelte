<script lang="ts">
  import type { Cell } from '@game-frameworks/shared/types'
  import tileStyles from '../styles/Tile.module.css'

  let { cell }: { cell: Cell } = $props()

  const positionStyle = $derived(() => {
    const [row, col] = cell.position
    return {
      width: `calc((100% - 3 * var(--gap)) / 4)`,
      height: `calc((100% - 3 * var(--gap)) / 4)`,
      left: `calc(${col} * (25% + var(--gap) / 4))`,
      top: `calc(${row} * (25% + var(--gap) / 4))`,
    }
  })

  const tileClass = $derived(() =>
    [
      tileStyles.tile,
      tileStyles[`tile${cell.value}`] ?? '',
      cell.isNew ? tileStyles.newTile : '',
      cell.mergedFrom ? tileStyles.mergedTile : '',
    ]
      .filter(Boolean)
      .join(' ')
  )
</script>

<div
  class={tileClass()}
  style:width={positionStyle().width}
  style:height={positionStyle().height}
  style:left={positionStyle().left}
  style:top={positionStyle().top}
>
  {cell.value}
</div>
