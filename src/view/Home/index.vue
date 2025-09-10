<script setup>
  import {onMounted, defineOptions, ref, watch, reactive} from 'vue'
  import JsonView from './components/JsonView.vue'
  defineOptions({
    name: 'Home'
  })

  const data = {
    "name": "John123",
    "abc": {
      "a": 1
    },
    "def": [
      1,
      2,
      3,
      4,
      5,
      {
        "ghi": "123456"
      },
      [6,7,8,9,10]
    ]
  }

  const value = ref(JSON.stringify(data))
  let jsonData = reactive({})



  // json 格式化
  const jSONParse = (str) => {
    return JSON.parse(str, (key, value) => {
      // 检查值是否为字符串且内容是有效的JSON
      if (typeof value === 'string') {
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

  watch(value, (newValue) => {
    console.log('newValue', newValue)
    if (!newValue) return
    try{
      let processedValue = newValue.trim();
      // 2. 处理单引号
      processedValue = processedValue.replace(/'/g, '"');
      // 3. 处理未加引号的键名 (更严格的正则)
      processedValue = processedValue.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');
      // 4. 移除尾部逗号
      processedValue = processedValue.replace(/,\s*([}\]])/g, '$1');

      jsonData = jSONParse(processedValue)
      console.log(jsonData, 111)
      // htmlData.value = createHtml(jsonData)
    }catch (e) {
      console.error(e)
    }
  })

  onMounted(() => {
    console.log('Home')
  })
</script>

<template>
  <div class="card">
    <div :key="1">
      <a-textarea
        v-model:value="value"
        placeholder="Autosize height with minimum and maximum number of lines"
      />
    </div>
    <div :key="2">
      <div class="json-view">
        <div class="json-view-main">
          <JsonView :jsonData="jsonData" />
        </div>
      </div>
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

  }
}

</style>
