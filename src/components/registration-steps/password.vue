<script setup>
import { ref } from "vue"
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

const password = ref(props.registrationData.password)

const handleSubmit = () => {
  emit("updateRegistrationData", { password: password.value })
  emit("nextStep")
}

const handleBack = () => {
  password.value = props.registrationData.password
  emit("updateRegistrationData", { password: password.value })
  emit("prevStep")
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input label="Sua senha" type="password" v-model="password" />

    <template #buttons>
      <Button
        type="button"
        stretched
        label="Voltar"
        color="secondary"
        :disabled="false"
        @click="handleBack"
      />
      <Button type="submit" stretched label="Continuar" :disabled="false" />
    </template>
  </Form>
</template>
