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
      props.registrationData.cnpj &&
        props.registrationData.company &&
        props.registrationData.openingDate &&
        props.registrationData.phone
    ) &&
    isValid.cnpj &&
    isValid.date &&
    isValid.phone
)

const isValid = reactive({
  cnpj: true,
  date: true,
  phone: true,
})

const handleCnpj = () => {
  props.registrationData.cnpj = formatCnpj(props.registrationData.cnpj)
}

const handlePhone = () => {
  props.registrationData.phone = formatPhone(props.registrationData.phone)
}

const handleDate = () => {
  props.registrationData.openingDate = formatDate(
    props.registrationData.openingDate
  )
}

const onChangeValidateCnpj = () => {
  isValid.cnpj = validateCnpj(props.registrationData.cnpj)
}

const onChangeValidateDate = () => {
  isValid.date = validateDate(props.registrationData.openingDate)
}

const onChangeValidatePhone = () => {
  isValid.phone = validatePhone(props.registrationData.phone)
}

const clearPhysicsPersonData = () => {
  props.registrationData.cpf = ""
  props.registrationData.name = ""
  props.registrationData.birthdate = ""
}

const handleSubmit = () => {
  if (formIsValid.value) {
    clearPhysicsPersonData()
    emit("nextStep")
  }
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input
      label="Razão social"
      type="text"
      v-model="props.registrationData.company"
    />
    <Input
      label="CNPJ"
      type="text"
      :maxlength="18"
      inputmode="numeric"
      :error="
        !isValid.cnpj && props.registrationData.cnpj ? 'cnpj inválido' : ''
      "
      v-model="props.registrationData.cnpj"
      @keyup="handleCnpj"
      @change="onChangeValidateCnpj"
    />
    <Input
      label="Data de abertura"
      type="text"
      :maxlength="10"
      inputmode="numeric"
      :error="
        !isValid.date && props.registrationData.openingDate
          ? 'data de abertura inválida'
          : ''
      "
      v-model="props.registrationData.openingDate"
      @keyup="handleDate"
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
