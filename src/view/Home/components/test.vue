<script setup>
  import { defineOptions, defineProps } from "vue";

  defineOptions({
    name: 'RecursiveComponent' // 组件名称
  })
  defineProps({
    key: { type: String, default: () => '' },
    value: { type: Array || Object, default: () => [] }
  })

  // 是否是数组
  const isArray = (data) => {
    return Object.prototype.toString.call(data) ===  '[object Array]'
  }
  // 是否是对象
  const isObject = (data) => {
    return Object.prototype.toString.call(data) ===  '[object Object]'
  }


</script>

<template>
<div>
  {{ data }}
<!--  <RecursiveComponent
    v-for="item in children"
    :key="item.id"
    :data="item"
  />-->
  <template v-if="isObject(data)">
    <RecursiveComponent
      v-for="item in Object.keys(data)"
      :key="item"
      :value="data[item]"
    />
  </template>
  <template v-else-if="isArray(data)">
    <RecursiveComponent
      v-for="item in data"
      :value="data[item]"
    />
  </template>
  <template v-else>
    <span class="expand"></span>
    <span class="quote">"</span>
    <span class="key"></span>
    <span class="quote">"</span>
    <span class="colon">:</span>
    <span class="brace">{</span><span class="ellipsis"></span>
    <div class="item">
      <span class="string">"${value}"</span>
      <span class="number">${value}</span>
    </div>
    <span class="null">null</span>
    <span class="comma">,</span>
  </template>

</div>
</template>

<style scoped lang="less">

</style>
