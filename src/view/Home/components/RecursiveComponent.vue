<script setup>
  import { defineOptions, defineProps } from "vue";

  defineOptions({
    name: 'RecursiveComponent' // 组件名称
  })
  const props = defineProps({
    keyName: { type: String, required: false, default: () => '' },
    name: { type: String, required: false, default: () => '' },
    value: { type: [String, Number, Boolean, null], required: false, default: () => '' },
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
  <template v-if="jsonData && (isObject(jsonData) || isArray(jsonData))">
    <div>
      <span class="expand"></span>
      <span class="key" v-if="keyName">"{{ keyName }}"</span>
      <span class="colon" v-if="keyName">:</span>
      <span class="brace" v-if="isObject(jsonData)">{</span>
      <span class="brace" v-else>[</span>
      <span class="ellipsis"></span>
      <div class="kv-list">
        <template v-for="(item, index) in Object.keys(jsonData)">
          <RecursiveComponent
            v-if="isObject(jsonData[item])"
            :keyName="isArray(jsonData) ? '' : item"
            :jsonData="jsonData[item]"
            :first="index === 0"
            :last="isArray(jsonData) ? (jsonData.length - 1 === index) : Object.keys(jsonData).length -1 === index"
          />
          <template v-else-if="isArray(jsonData[item])">
            <RecursiveComponent
              :keyName="item"
              :jsonData="jsonData[item]"
            />
          </template>
          <RecursiveComponent
            v-else
            :name="item"
            :value="jsonData[item]"
            :first="index === 0"
            :last="Object.keys(jsonData).length -1 === index"
          />
          <!--          :first="index === 0"
                    :last="Object.keys(jsonData).length -1 === index"-->
        </template>
      </div>
      <span class="brace" v-if="isObject(jsonData)">}</span>
      <span class="brace" v-else>]</span>
      <span class="comma" v-if="!last">,</span>
    </div>
  </template>
  <template v-else-if="name || value">
    <div class="item" v-if="name || value">
      <span class="string">"{{ name }}"</span>
      <span class="colon">:</span>
      <span class="string" v-if="typeof value === 'string'">"{{ value }}"</span>
      <span class="number" v-else-if="typeof value === 'number'">{{ value }}</span>
      <span class="null" v-else-if="value === null || typeof value === 'boolean'">null</span>
      <span class="comma" v-if="!last">,</span>
    </div>

</template>

</template>

<style scoped lang="less">

</style>
