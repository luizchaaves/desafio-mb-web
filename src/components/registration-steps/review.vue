<script setup>
import { computed, reactive } from "vue"
import {
  formatDate,
  formatPhone,
  formatCpf,
  formatCnpj,
} from "../../utils/masks"
import {
  validateEmail,
  validateCpf,
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

const emit = defineEmits(["prevStep"])

const isPhysicsPerson = computed(
  () => props.registrationData.personType === "pp"
)

const formIsValid = computed(() => {
  const validateCommonData =
    Boolean(
      props.registrationData.email &&
        props.registrationData.phone &&
        props.registrationData.password
    ) &&
    isValid.email &&
    isValid.phone

  if (isPhysicsPerson.value) {
    return (
      validateCommonData &&
      Boolean(
        props.registrationData.name &&
          props.registrationData.cpf &&
          props.registrationData.birthdate
      ) &&
      isValid.document &&
      isValid.date
    )
  } else {
    return (
      validateCommonData &&
      Boolean(
        props.registrationData.company &&
          props.registrationData.cnpj &&
          props.registrationData.openingDate
      ) &&
      isValid.document &&
      isValid.date
    )
  }
})

const isValid = reactive({
  email: true,
  document: true,
  date: true,
  phone: true,
})

const onChangeValidateEmail = () => {
  isValid.email = validateEmail(props.registrationData.email)
}

const onChangeValidateCpf = () => {
  isValid.document = validateCpf(props.registrationData.cpf)
}

const onChangeValidateCnpj = () => {
  isValid.document = validateCnpj(props.registrationData.cnpj)
}

const onChangeValidateBirthdate = () => {
  isValid.date = validateDate(props.registrationData.birthdate)
}

const onChangeValidateOpeningDate = () => {
  isValid.date = validateDate(props.registrationData.openingDate)
}

const onChangeValidatePhone = () => {
  isValid.phone = validatePhone(props.registrationData.phone)
}

const handleCpf = () => {
  props.registrationData.cpf = formatCpf(props.registrationData.cpf)
}

const handleCnpj = () => {
  props.registrationData.cnpj = formatCnpj(props.registrationData.cnpj)
}

const handlePhone = () => {
  props.registrationData.phone = formatPhone(props.registrationData.phone)
}

const handleBirthdate = () => {
  props.registrationData.birthdate = formatDate(
    props.registrationData.birthdate
  )
}

const handleOpeningDate = () => {
  props.registrationData.openingDate = formatDate(
    props.registrationData.openingDate
  )
}

const handleRegistration = () => {
  if (formIsValid.value) {
  }
}
</script>

<template>
  <Form @submit="handleRegistration">
    <Input
      label="Endereço de e-mail"
      type="email"
      inputmode="email"
      :error="
        !isValid.email && props.registrationData.email ? 'e-mail inválido' : ''
      "
      v-model="props.registrationData.email"
      @change="onChangeValidateEmail"
    />

    <Input
      v-if="isPhysicsPerson"
      label="Nome"
      type="text"
      v-model="props.registrationData.name"
    />

    <Input
      v-else
      label="Razão social"
      type="text"
      v-model="props.registrationData.company"
    />

    <Input
      v-if="isPhysicsPerson"
      label="CPF"
      type="text"
      :maxlength="14"
      inputmode="numeric"
      :error="
        !isValid.document && props.registrationData.cpf ? 'cpf inválido' : ''
      "
      v-model="props.registrationData.cpf"
      @keyup="handleCpf"
      @change="onChangeValidateCpf"
    />

    <Input
      v-else
      label="CNPJ"
      type="text"
      :maxlength="18"
      inputmode="numeric"
      :error="
        !isValid.document && props.registrationData.cnpj ? 'cnpj inválido' : ''
      "
      v-model="props.registrationData.cnpj"
      @keyup="handleCnpj"
      @change="onChangeValidateCnpj"
    />

    <Input
      v-if="isPhysicsPerson"
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
      @change="onChangeValidateBirthdate"
    />

    <Input
      v-else
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
      @keyup="handleOpeningDate"
      @change="onChangeValidateOpeningDate"
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

    <Input
      label="Senha"
      type="text"
      v-model="props.registrationData.password"
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
