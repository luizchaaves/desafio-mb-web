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
      props.registrationData.name &&
        props.registrationData.cpf &&
        props.registrationData.birthdate &&
        props.registrationData.phone
    ) &&
    isValid.cpf &&
    isValid.date &&
    isValid.phone
)

const isValid = reactive({
  cpf: true,
  date: true,
  phone: true,
})

const onChangeValidateCpf = () => {
  isValid.cpf = validateCpf(props.registrationData.cpf)
}

const onChangeValidateDate = () => {
  isValid.date = validateDate(props.registrationData.birthdate)
}

const onChangeValidatePhone = () => {
  isValid.phone = validatePhone(props.registrationData.phone)
}

const handleCpf = () => {
  props.registrationData.cpf = formatCpf(props.registrationData.cpf)
}

const handlePhone = () => {
  props.registrationData.phone = formatPhone(props.registrationData.phone)
}

const handleBirthdate = () => {
  props.registrationData.birthdate = formatDate(
    props.registrationData.birthdate
  )
}

const clearJuridicPersonData = () => {
  props.registrationData.cnpj = ""
  props.registrationData.company = ""
  props.registrationData.openingDate = ""
}

const handleSubmit = () => {
  if (formIsValid.value) {
    clearJuridicPersonData()
    emit("nextStep")
  }
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input label="Nome" type="text" v-model="props.registrationData.name" />
    <Input
      label="CPF"
      type="text"
      :maxlength="14"
      inputmode="numeric"
      :error="!isValid.cpf && props.registrationData.cpf ? 'cpf inválido' : ''"
      v-model="props.registrationData.cpf"
      @keyup="handleCpf"
      @change="onChangeValidateCpf"
    />
    <Input
      label="Data de nascimento"
      type="text"
      :maxlength="10"
      inputmode="numeric"
      :error="
        !isValid.date && props.registrationData.birthdate
          ? 'data de nascimento inválida'
          : ''
      "
      v-model="props.registrationData.birthdate"
      @keyup="handleBirthdate"
      @change="onChangeValidateDate"
    />
    <Input
      label="Telefone"
      type="tel"
      :maxlength="15"
      inputmode="tel"
      :error="
        !isValid.phone && props.registrationData.phone
          ? 'telefone inválido'
          : ''
      "
      v-model="props.registrationData.phone"
      @keyup="handlePhone"
      @change="onChangeValidatePhone"
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
