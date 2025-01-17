<script setup>
import Title from "./components/title.vue"
import Steps from "./components/steps.vue"
import Button from "./components/button.vue"
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <Steps :step="2" />
    <Title title="Seja bem vindo(a)" />
    <Button label="Voltar" color="secondary" />
    <Button label="Continuar" disabled @click="() => console.log('teste')" />
  </div>
</template>
