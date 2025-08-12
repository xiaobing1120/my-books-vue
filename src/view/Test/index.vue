<script setup>
  import { onMounted, defineOptions } from 'vue'

  defineOptions({
    name: 'Test'
  })
  onMounted(() => {
    console.log('Test')
  })
</script>

<template>
  <h1>Test</h1>
</template>

<style scoped lang="less">

</style>
