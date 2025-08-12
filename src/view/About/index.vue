<script setup>
  import { onMounted, defineOptions } from 'vue'
  defineOptions({
    name: 'About'
  })
  onMounted(() => {
    console.log('About')
  })
</script>

<template>
  <h1>About</h1>
</template>

<style scoped lang="less">

</style>
