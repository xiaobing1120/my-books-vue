<script setup>
  import { onMounted, defineOptions, defineProps, ref, watch, reactive } from 'vue'
  defineOptions({ name: 'JsonView' })

  // 父组件参数
  const props = defineProps({
    value: { type: String, default: () => '' }
  })
  let jsonData = reactive({})
  let htmlData = ref('')

  const isArray = (data) => {
    return Object.prototype.toString.call(data) ===  '[object Array]'
  }
  const isObject = (data) => {
    return Object.prototype.toString.call(data) ===  '[object Object]'
  }

  const createHtml = (data) => {
    // Object.prototype.toString.call({})
    // '[object Object]'  '[object Array]' '[object Number]' '[object String]'
    // '[object Undefined]' '[object Boolean]'  '[object Null]'
    const fn = () => {
      return Object.keys(data).map(key => {
        return `
          ${}
          <div class="item">
            <span class="quote">"</span>
            <span class="key">${key}</span>
            <span class="quote">"</span>
            <span class="colon">:</span>
            ${typeof data[key] === 'string' ? `<span class="string">${data[key]}</span>` : ''}
            ${typeof data[key] === 'number' ? `<span class="number">${data[key]}</span>` : ''}
            ${data[key] === undefined ? `<span class="undefined">${data[key]}</span>` : ''}
            ${data[key] === null  ? `<span class="null">${data[key]}</span>` : ''}
            <span class="comma">,</span>
          </div>
        `
      })
    }

  }


  watch(() => props.value, (newValue) => {
    if (!newValue) return
    try{
      jsonData = jSONParse(newValue)
      htmlData.value = createHtml(jsonData).join('')
      console.log(typeof jsonData)
      console.log(Array.isArray(jsonData))
      console.log(jsonData)
    }catch (e) {
      console.error(e)
    }
  })

  // json 格式化
  const jSONParse = (str) => {
    return JSON.parse(str, (key, value) => {
      // 检查值是否为字符串且内容是有效的JSON
      if (typeof value === 'string') {
        // console.log(333, value)
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

</script>

<template>
  <div class="json-view">
    <div v-html="htmlData"></div>
  </div>
</template>

<style scoped lang="less">
.json-view{
  width: 100%;
  color: #666;
}
</style>
