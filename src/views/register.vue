<script setup>
import { computed, onMounted, reactive, watch } from "vue"
import Header from "../components/header.vue"
import Welcome from "../components/registration-steps/welcome.vue"
import Password from "../components/registration-steps/password.vue"
import JuridicPerson from "../components/registration-steps/juridic-person.vue"
import PhysicsPerson from "../components/registration-steps/physics-person.vue"
import Review from "../components/registration-steps/review.vue"

const storedData = computed(() =>
  JSON.parse(localStorage.getItem("mbResistrationData"))
)
const storedSteps = computed(() =>
  JSON.parse(localStorage.getItem("mbResistrationSteps"))
)

const steps = reactive({
  current: storedSteps?.current ?? 1,
  total: storedSteps?.total ?? 4,
})

const titles = reactive({
  1: "Seja bem vindo(a)",
  2: "Pessoa Física / Jurídica",
  3: "Senha de acesso",
  4: "Revise suas informações",
})

const registrationData = reactive({
  email: storedData.email ?? "",
  personType: storedData.personType ?? "",
  name: storedData.name ?? "",
  cpf: storedData.cpf ?? "",
  birthdate: storedData.birthdate ?? "",
  phone: storedData.phone ?? "",
  company: storedData.company ?? "",
  cnpj: storedData.cnpj ?? "",
  openingDate: storedData.openingDate ?? "",
  password: storedData.password ?? "",
})

const isPhysicsPerson = computed(() => registrationData.personType === "pp")

const title = computed(() => {
  if (steps.current === 2) {
    return isPhysicsPerson.value ? "Pessoa Física" : "Pessoa Jurídica"
  }
  return titles[steps.current]
})

const updateStoredData = () => {
  localStorage.setItem("mbResistrationData", JSON.stringify(registrationData))
}

const updateStoredSteps = () => {
  localStorage.setItem("mbResistrationSteps", JSON.stringify(steps))
}

watch(registrationData, () => updateStoredData())

watch(steps, () => updateStoredSteps())

onMounted(() => {
  registrationData.email = storedData.value?.email ?? ""
  registrationData.personType = storedData.value?.personType ?? ""
  registrationData.name = storedData.value?.name ?? ""
  registrationData.cpf = storedData.value?.cpf ?? ""
  registrationData.birthdate = storedData.value?.birthdate ?? ""
  registrationData.phone = storedData.value?.phone ?? ""
  registrationData.company = storedData.value?.company ?? ""
  registrationData.cnpj = storedData.value?.cnpj ?? ""
  registrationData.openingDate = storedData.value?.openingDate ?? ""
  registrationData.password = storedData.value?.password ?? ""

  steps.current = storedSteps.value?.current ?? 1
  steps.total = storedSteps.value?.total ?? 4
})
</script>

<template>
  <section>
    <div class="container">
      <div class="content">
        <Header
          :title="title"
          :step="steps.current"
          :totalSteps="steps.total"
        />
        <Welcome
          v-if="steps.current === 1"
          :registration-data="registrationData"
          @nextStep="steps.current++"
        />
        <PhysicsPerson
          v-else-if="steps.current === 2 && isPhysicsPerson"
          :registration-data="registrationData"
          @prevStep="steps.current--"
          @nextStep="steps.current++"
        />
        <JuridicPerson
          v-else-if="steps.current === 2 && !isPhysicsPerson"
          :registration-data="registrationData"
          @prevStep="steps.current--"
          @nextStep="steps.current++"
        />
        <Password
          v-else-if="steps.current === 3"
          :registration-data="registrationData"
          @prevStep="steps.current--"
          @nextStep="steps.current++"
        />
        <Review
          v-else-if="steps.current === 4"
          :registration-data="registrationData"
          @prevStep="steps.current--"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: $breakpoint-tablet;
  width: 100%;
  margin: 0px auto;
  padding: $spacing-lg;

  @media (max-width: $breakpoint-mobile) {
    padding: $spacing-md;
    justify-content: flex-start;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  max-width: 360px;
  width: 100%;

  @media (max-width: $breakpoint-mobile) {
    max-width: 100%;
  }
}
</style>
