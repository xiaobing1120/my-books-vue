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
  <h1>Hello, Color Scheme!</h1>
  <input type="text" placeholder="输入内容">
</template>

<style scoped lang="less">

</style>
