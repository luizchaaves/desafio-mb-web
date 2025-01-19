<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="title">{{ title }}</h1>
</template>

<style lang="scss" scoped>
.title {
  font-size: $font-size-lg;
  line-height: normal;
  margin: 0px;
}
</style>
