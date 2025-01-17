<script setup>
defineProps({
  step: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <p>
    Etapa <span>{{ step }}</span> de 4
  </p>
</template>

<style lang="scss" scoped>
p {
  margin: 0px;
  font-weight: $font-weight-semibold;

  span {
    color: $color-orange;
  }
}
</style>
