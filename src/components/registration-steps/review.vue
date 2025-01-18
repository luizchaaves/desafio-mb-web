<script setup>
import { computed, reactive } from "vue"
import {
  formatDate,
  formatPhone,
  formatCpf,
  formatCnpj,
} from "../../utils/masks"
import Form from "../form.vue"
import Input from "../input.vue"
import Button from "../button.vue"

const formData = reactive({
  email: "",
  type: "pp",
  name: "",
  cpf: "",
  birthdate: "",
  phone: "",
  company: "",
  cnpj: "",
  openingDate: "",
  password: "",
})

const isPhysicsPerson = computed(() => formData.type === "pp")

const handleCpf = () => (formData.cpf = formatCpf(formData.cpf))
const handleCnpj = () => (formData.cnpj = formatCnpj(formData.cnpj))
const handlePhone = () => (formData.phone = formatPhone(formData.phone))
const handleBirthdate = () =>
  (formData.birthdate = formatDate(formData.birthdate))
</script>

<template>
  <Form>
    <Input
      label="Endereço de e-mail"
      type="email"
      inputmode="email"
      v-model="formData.email"
    />

    <Input
      v-if="isPhysicsPerson"
      label="Nome"
      type="text"
      v-model="formData.name"
    />
    <Input v-else label="Razão social" type="text" v-model="formData.company" />

    <Input
      v-if="isPhysicsPerson"
      label="CPF"
      type="text"
      :maxlength="14"
      inputmode="numeric"
      v-model="formData.cpf"
      @keyup="handleCpf"
    />
    <Input
      v-else
      label="CNPJ"
      type="text"
      :maxlength="18"
      inputmode="numeric"
      v-model="formData.cnpj"
      @keyup="handleCnpj"
    />

    <Input
      v-if="isPhysicsPerson"
      label="Data de nascimento"
      type="text"
      :maxlength="10"
      inputmode="numeric"
      v-model="formData.birthdate"
      @keyup="handleBirthdate"
    />
    <Input
      v-else
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

    <Input label="Senha" type="password" v-model="formData.password" />

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
