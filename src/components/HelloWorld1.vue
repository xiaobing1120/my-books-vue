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

      // 创建分析器节点
      const analyser = audioContext.value.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // 创建一个低通滤波器以去除高音（通常是人声的频率范围）
      const lowpassFilter = audioContext.value.createBiquadFilter();
      lowpassFilter.type = 'lowpass';
      lowpassFilter.frequency.value = 500; // 设置截止频率，根据需要调整

      // 创建高通滤波器（去除低频）
      const highpassFilter = audioContext.value.createBiquadFilter();
      highpassFilter.type = 'highpass';
      highpassFilter.frequency.value = 2000; // 截止频率为 3kHz

      // 创建带阻滤波器（去除中频）
      const bandstopFilter = audioContext.value.createBiquadFilter();
      bandstopFilter.type = 'notch'; // 带阻滤波器类型
      bandstopFilter.frequency.value = 1000; // 中心频率（人声主要频率范围）
      bandstopFilter.Q.value = 1; // 控制过滤范围（值越小，过滤范围越宽）

      // 创建新的音频源节点
      const source = audioContext.value.createBufferSource()
      source.buffer = audioBuffer.value

      // 连接到扬声器
      // source.connect(audioContext.value.destination)

      // 开始播放
      // source.start(0)


      source.connect(analyser);
      analyser.connect(bandstopFilter);
      bandstopFilter.connect(lowpassFilter);
      lowpassFilter.connect(highpassFilter);
      highpassFilter.connect(audioContext.value.destination);

      source.start(0, 100);

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

    audioBuffer.value = await audioContext.value.decodeAudioData(arrayBuffer)



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
