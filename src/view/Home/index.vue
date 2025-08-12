<script setup>
  import { onMounted, defineOptions } from 'vue'
  defineOptions({
    name: 'Home'
  })
  onMounted(() => {
    console.log('Home')
  })
</script>

<template>
  <h1>Home</h1>
</template>

<style scoped lang="less">

</style>
