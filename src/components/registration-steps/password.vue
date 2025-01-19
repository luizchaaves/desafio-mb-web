<script setup>
import { computed } from "vue"
import Form from "../form.vue"
import Input from "../input.vue"
import Button from "../button.vue"

const props = defineProps({
  registrationData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["updateRegistrationData", "prevStep", "nextStep"])

const formIsValid = computed(() => Boolean(props.registrationData.password))

const handleSubmit = () => {
  if (formIsValid) {
    emit("nextStep")
  }
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input
      label="Sua senha"
      type="text"
      v-model="props.registrationData.password"
    />

    <template #buttons>
      <Button
        type="button"
        stretched
        label="Voltar"
        color="secondary"
        @click="() => emit('prevStep')"
      />
      <Button
        type="submit"
        stretched
        label="Continuar"
        :disabled="!formIsValid"
      />
    </template>
  </Form>
</template>
