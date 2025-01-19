<script setup>
import { computed } from "vue"
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

const handleRegistration = () => {}

const handleBack = () => {
  emit("prevStep")
}
</script>

<template>
  <Form>
    <Input
      disabled
      label="Endereço de e-mail"
      v-model="props.registrationData.email"
    />

    <Input
      v-if="isPhysicsPerson"
      disabled
      label="Nome"
      v-model="props.registrationData.name"
    />
    <Input
      v-else
      disabled
      label="Razão social"
      v-model="props.registrationData.company"
    />

    <Input
      v-if="isPhysicsPerson"
      disabled
      label="CPF"
      v-model="props.registrationData.cpf"
    />
    <Input v-else disabled label="CNPJ" v-model="props.registrationData.cnpj" />

    <Input
      v-if="isPhysicsPerson"
      disabled
      label="Data de nascimento"
      v-model="props.registrationData.birthdate"
    />
    <Input
      v-else
      disabled
      label="Data de abertura"
      v-model="props.registrationData.openingDate"
    />

    <Input label="Telefone" disabled v-model="props.registrationData.phone" />

    <Input
      label="Senha"
      disabled
      type="password"
      v-model="props.registrationData.password"
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
