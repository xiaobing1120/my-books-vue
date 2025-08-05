<script setup>
  import { ref, onMounted, reactive, watch } from 'vue'
  defineProps({
    msg: String,
  })
  const count = ref(0)
  const num = ref(0)
  let panner = reactive({
    pan: { value: -1 }
  })

  watch(num,(value) => {
    panner.pan.value = value
  })

  let audioContext = null
  let analyser = null
  let dataArray = null
  let canvas = null
  let ctx = null
  let source = null

  // 创建动画循环
  const draw = () => {
    requestAnimationFrame(draw);

    if(!analyser?.getByteFrequencyData){
      return
    }
    // console.log('dataArray', dataArray)

    // 获取音频数据
    analyser.getByteFrequencyData(dataArray);
    // analyser.getFloatFrequencyData(dataArray);

    // 检查是否有非零值
    const hasData = dataArray.some(value => value > 0)

    // console.log('hasData', hasData)
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置样式
    ctx.fillStyle = "#646cff";

    // 绘制频谱图
    const len = dataArray.length;
    const barWidth = canvas.width / len;

    // ctx.beginPath()
    for (let i = 0; i < len; i++) {
      const data = dataArray[i];
      const barHeight = (data / 2 ** 9) * canvas.height;
      // const barHeight = ((dataArray[i] + 100) / 100) * canvas.height; // 调整计算方式
      const x = i * barWidth;
      const y = canvas.height - barHeight;

      // 绘制矩形
      ctx.fillRect(x, y, barWidth, barHeight);

      /*if(y <= 0){
        return;
      }
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }*/
    }
    // ctx.stroke();

  }

  const onStart1 = () => {
    canvas = document.getElementById("audioCanvas");

    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    // canvas.width = window.innerWidth * devicePixelRatio;
    // canvas.height = (window.innerHeight / 2) * devicePixelRatio;
    canvas.width = 1000;
    canvas.height = 400;
    ctx = canvas.getContext("2d");

    navigator.mediaDevices.getUserMedia({ audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }})
      .then((stream) => {
        // 创建 AudioContext 对象
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        if (!audioContext) {
          console.error("Web Audio API is not supported in this browser");
          return;
        }

        console.log('AudioContext state:', audioContext.state);
        console.log('Microphone access granted ----------------------------------------');
        // 麦克风权限获取成功，stream 包含音频流数据
        console.log('222 stream', stream)

        const tracks = stream.getAudioTracks();
        console.log('tracks:', tracks);
        if (tracks.length === 0) {
          console.error('未检测到音频轨道');
          return;
        }
        console.log('音频轨道:', tracks[0]);
        console.log('音频设置:', tracks[0].getSettings());

        // 创建 MediaStreamSource
        source = audioContext.createMediaStreamSource(stream);
        console.log('Source created');

        // 创建 AnalyserNode
        analyser = audioContext.createAnalyser();
        console.log('Analyser created');

        // 设置 AnalyserNode 的参数
        analyser.fftSize = 2048; // 增加到2048
        analyser.smoothingTimeConstant = 0.8;


        console.log('Connected source to analyser');
        // 连接到 AudioContext
        source.connect(analyser);
        analyser.connect(audioContext.destination); // 可选：输出到扬声器
        // 创建动画循环
        const draw = () => {
          source.disconnect(analyser);
          requestAnimationFrame(draw);

          source.connect(analyser);
          const bufferLength = analyser.frequencyBinCount;
          // console.log('bufferLength:', bufferLength);

          dataArray = new Uint8Array(bufferLength);
          // console.log('dataArray created');

          // 获取音频数据
          analyser.getByteFrequencyData(dataArray);

          // 调试信息
          if (Date.now() % 1000 < 16) { // 每秒打印一次
            const sum = dataArray.reduce((a, b) => a + b, 0);
            // console.log('bufferLength:', bufferLength);
            // console.log('Data sum:', sum, 'First 10 values:', dataArray.slice(0, 10));
          }

          // 清空画布
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 设置样式
          ctx.fillStyle = "#646cff";

          // 绘制频谱图
          const len = dataArray.length;
          const barWidth = Math.max(1, canvas.width / len);

          let maxValue = 0;
          for (let i = 0; i < len; i++) {
            const data = dataArray[i];
            maxValue = Math.max(maxValue, data);
            const barHeight = (data / 255) * canvas.height;
            const x = i * barWidth;
            const y = canvas.height - barHeight;

            // 绘制矩形
            ctx.fillRect(x, y, barWidth, barHeight);
          }

          // 显示最大值（调试用）
          ctx.fillStyle = "white";
          ctx.font = "16px Arial";
          ctx.fillText(`Max: ${maxValue}`, 10, 30);
        }

        draw()

      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
        alert('无法访问麦克风：' + error.message);
      });
  }


  const onStart = () => {
    console.log('start')
    canvas = document.getElementById("audioCanvas");

    if (!canvas) {
      console.error('Canvas not found')
      return
    }
    // canvas.width = window.innerWidth * devicePixelRatio;
    // canvas.height = (window.innerHeight / 2) * devicePixelRatio;
    canvas.width = 1000;
    canvas.height = 400;
    ctx = canvas.getContext("2d");
  }

  // 开始播放
  const startAudioAnalysis = () => {

    if(audioContext) return;

    const video = document.getElementById('video')
    if (!video) {
      console.error('video element not found')
      return
    }

    // 创建 AudioContext 对象
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (!audioContext) {
      console.error("Web Audio API is not supported in this browser");
      return;
    }

    // 创建 MediaElementAudioSourceNode
    source = audioContext.createMediaElementSource(video)

    // 创建 AnalyserNode
    analyser = audioContext.createAnalyser();

    // 设置 AnalyserNode 的参数
    analyser.fftSize = 2 ** 9; // [32, 32768]
    analyser.smoothingTimeConstant = 0.8; // 添加平滑
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    // const dataArray = new Float32Array(bufferLength);

    panner = audioContext.createStereoPanner();
    panner.pan.value = -1; // 声音偏向左声道   -1  完全左声道,  1 完全右声道

    // 连接到 AudioContext
    source.connect(panner).connect(analyser);
    console.log('audioContext.destination', audioContext.destination)
    // 可选：输出到扬声器
    analyser.connect(audioContext.destination)

    draw()
  }

  onMounted(() => {
    onStart()
  })
</script>

<template>
  <h1>{{ msg }}</h1>
  <video id="video" src="../assets/崔子格-卜卦.mp3" controls autoplay @play="startAudioAnalysis"></video>
  <canvas id="audioCanvas"></canvas>

  {{num}}
  <input type="range" min="-1" max="1" step="0.1" v-model="num" >

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
