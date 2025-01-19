<script setup>
import { computed, defineEmits, ref, watch } from "vue"
import { randomStringGenerator } from "../utils/helpers"

const props = defineProps({
  id: {
    type: String,
    default: () => `input-${randomStringGenerator()}`,
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
  input: true,
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
    <div class="input-content">
      <input
        v-bind="$attrs"
        :id="id"
        :type="type"
        v-model="model"
        :class="inputClasses"
      />
      <span v-if="error" class="error-description">{{ error }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  & > .input-content {
    display: flex;
    flex-direction: column;
  }
}

.input {
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
    box-shadow: $box-shadow-orange;
  }

  &.error {
    border-color: $color-error;
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:focus {
    box-shadow: none;
    border-color: rgba(118, 118, 118, 0.3);
  }
}

.error-description {
  margin: 2px 0px 0px;
  line-height: normal;
  font-size: $font-size-sm;
  color: $color-error;
  font-weight: $font-weight-semibold;
}
</style>
