<script setup>
import Steps from "./steps.vue"
import Title from "./title.vue"

defineProps({
  step: Number,
  totalSteps: Number,
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <header class="register-header-container">
    <Steps v-if="step && totalSteps" :step="step" :totalSteps="totalSteps" />
    <Title :title="title" />
  </header>
</template>

<style lang="scss" scoped>
.register-header-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $spacing-xs;
}
</style>
