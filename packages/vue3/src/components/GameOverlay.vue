<template>
  <div
    v-if="isGameOver"
    style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(238, 228, 218, 0.73);
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      animation: fade-in 800ms ease;
    "
  >
    <h2 style="font-size: 60px; font-weight: bold; color: #776e65; margin: 0 0 30px">
      Game Over!
    </h2>
    <button
      @click="$emit('retry')"
      style="
        background: #8f7a66;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 15px 30px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      "
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isGameOver: boolean
}

defineProps<Props>()
defineEmits<{
  retry: []
}>()
</script>
