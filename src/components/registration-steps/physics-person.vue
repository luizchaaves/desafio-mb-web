<script setup>
import { reactive } from "vue"
import { formatDate, formatPhone, formatCpf } from "../../utils/masks"
import Form from "../form.vue"
import Input from "../input.vue"
import Button from "../button.vue"

const formData = reactive({
  name: "",
  cpf: "",
  birthdate: "",
  phone: "",
})

const handleCpf = () => (formData.cpf = formatCpf(formData.cpf))
const handlePhone = () => (formData.phone = formatPhone(formData.phone))
const handleBirthdate = () =>
  (formData.birthdate = formatDate(formData.birthdate))
</script>

<template>
  <Form>
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
