<script setup>
import { ref } from "vue"
import Form from "../form.vue"
import Input from "../input.vue"
import Button from "../button.vue"

const password = ref("")
</script>

<template>
  <Form>
    <Input label="Sua senha" type="password" v-model="password" />

    <template #buttons>
      <Button
        type="submit"
        stretched
        label="Voltar"
        color="secondary"
        :disabled="false"
      />
      <Button type="submit" stretched label="Continuar" :disabled="false" />
    </template>
  </Form>
</template>
