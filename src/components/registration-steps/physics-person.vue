<script setup>
import { computed, defineEmits, reactive } from "vue"
import { formatDate, formatPhone, formatCpf } from "../../utils/masks"
import {
  validateCpf,
  validateDate,
  validatePhone,
} from "../../utils/validators"
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

const formIsValid = computed(
  () =>
    Boolean(
      formData.name && formData.cpf && formData.birthdate && formData.phone
    ) &&
    isValid.cpf &&
    isValid.date &&
    isValid.phone
)

const formData = reactive({
  name: props.registrationData.name,
  cpf: props.registrationData.cpf,
  birthdate: props.registrationData.birthdate,
  phone: props.registrationData.phone,
})

const isValid = reactive({
  cpf: true,
  date: true,
  phone: true,
})

const handleCpf = () => (formData.cpf = formatCpf(formData.cpf))
const handlePhone = () => (formData.phone = formatPhone(formData.phone))
const handleBirthdate = () =>
  (formData.birthdate = formatDate(formData.birthdate))

const handleSubmit = () => {
  if (formIsValid.value) {
    const data = { ...formData, company: "", cnpj: "", openingDate: "" }
    emit("updateRegistrationData", data)
    emit("nextStep")
  }
}

const handleBack = () => {
  formData.name = props.registrationData.name
  formData.cpf = props.registrationData.cpf
  formData.birthdate = props.registrationData.birthdate
  formData.phone = props.registrationData.phone
  emit("updateRegistrationData", formData)
  emit("prevStep")
}

const onChangeValidateCpf = () => {
  isValid.cpf = validateCpf(formData.cpf)
}

const onChangeValidateDate = () => {
  isValid.date = validateDate(formData.birthdate)
}

const onChangeValidatePhone = () => {
  isValid.phone = validatePhone(formData.phone)
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
      :error="!isValid.cpf && formData.cpf ? 'cpf inválido' : ''"
      v-model="formData.cpf"
      @keyup="handleCpf"
      @change="onChangeValidateCpf"
    />
    <Input
      label="Data de nascimento"
      type="text"
      :maxlength="10"
      inputmode="numeric"
      :error="
        !isValid.date && formData.birthdate ? 'data de nascimento inválida' : ''
      "
      v-model="formData.birthdate"
      @keyup="handleBirthdate"
      @change="onChangeValidateDate"
    />
    <Input
      label="Telefone"
      type="tel"
      :maxlength="15"
      inputmode="tel"
      :error="!isValid.phone && formData.phone ? 'telefone inválido' : ''"
      v-model="formData.phone"
      @keyup="handlePhone"
      @change="onChangeValidatePhone"
    />

    <template #buttons>
      <Button
        type="button"
        stretched
        label="Voltar"
        color="secondary"
        @click="handleBack"
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
