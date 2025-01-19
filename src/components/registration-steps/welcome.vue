<script setup>
import { computed, reactive, ref } from "vue"
import { randomStringGenerator } from "../../utils/helpers"
import { validateEmail } from "../../utils/validators"
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

const formIsValid = computed(
  () => Boolean(formData.email && formData.personType) && emailIsValid.value
)

const emailIsValid = ref(true)

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

const onChangeValidateEmail = () => {
  emailIsValid.value = validateEmail(formData.email)
}

const handleSubmit = () => {
  if (formIsValid.value) {
    emit("updateRegistrationData", formData)
    emit("nextStep")
  }
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input
      label="Endereço de e-mail"
      type="text"
      inputmode="email"
      :error="!emailIsValid && formData.email ? 'e-mail inválido' : ''"
      v-model="formData.email"
      @change="onChangeValidateEmail"
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
      <Button
        type="submit"
        stretched
        label="Continuar"
        :disabled="!formIsValid"
      />
    </template>
  </Form>
</template>
