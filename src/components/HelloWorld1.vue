<script setup>
  import { ref, onMounted, reactive, watch } from 'vue'
  defineProps({
    msg: String,
  })
  const audioContext = ref(null)
  const audioBuffer = ref(null)

  const onStart = () => {
    try {
      // 检查 AudioContext 是否需要恢复（浏览器策略要求用户交互后才能播放音频）
      if (audioContext.value.state === 'suspended') {
        audioContext.value.resume()
      }

      // 创建新的音频源节点
      const newSource = audioContext.value.createBufferSource()
      newSource.buffer = audioBuffer.value

      // 连接到扬声器
      newSource.connect(audioContext.value.destination)

      // 开始播放
      newSource.start(0)

      console.log('音频开始播放')
    } catch (error) {
      console.error('播放音频时出错:', error)
    }
  }

  onMounted(async () => {

    const res = await fetch('/111.mp3')
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    // 将响应转换为 ArrayBuffer
    const arrayBuffer = await res.arrayBuffer();
    console.log('ArrayBuffer:', arrayBuffer)

    if(!audioContext.value) {
      audioContext.value = new (window.AudioContext || window.webkitAudioContext)
    }

    console.log('audioContext.value:', audioContext.value)

    // 解码音频数据
    // audioBuffer.value = await audioContext.value.decodeAudioData(arrayBuffer);

    audioContext.value.decodeAudioData(arrayBuffer).then(res => {
      console.log('解码后的音频缓冲区:', res)
      audioBuffer.value = res
    })

    console.log('解码后的音频缓冲区:', audioBuffer.value)

    console.log('音频加载完成，点击 "onStart" 按钮播放')



  })
</script>

<template>
<!--  <video id="video" src="../assets/111.mp3" controls autoplay @play="startAudioAnalysis"></video>-->
  {{num}}
  <input type="range" min="-1" max="1" step="0.1" v-model="num" >
  <canvas id="audioCanvas"></canvas>

<p id="playButton">111</p>
  <strong @click="onStart">onStart</strong>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
