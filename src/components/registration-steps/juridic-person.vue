<script setup>
import { defineEmits, reactive } from "vue"
import { formatDate, formatCnpj, formatPhone } from "../../utils/masks"
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
  company: props.registrationData.company,
  cnpj: props.registrationData.cnpj,
  openingDate: props.registrationData.openingDate,
  phone: props.registrationData.phone,
})

const handleCnpj = () => (formData.cnpj = formatCnpj(formData.cnpj))
const handlePhone = () => (formData.phone = formatPhone(formData.phone))
const handleDate = () =>
  (formData.openingDate = formatDate(formData.openingDate))

const handleSubmit = () => {
  const data = { ...formData, name: "", cpf: "", birthdate: "" }
  emit("updateRegistrationData", data)
  emit("nextStep")
}

const handleBack = () => {
  formData.company = props.registrationData.company
  formData.cnpj = props.registrationData.cnpj
  formData.openingDate = props.registrationData.openingDate
  formData.phone = props.registrationData.phone
  emit("updateRegistrationData", formData)
  emit("prevStep")
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input label="Razão social" type="text" v-model="formData.company" />
    <Input
      label="CNPJ"
      type="text"
      :maxlength="18"
      inputmode="numeric"
      v-model="formData.cnpj"
      @keyup="handleCnpj"
    />
    <Input
      label="Data de abertura"
      type="text"
      :maxlength="10"
      inputmode="numeric"
      v-model="formData.openingDate"
      @keyup="handleDate"
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
