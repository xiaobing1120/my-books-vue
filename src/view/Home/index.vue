<script setup>
  import { onMounted, defineOptions, ref, watch } from 'vue'
  import JsonView from './JsonView.vue'
  defineOptions({
    name: 'Home'
  })

  const data = {
    "name": "John",
    "age": 30,
    "car": null,
    "a": {
      "bc": 123
    },
    "b": "{\"cd\":234}",
    "c": [
      {
        "a": "{\"c\":1}"
      }
    ]
  }

  const previewMode = ref(true)
  const jsonData = ref(JSON.stringify(data))
  const serializationJsonData = ref(data)

  const jSONParse = (str) => {
    return JSON.parse(str, (key, value) => {
      // 检查值是否为字符串且内容是有效的JSON
      if (typeof value === 'string') {
        console.log(333, value)
        try {
          // 尝试解析字符串为JSON
          const parsedValue = jSONParse(value);
          // 如果解析成功，返回解析后的对象
          return parsedValue;
        } catch (e) {
          // 如果解析失败，保持原值
          return value;
        }
      }
      // 非字符串值直接返回
      return value;
    })
  }

  onMounted(() => {
    console.log('Home')
  })

  /*watch(jsonData,() => {
    console.log(111, typeof jsonData.value)
    console.log(222, jsonData.value)
    serializationJsonData.value = jSONParse(jsonData.value)
  })*/

</script>

<template>
<!--  <h1>Home</h1>-->
  <div class="card">
    <div :key="1">
      <a-textarea
        v-model:value="jsonData"
        placeholder="Autosize height with minimum and maximum number of lines"
      />
    </div>
    <div :key="2">
<!--      <json-viewer
        :value="serializationJsonData"
        :expand-depth=100
        :copyable="{ copyText: '复制', copiedText: '复制成功' }"
        copyable
        boxed
        :sort="false"
        show-array-index
        expanded
        style="width: 100%; height: 100%"
        theme="my-awesome-json-theme"
      />-->
      <JsonView
        :value="jsonData"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.card{
  width: 100%;
  height: 100%;
  display: flex;
  padding: 26px;
  gap: 18px;
  > div{
    width: 50%;
    height: 100%;
    overflow-y: auto;
    .ant-input{
      height: 100%;
      font-size: 14px;
    }
    /deep/ .jv-more{
      display: none;
    }

  }
}


.my-awesome-json-theme {
  background: #fff;
  white-space: nowrap;
  color: #525252;
  font-family: Consolas, Menlo, Courier, monospace;

  /deep/ .jv-code {
    .jv-node{
      font-size: 14px;
      position: relative;

      // border-left: 1px dashed #bbb;
      span{
        font-size: 14px;
      }
      .jv-node{
        margin-left: 28px;
      }
    }
    .jv-toggle {
      &:before {
        padding: 0 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
    .jv-ellipsis {
      color: #999;
      background-color: #eee;
      display: inline-block;
      line-height: 0.9;
      font-size: 0.9em;
      padding: 0px 4px 2px 4px;
      border-radius: 3px;
      vertical-align: 2px;
      cursor: pointer;
      user-select: none;
    }
    .jv-button { color: #49b3ff }
    .jv-key { color: #111111 }
    .jv-item {
      &.jv-array { color: #111111 }
      &.jv-boolean { color: #fc1e70 }
      &.jv-function { color: #067bca }
      &.jv-number { color: #fc1e70 }
      &.jv-number-float { color: #fc1e70 }
      &.jv-number-integer { color: #fc1e70 }
      &.jv-object { color: #111111 }
      &.jv-undefined { color: #e08331 }
      &.jv-string {
        color: #42b983;
        word-break: break-word;
        white-space: normal;
      }
    }
  }

}
</style>
