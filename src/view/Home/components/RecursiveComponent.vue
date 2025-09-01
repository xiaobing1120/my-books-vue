<script setup>
  import { defineOptions, defineProps } from "vue";

  defineOptions({
    name: 'RecursiveComponent' // 组件名称
  })
  defineProps({
    keyName: { type: String, required: false, default: () => '' },
    name: { type: String, required: false, default: () => '' },
    value: { type: String, required: false, default: () => '' },
    first: { type: Boolean, required: false, default: () => false },
    last: { type: Boolean, required: false, default: () => false },
    jsonData: { type: [Array, Object], required: false, default: () => undefined }
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
  <template v-if="jsonData && isObject(jsonData)">
    <template v-for="(item, index) in Object.keys(jsonData)">
      <RecursiveComponent
        v-if="isObject(jsonData[item]) || isArray(jsonData[item])"
        :keyName="item"
        :jsonData="jsonData[item]"
      />
      <RecursiveComponent
        v-else
        :keyName="keyName"
        :name="item"
        :value="jsonData[item]"
        :first="index === 0"
        :last="Object.keys(jsonData).length -1 === index"
      />
    </template>
  </template>
  <template v-else-if="jsonData && isArray(jsonData)">
    <RecursiveComponent
      v-for="item in jsonData"
      :json-data="jsonData[item]"
    />
  </template>
  <template v-else>
    <span class="expand"></span>
    <span class="quote" v-if="keyName">"</span>
    <span class="key" v-if="keyName">{{ keyName }}</span>
    <span class="quote" v-if="keyName">"</span>
    <span class="colon" v-if="keyName">:</span>
    <span class="brace" v-if="first">{</span><span class="ellipsis"></span>
    <div class="item" v-if="name || value">
      <span class="string">"{{ name }}"</span>
      <span class="colon">:</span>
      <span class="number" v-if="typeof value === 'number'">{{ value }}</span>
      <span class="string" v-else-if="typeof value === 'string'">"{{ value }}"</span>
      <span class="null" v-else-if="value === null || typeof value === 'boolean'">null</span>
      <span class="comma">,</span>
    </div>
    <span class="brace" v-if="last">}</span>
    <span class="comma" v-if="last">,</span>
  </template>

</div>
</template>

<style scoped lang="less">

</style>
