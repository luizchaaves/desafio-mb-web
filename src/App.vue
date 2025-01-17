<script setup>
import Title from "./components/title.vue"
import Steps from "./components/steps.vue"
</script>
<template>
  <div style="display: flex; flex-direction: column">
    <Steps :step="2" />
    <Title title="Seja bem vindo(a)" />
  </div>
</template>
