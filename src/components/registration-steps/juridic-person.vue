<script setup>
import { reactive } from "vue"
import { formatDate, formatCnpj, formatPhone } from "../../utils/masks"
import Form from "../form.vue"
import Input from "../input.vue"
import Button from "../button.vue"

const formData = reactive({
  company: "",
  cnpj: "",
  openingDate: "",
  phone: "",
})

const handleCnpj = () => (formData.cnpj = formatCnpj(formData.cnpj))
const handlePhone = () => (formData.phone = formatPhone(formData.phone))
const handleDate = () =>
  (formData.openingDate = formatDate(formData.openingDate))
</script>

<template>
  <Form>
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
        type="submit"
        stretched
        label="Voltar"
        color="secondary"
        :disabled="false"
      />
      <Button type="submit" stretched label="Continuar" :disabled="false" />
    </template>
  </Form>
</template>
