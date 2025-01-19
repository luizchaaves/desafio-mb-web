<script setup>
import logo from "../assets/mb.svg"
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
  <header class="header-container">
    <img :src="logo" alt="Logo Mercado Bitcoin" />
    <div class="header-content">
      <Steps v-if="step && totalSteps" :step="step" :totalSteps="totalSteps" />
      <Title :title="title" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  gap: $spacing-md;

  @media (max-width: $breakpoint-mobile) {
    gap: $spacing-lg;
    flex-direction: column;
  }
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $spacing-xs;
  width: 100%;
}
</style>
