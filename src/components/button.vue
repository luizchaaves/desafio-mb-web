<script setup>
import { defineEmits, computed } from "vue"

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary"].includes(value)
    },
  },
  stretched: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(["click"])

const buttonClasses = computed(() => ({
  primary: props.color === "primary",
  secondary: props.color === "secondary",
  disabled: props.disabled,
}))

const buttonStyles = computed(() => ({
  width: props.stretched ? "100%" : "auto",
}))

const handleClick = () => {
  if (!props.disabled) {
    emit("click")
  }
}
</script>

<template>
  <button :class="buttonClasses" :style="buttonStyles" @click="handleClick">
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-md;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: background-color 0.25s;
  overflow: hidden;
  font-weight: $font-weight-semibold;
  min-width: 100px;

  &.primary {
    border: 1px solid transparent;
    background-color: $color-orange;
    color: $color-white;
    transition: box-shadow 0.25s;

    &:not(.disabled):hover {
      background-color: $color-orange-hover;
      box-shadow: $box-shadow-orange;
    }
  }

  &.secondary {
    border: 1px solid $color-orange;
    background-color: $color-white;
    color: $color-orange;
    transition: box-shadow 0.25s, border-color 0.25s;

    &:not(.disabled):hover {
      background-color: rgba($color: #000000, $alpha: 0.04);
      border-color: transparent;
      box-shadow: $box-shadow-orange;
    }
  }

  &.disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
