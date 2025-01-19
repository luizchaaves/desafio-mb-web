<script setup>
import { computed, defineEmits, reactive } from "vue"
import { formatDate, formatCnpj, formatPhone } from "../../utils/masks"
import {
  validateCnpj,
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
      formData.cnpj &&
        formData.company &&
        formData.openingDate &&
        formData.phone
    ) &&
    isValid.cnpj &&
    isValid.date &&
    isValid.phone
)

const formData = reactive({
  company: props.registrationData.company,
  cnpj: props.registrationData.cnpj,
  openingDate: props.registrationData.openingDate,
  phone: props.registrationData.phone,
})

const isValid = reactive({
  cnpj: true,
  date: true,
  phone: true,
})

const handleCnpj = () => (formData.cnpj = formatCnpj(formData.cnpj))
const handlePhone = () => (formData.phone = formatPhone(formData.phone))
const handleDate = () =>
  (formData.openingDate = formatDate(formData.openingDate))

const handleSubmit = () => {
  if (formIsValid.value) {
    const data = { ...formData, name: "", cpf: "", birthdate: "" }
    emit("updateRegistrationData", data)
    emit("nextStep")
  }
}

const handleBack = () => {
  formData.company = props.registrationData.company
  formData.cnpj = props.registrationData.cnpj
  formData.openingDate = props.registrationData.openingDate
  formData.phone = props.registrationData.phone
  emit("updateRegistrationData", formData)
  emit("prevStep")
}

const onChangeValidateCnpj = () => {
  isValid.cnpj = validateCnpj(formData.cnpj)
}

const onChangeValidateDate = () => {
  isValid.date = validateDate(formData.openingDate)
}

const onChangeValidatePhone = () => {
  isValid.phone = validatePhone(formData.phone)
}
</script>

<template>
  <Form @submit="handleSubmit">
    <pre>{{ formIsValid }}</pre>
    <Input label="Razão social" type="text" v-model="formData.company" />
    <Input
      label="CNPJ"
      type="text"
      :maxlength="18"
      inputmode="numeric"
      :error="!isValid.cnpj && formData.cnpj ? 'cnpj inválido' : ''"
      v-model="formData.cnpj"
      @keyup="handleCnpj"
      @change="onChangeValidateCnpj"
    />
    <Input
      label="Data de abertura"
      type="text"
      :maxlength="10"
      inputmode="numeric"
      :error="
        !isValid.date && formData.openingDate ? 'data de abertura inválida' : ''
      "
      v-model="formData.openingDate"
      @keyup="handleDate"
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
