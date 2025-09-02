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
    jsonData: { type: [Array, Object], required: false, default: () => undefined },
    isArr: { type: Boolean, required: false, default: () => false },
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
  <template v-if="jsonData && isObject(jsonData)">
    <div class="list">
      <template v-for="(item, index) in Object.keys(jsonData)">
        <RecursiveComponent
          v-if="isObject(jsonData[item])"
          :keyName="item"
          :json-data="jsonData[item]"
        />
        <RecursiveComponent
          v-else-if="isArray(jsonData[item])"
          :keyName="item"
          :isArr="true"
          :json-data="jsonData[item]"
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
    </div>
  </template>
<!--  <template v-else-if="jsonData && isArray(jsonData)">
    <template v-for="(item, index) in jsonData">
      <RecursiveComponent
        :json-data="item"
      />
    </template>
  </template>-->
  <template v-else>
    <span class="expand" v-if="keyName && first"></span>
    <span class="quote" v-if="keyName && first">"</span>
    <span class="key" v-if="keyName && first">{{ keyName }}</span>
    <span class="quote" v-if="keyName && first">"</span>
    <span class="colon" v-if="keyName && first">:</span>
    <span class="brace" v-if="first">{</span>
    <span class="ellipsis" v-if="keyName && first"></span>
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

</template>

<style scoped lang="less">

</style>
