<script setup>
import { ref, onMounted } from 'vue'
defineProps({
  msg: String,
})

const count = ref(0)



onMounted(() => {
  const canvas = document.getElementById("audioCanvas");
  const ctx = canvas.getContext("2d");
  console.log('canvas', canvas)

  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = (window.innerHeight / 2) * devicePixelRatio;

  // 创建 AudioContext 对象
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  if (!audioContext) {
    console.error("Web Audio API is not supported in this browser");
    return;
  }



  // 获取用户麦克风权限
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      // 麦克风权限获取成功，stream 包含音频流数据
      console.log('stream', stream)
      // 创建 MediaStreamSource
      const source = audioContext.createMediaStreamSource(stream);

      // 创建 AnalyserNode
      const analyser = audioContext.createAnalyser();

      // 设置 AnalyserNode 的参数
      analyser.fftSize = 2 ** 10;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // 连接到 AudioContext
      source.connect(analyser);
      analyser.connect(audioContext.destination);


      // 创建动画循环
      const draw = () => {
        requestAnimationFrame(draw);

        // 获取音频数据
        analyser.getByteFrequencyData(dataArray);

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 设置样式
        ctx.fillStyle = "#646cff";

        // 绘制频谱图
        const len = dataArray.length;
        const barWidth = canvas.width / len;

        for (let i = 0; i < len; i++) {
          const data = dataArray[i];
          const barHeight = (data / 2 ** 9) * canvas.height;
          const x = i * barWidth;
          const y = canvas.height - barHeight;

          // 绘制矩形
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      }

      draw(ctx, analyser)

    })
    .catch((error) => {
      console.error('Error accessing microphone:', error);
    });

})


</script>

<template>
  <h1>{{ msg }}</h1>
  <canvas id="audioCanvas"></canvas>

  <img src="../assets/vue.svg" />
  <video src="../assets/崔子格-卜卦.mp3" controls autoplay></video>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
