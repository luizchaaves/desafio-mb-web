<script setup>
import { computed, defineEmits, ref, watch } from "vue"

const props = defineProps({
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  },
  label: String,
  modelValue: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  error: String,
})

const emit = defineEmits("update:modelValue")

const inputClasses = computed(() => ({
  error: props.error,
}))

const model = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    model.value = newValue
  }
)
</script>

<template>
  <div class="input-container">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      :type="type"
      v-model="model"
      :class="inputClasses"
    />
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

input {
  color: $color-black;
  padding: $spacing-sm;
  font-size: $font-size-md;
  border: 1px solid $color-black;
  border-radius: $border-radius-lg;
  transition: box-shadow 0.25s, border-color 0.25s;

  &:hover,
  &:focus,
  &.error:hover,
  &.error:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 2px 1px $color-orange;
  }

  &.error {
    border-color: $color-error;
  }
}

.input-error {
  margin: 0px;
  line-height: normal;
  font-size: $font-size-sm;
  color: $color-error;
  font-weight: $font-weight-semibold;
  padding: 0px $spacing-sm;
}
</style>
