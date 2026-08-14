<script lang="ts">
  let { isGameOver, onretry }: { isGameOver: boolean; onretry: () => void } = $props()
</script>

{#if isGameOver}
  <div
    style="
      position: absolute;
      inset: 0;
      background: rgba(238, 228, 218, 0.85);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 100;
    "
  >
    <p style="font-size: 32px; font-weight: 800; color: #776e65; margin-bottom: 16px">
      Game Over!
    </p>
    <button
      onclick={onretry}
      style="
        background: #f97316;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.4);
      "
    >
      Try Again
    </button>
  </div>
{/if}
