<script setup>
import { computed } from "vue"
import check_circle from "../assets/check_circle.svg"
import cancel from "../assets/cancel.svg"
import Button from "./button.vue"

const props = defineProps({
  message: String,
  isSuccess: {
    type: Boolean,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(["update:isVisible"])

const iconClass = computed(() => (props.isSuccess ? "success" : "error"))
const iconSrc = computed(() => (props.isSuccess ? check_circle : cancel))

const closeDialog = () => {
  emit("update:isVisible", false)
}
</script>

<template>
  <div v-if="isVisible" class="dialog-overlay">
    <div class="dialog-container">
      <div :class="['dialog-header', iconClass]">
        <img :src="iconSrc" alt="Ícone" class="dialog-icon" />
      </div>

      <div class="dialog-body">
        <span v-if="message">{{ message }}</span>
        <slot name="body" />
      </div>

      <div class="dialog-button">
        <Button
          type="button"
          :label="isSuccess ? 'Concluir' : 'Revisar'"
          color="secondary"
          stretched
          @click="closeDialog"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: $spacing-md;

  @media (max-width: $breakpoint-mobile) {
    padding: $spacing-xl;
  }
}

.dialog-container {
  background-color: $color-white;
  width: 100%;
  max-width: 320px;
  max-height: 80vh;
  border-radius: $border-radius-lg;
  box-shadow: 0 4px 6px rgba($color: $color-black, $alpha: 0.1);
  overflow: hidden;
}

.dialog-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: $spacing-xs;
  padding: $spacing-lg;
  font-size: 18px;
  color: $color-white;

  &.success {
    background-color: #4caf50;
  }

  &.error {
    background-color: $color-error;
  }

  & > .dialog-icon {
    width: 56px;
    height: 56px;
  }
}

.dialog-body {
  padding: 32px $spacing-lg $spacing-lg;
  max-height: 400px;
  overflow-y: auto;
  font-size: 14px;
}

.dialog-button {
  padding: $spacing-lg;
}
</style>
