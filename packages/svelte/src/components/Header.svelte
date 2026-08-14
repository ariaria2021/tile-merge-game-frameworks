<script lang="ts">
  let { score, onreset }: { score: number; onreset: () => void } = $props()
</script>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; width: 100%; max-width: 500px; margin: 0 auto 30px; padding: 0">
  <h1 style="font-size: 28px; font-weight: 800; color: #1f2937; margin: 0; letter-spacing: -0.025em">
    2048
  </h1>

  <div style="display: flex; gap: 12px; align-items: center">
    <div style="background: #e5e7eb; padding: 8px 16px; border-radius: 6px; color: #374151; text-align: center; min-width: 80px">
      <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em">
        SCORE
      </div>
      <div style="font-size: 18px; font-weight: 700">{score}</div>
    </div>

    <button
      onclick={onreset}
      style="
        background: #f97316;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.4);
      "
    >
      New Game
    </button>
  </div>
</div>
