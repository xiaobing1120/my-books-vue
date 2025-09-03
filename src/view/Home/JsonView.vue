<script setup>
  import $ from 'jquery'
  import { onMounted, defineOptions, defineProps, ref, watch, reactive } from 'vue'
  import RecursiveComponent from './components/RecursiveComponent.vue'

  defineOptions({ name: 'JsonView' })

  // 父组件参数
  const props = defineProps({
    value: { type: String, default: () => '' }
  })
  let jsonData = reactive({})
  let htmlData = ref('')

  onMounted(() => {
     console.log(';this.value-----------------', props.value)
    $('body').on('click', '.expand', function () {
      $(this).toggleClass('hover').parent().find('.kv-list').slideToggle().siblings('.ellipsis').fadeToggle()
    })
  })

  // 是否是数组
  const isArray = (data) => {
    return Object.prototype.toString.call(data) ===  '[object Array]'
  }
  // 是否是对象
  const isObject = (data) => {
    return Object.prototype.toString.call(data) ===  '[object Object]'
  }

  const fnItem = (key,value) => {
    return `
      <div class="item">
        ${isObject(value) ? '<span class="expand"></span>' : ''}
        ${isArray(value) ? '<span class="expand"></span>' : ''}
        <span class="quote">"</span>
        <span class="key">${key}</span>
        <span class="quote">"</span>
        <span class="colon">:</span>
        ${isObject(value) ? '<span class="brace">{</span><span class="ellipsis"></span>' : ''}
        ${isArray(value) ? '<span class="brace">[</span><span class="ellipsis"></span>' : ''}
        ${typeof value === 'object' ? fnObject(value, false) : ''}
        ${typeof value === 'string' ? `<span class="string">"${value}"</span>` : ''}
        ${typeof value === 'number' ? `<span class="number">${value}</span>` : ''}
        ${value === null  ? `<span class="null">null</span>` : ''}

        ${(!isObject(value) && !isArray(value)) ? '<span class="comma">,</span>' : ''}
      </div>
    `
  }

  const fnObject = (data, isChild) => {
    if(isObject(data)){
      return `
        ${isChild ? `
          <span class="expand"></span>
          <span class="brace">{</span>
          <span class="ellipsis"></span>
        ` : ''}
        <div class="kv-list item">${Object.keys(data).map(key => fnItem(key, data[key])).join('')}</div>
        <span class="brace">}</span>
        <span class="comma">,</span>
      `
    }
    if(isArray(data)){
      return `
        ${isChild ? `
          <span class="expand"></span>
          <span class="brace">[</span>
          <span class="ellipsis"></span>
        ` : ''}
          <div class="kv-list item">${data.map(item => fnObject(item, true)).map(item => `<div class="item">${item}</div>`)}</div>
          <span class="brace">]</span>
          <span class="comma">,</span>
      `
    }
    return ''
  }

  const createHtml = (res) => {
    // Object.prototype.toString.call({})
    // '[object Object]'  '[object Array]' '[object Number]' '[object String]'
    // '[object Undefined]' '[object Boolean]'  '[object Null]'
    return fnObject(res, true)
  }

  watch(() => props.value, (value) => {
    if (!value) return
    try{
      let newValue = value.trim();
      // 2. 处理单引号
      newValue = newValue.replace(/'/g, '"');
      // 3. 处理未加引号的键名 (更严格的正则)
      newValue = newValue.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');
      // 4. 移除尾部逗号
      newValue = newValue.replace(/,\s*([}\]])/g, '$1');

      jsonData = jSONParse(newValue)
      // htmlData.value = createHtml(jsonData)
    }catch (e) {
      console.error(e)
    }
  })

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


</script>

<template>
  <div class="json-view">
<!--    <div v-html="htmlData" class="json-view-main"></div>-->
    <div class="json-view-main">
<!--      <RecursiveComponent :json-data="jsonData" />-->
      <template v-if="jsonData && isObject(jsonData)">
        <div class="list">
          <template v-for="(item, index) in Object.keys(jsonData)">
            <RecursiveComponent
              v-if="isObject(jsonData[item])"
              :keyName="item"
              :json-data="jsonData[item]"
            />
            <!--        <RecursiveComponent
                      v-else-if="isArray(jsonData[item])"
                      :keyName="item"
                      :isArr="true"
                      :json-data="jsonData[item]"
                    />-->
            <RecursiveComponent
              v-else
              :name="item"
              :value="jsonData[item]"
              :first="index === 0"
              :last="Object.keys(jsonData).length -1 === index"
            />

          </template>
        </div>
      </template>

    </div>
<!--    <template v-if="jsonData && isObject(jsonData)">
      <template v-for="(item, index) in Object.keys(jsonData)">
&lt;!&ndash;        <RecursiveComponent
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
        />&ndash;&gt;
        <RecursiveComponent
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
    </template>-->
  </div>
</template>

<style  lang="less">
.json-view{
  width: 100%;
  color: #666;
}
.json-view-main{
  font-family: Arial, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #444;
  font-size: 0;
  .expand{
    display: inline-block;
    width: 20px;
    height: 15px;
    opacity: .3;
    margin-left: -20px;
    cursor: pointer;
    &::before{
      content: "";
      display: block;
      width: 15px;
      height: 15px;
      margin: 0 auto;
      background: url("../../assets/arrow-down1.png") no-repeat center;
      background-size: 15px 15px;
      transition: all .3s ;
    }
    &.hover{
      &::before{
        transform: rotate(-90deg);
      }
    }
  }
  >div{
    span{
      font: 14px / 18px monospace;
      display: inline-block;
    }
    .brace{
      font-weight: bold;
    }
    .list{
      padding-left: 20px;
    }
    .item{
      padding-left: 20px;
      border-left: 1px dashed #999;
    }
    .kv-list{
      padding-left: 0;
      border-left: 0;
    }
    .number, .null, .undefined{
      font-weight: bold;
    }
    .number{
      color: #1a01cc;
    }
    .string{
      color: #0b7500;
    }
    .null{
      color: #ff6b00;
    }

    .ellipsis{
      display: none;
      &::before{
        content: "...";
      }
    }
  }
}
</style>
