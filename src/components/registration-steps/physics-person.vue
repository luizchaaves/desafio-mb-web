<script setup>
import { defineEmits, reactive } from "vue"
import { formatDate, formatPhone, formatCpf } from "../../utils/masks"
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

const formData = reactive({
  name: props.registrationData.name,
  cpf: props.registrationData.cpf,
  birthdate: props.registrationData.birthdate,
  phone: props.registrationData.phone,
})

const handleCpf = () => (formData.cpf = formatCpf(formData.cpf))
const handlePhone = () => (formData.phone = formatPhone(formData.phone))
const handleBirthdate = () =>
  (formData.birthdate = formatDate(formData.birthdate))

const handleSubmit = () => {
  const data = { ...formData, company: "", cnpj: "", openingDate: "" }
  emit("updateRegistrationData", data)
  emit("nextStep")
}

const handleBack = () => {
  formData.name = props.registrationData.name
  formData.cpf = props.registrationData.cpf
  formData.birthdate = props.registrationData.birthdate
  formData.phone = props.registrationData.phone
  emit("updateRegistrationData", formData)
  emit("prevStep")
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input label="Nome" type="text" v-model="formData.name" />
    <Input
      label="CPF"
      type="text"
      :maxlength="14"
      inputmode="numeric"
      v-model="formData.cpf"
      @keyup="handleCpf"
    />
    <Input
      label="Data de nascimento"
      type="text"
      :maxlength="10"
      inputmode="numeric"
      v-model="formData.birthdate"
      @keyup="handleBirthdate"
    />
    <Input
      label="Telefone"
      type="tel"
      :maxlength="15"
      inputmode="tel"
      v-model="formData.phone"
      @keyup="handlePhone"
    />

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
