<script setup>
import { computed, ref, watch } from "vue"
import { randomStringGenerator } from "../utils/helpers"
import visibilityIcon from "../assets/visibility.svg"
import visibilityOffIcon from "../assets/visibility_off.svg"

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
  password: props.type === "password",
}))

const inputType = ref(props.type)

const model = ref(props.modelValue)

const showPassword = () => {
  inputType.value = inputType.value === "password" ? "text" : "password"
}

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
      <div v-if="type === 'password'" class="password-container">
        <input
          :type="inputType"
          v-bind="$attrs"
          :id="id"
          v-model="model"
          :class="inputClasses"
        />
        <img
          v-if="inputType === 'password'"
          :src="visibilityIcon"
          alt="Ícone de visualizar senha"
          class="eye-icon"
          @click="showPassword"
        />
        <img
          v-else
          :src="visibilityOffIcon"
          alt="Ícone de esconder senha"
          class="eye-icon"
          @click="showPassword"
        />
      </div>

      <input
        v-else
        v-bind="$attrs"
        :id="id"
        :type="inputType"
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

.password-container {
  position: relative;
}

.password {
  width: 100%;
  box-sizing: border-box;
}

.eye-icon {
  font-size: 20px;
  position: absolute;
  right: 0px;
  top: 50%;
  cursor: pointer;
  color: #666;
  transform: translate(-50%, -50%);
}

.error-description {
  margin: 2px 0px 0px;
  line-height: normal;
  font-size: $font-size-sm;
  color: $color-error;
  font-weight: $font-weight-semibold;
}
</style>
