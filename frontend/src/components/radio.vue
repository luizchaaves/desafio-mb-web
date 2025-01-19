<script setup>
import { ref, watch } from "vue"
import { randomStringGenerator } from "../utils/helpers"

const props = defineProps({
  id: {
    type: String,
    default: () => `radio-${randomStringGenerator()}`,
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
})

const emit = defineEmits(["update:modelValue"])

const model = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => (model.value = newValue)
)

watch(model, (newValue) => {
  emit("update:modelValue", newValue)
})
</script>

<template>
  <div class="radio-container">
    <input
      v-bind="$attrs"
      :id="id"
      :value="value"
      type="radio"
      v-model="model"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.radio-container {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
}

input[type="radio"] {
  accent-color: $color-orange;
}
</style>
