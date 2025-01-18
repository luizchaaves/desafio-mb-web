<script setup>
import { reactive } from "vue"
import { randomStringGenerator } from "../../utils/helpers"
import Form from "../form.vue"
import Input from "../input.vue"
import Radio from "../radio.vue"
import Button from "../button.vue"

const formData = reactive({
  email: "",
  type: "",
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
</script>

<template>
  <Form>
    <Input
      label="Endereço de e-mail"
      type="email"
      inputmode="email"
      v-model="formData.email"
    />
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
      <Radio
        v-for="type in personTypes"
        :key="type.id"
        :label="type.label"
        :value="type.value"
        v-model="formData.type"
      />
    </div>

    <template #buttons>
      <Button type="submit" stretched label="Continuar" :disabled="false" />
    </template>
  </Form>
</template>
