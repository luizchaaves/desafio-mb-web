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
  () =>
    Boolean(
      props.registrationData.email && props.registrationData.personType
    ) && emailIsValid.value
)

const emailIsValid = ref(true)

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
  emailIsValid.value = validateEmail(props.registrationData.email)
}

const handleSubmit = () => {
  if (formIsValid.value) {
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
      :error="
        !emailIsValid && props.registrationData.email ? 'e-mail inválido' : ''
      "
      v-model="props.registrationData.email"
      @change="onChangeValidateEmail"
    />
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
      <Radio
        v-for="type in personTypes"
        :key="type.id"
        :label="type.label"
        :value="type.value"
        v-model="props.registrationData.personType"
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
