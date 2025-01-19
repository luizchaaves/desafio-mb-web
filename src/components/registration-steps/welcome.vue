<script setup>
import { reactive } from "vue"
import { randomStringGenerator } from "../../utils/helpers"
import Form from "../form.vue"
import Input from "../input.vue"
import Radio from "../radio.vue"
import Button from "../button.vue"

const props = defineProps({
  registrationData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["updateRegistrationData", "nextStep"])

const formData = reactive({
  email: props.registrationData.email,
  personType: props.registrationData.personType,
})

const personTypes = reactive([
  {
    id: randomStringGenerator(),
    label: "Pessoa física",
    value: "pp",
  },
  {
    id: randomStringGenerator(),
    label: "Pessoa jurídica",
    value: "jp",
  },
])

const handleSubmit = () => {
  emit("updateRegistrationData", formData)
  emit("nextStep")
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input
      label="Endereço de e-mail"
      type="text"
      inputmode="email"
      v-model="formData.email"
    />
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
      <Radio
        v-for="type in personTypes"
        :key="type.id"
        :label="type.label"
        :value="type.value"
        v-model="formData.personType"
      />
    </div>

    <template #buttons>
      <Button type="submit" stretched label="Continuar" :disabled="false" />
    </template>
  </Form>
</template>
