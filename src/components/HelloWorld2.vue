<script setup>
  import { ref, onMounted, reactive, watch } from 'vue'
  defineProps({
    msg: String,
  })
  const audioContext = ref(null)
  const audioBuffer = ref(null)


  onMounted(async () => {

  })
</script>

<template>
  <div class="card">
    <p>甲方: {{ mag }}</p>
    <p>乙方: {{ mag }}</p>
    <p>为确保双方经济利益，根据《中华人民共和国合同法》,经甲乙双方充分协商同 意，特订立本合同，以便共同遵守。</p>
    <p>一.产品清单及报价</p>
    <p>二.结算方式：全款</p>
    <p>三 . 维修地点：乙方提供的地址或甲方厂区</p>
    <p>四 . 签订时间：2025年7月28日</p>
    <p>合同生效</p>
    <p>1. 本合同自甲乙双方签字盖章之日起生效，传真件和复印件具有同等法律效力。</p>
    <p>2. 本合同一式两份，甲方一份，乙方一份，自双方代表签字，并双方加盖公章  之日起生效。</p>


    <ul>
      <li>
        <p>甲方(供方):郑州赛浪智能装备有限公司</p>
        <p>银行账号：1702 12130 9200 212361</p>
        <p>开户行：工行郑州科学大道支行</p>
        <p>税号：914 10100 MA9KR B7L5G</p>
        <p>联系电话：19838088188</p>
        <p>地址：河南省郑州市高新区莲花街55号威科姆大厦A座10楼1008</p>
        <p>甲方代表签字：张朕旗</p>
        <p>日期：2025.07.28</p>
      </li>
      <li>
        <p>乙方(需方):开封政翰粮油机械有限公司</p>
        <p>银行账号：104492103273</p>
        <p>开户行：中国银行杞县支行</p>
        <p>税号：91410221593449291A</p>
        <p>联系电话：13903816579</p>
        <p>地址：杞县宗店乡政府前街西段路北</p>
        <p>乙方代表签字：</p>
        <p>日 期 ：</p>
      </li>
    </ul>


  </div>
</template>

<style scoped lang="less">
.card {
  width: 800px;
  background: #f8dddd;
  text-align: left;
  ul{
    display: flex;
    li{
      width: 50%;
      list-style: none;
    }
  }

}
</style>
