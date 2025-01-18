<script setup>
import { defineEmits, useSlots } from "vue"

const emit = defineEmits(["submit"])
const slots = useSlots()

const onSubmit = () => {
  emit("submit")
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form-content">
      <slot />
    </div>
    <div v-if="slots.buttons" class="form-buttons">
      <slot name="buttons" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;

  & > .form-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  & > .form-buttons {
    display: flex;
    align-items: center;

    gap: $spacing-lg;
  }
}
</style>
