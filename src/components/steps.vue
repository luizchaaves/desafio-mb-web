<script setup>
defineProps({
  step: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <p class="step-progress">
    Etapa <span class="step-curent">{{ step }}</span> de {{ totalSteps }}
  </p>
</template>

<style lang="scss" scoped>
.step-progress {
  margin: 0px;
  font-weight: $font-weight-semibold;

  .step-curent {
    color: $color-orange;
  }
}
</style>
