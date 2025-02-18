<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progress + '%' }">
      <div class="tooltip">{{ progress }}% Complete</div>
    </div>
    <div class="step-counter">
      Step {{ completedSteps }} of {{ totalSteps }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: Number,
  completedSteps: Number,
  totalSteps: Number
})
</script>

<style>
.progress-container {
  @apply h-4 bg-gray-200 rounded-full relative;
}

.progress-bar {
  @apply h-full bg-blue-500 rounded-full transition-all duration-300;
}

.tooltip {
  @apply absolute -top-8 right-0 bg-gray-800 text-white px-2 py-1 rounded text-sm;
}
</style>