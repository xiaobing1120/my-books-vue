<script setup>
  import { onMounted, defineOptions, ref, watch } from 'vue'
  defineOptions({
    name: 'Home'
  })

  const jsonData = ref('{"name":"John","age":30,"car":null}')
  const serializationJsonData = ref({"name":"John","age":30,"car":null, a: "{b: '123'}"})

  onMounted(() => {
    console.log('Home')
  })

  watch(jsonData,() => {
    console.log(111, typeof jsonData.value)
    console.log(222, jsonData.value)
    serializationJsonData.value = JSON.parse(JSON.parse(JSON.stringify(JSON.stringify(jsonData.value)), (key, value) => {
      // 检查值是否为字符串且内容是有效的JSON
      if (typeof value === 'string') {
        try {
          // 尝试解析字符串为JSON
          const parsedValue = JSON.parse(value);
          // 如果解析成功，返回解析后的对象
          return parsedValue;
        } catch (e) {
          // 如果解析失败，保持原值
          return value;
        }
      }
      // 非字符串值直接返回
      return value;
    }))
  })


</script>

<template>
<!--  <h1>Home</h1>-->
  <div class="card">
    <div :key="1">
      <a-textarea
        v-model:value="jsonData"
        placeholder="Autosize height with minimum and maximum number of lines"
        :auto-size="{ minRows: 50, maxRows: 5 }"
      />
    </div>
    <div :key="2">
      <json-viewer
        :value="serializationJsonData"
        :expand-depth=5
        copyable
        boxed
        sort
        show-array-index
        style="width: 100%"
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
  div{
    width: 50%;
  }
}
</style>
