<script setup>
import Title from "./components/title.vue"
import Steps from "./components/steps.vue"
import Button from "./components/button.vue"
import Input from "./components/input.vue"
import Radio from "./components/radio.vue"
import { ref } from "vue"

const teste = ref("pf")
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <Steps :step="2" />
    <Title title="Seja bem vindo(a)" />
    <Button label="Voltar" color="secondary" />
    <Button label="Continuar" @click="() => console.log('teste')" />
    <Input label="Endereço de e-mail" type="email" v-model="teste" />
    <Radio v-model="teste" label="Pessoa física" value="pf" />
    <Radio v-model="teste" label="Pessoa jurídica" value="pj" />
  </div>
</template>
