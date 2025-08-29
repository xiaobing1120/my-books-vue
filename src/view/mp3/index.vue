<script setup>
  import { onMounted, defineOptions, reactive, ref } from 'vue'
  let lyrics = reactive([])
  let time = ref(0)

  defineOptions({
    name: 'Mp3'
  })
  onMounted(() => {
    fetch('/666.lrc')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const decoder = new TextDecoder('gbk'); // 指定编码格式
        let text = decoder.decode(buffer);
        console.log(text)
        text = text.replaceAll('\r', '').split('\n').filter(item => item !== "")
        text = text.map(item => {
          const seconds = item.match(/\[\d{2}:(\d{2}\.\d{2})\]/)
          if(seconds){
            return {
              second: Number(seconds[1]),
              text: item.replace(/\[\d{2}:(\d{2}\.\d{2})\]/, '')
            }
          }
          return {
            second: 0,
            text: item.replace(/[\[\]]/g, '')
          }
        })
        lyrics.push(...text)
        console.log(lyrics)
      })
    console.log('Test')
  })

  const onPlay = () => {
    console.log('视频开始播放')
  }

  const onPause = () => {
    console.log('视频暂停')
  }

  const onTimeUpdate = (event) => {
    const video = event.target
    time.value = video.currentTime
    console.log('当前播放时间:', video.currentTime)
  }

  const onEnded = () => {
    console.log('视频播放完毕')
  }

</script>

<template>
  <h1>1</h1>
  <video
    src="/666.mp3"
    controls
    id="video"
    @play="onPlay"
    @pause="onPause"
    @timeupdate="onTimeUpdate"
    @ended="onEnded"
  />
  {{ lyrics }}

  <ul v-if="lyrics.length > 0">
    <li v-if="time >= item.second" v-for="(item, index) in lyrics" :key="index">
      {{ item.second }} --- {{ item.text }}
    </li>
  </ul>
</template>

<style scoped lang="less">

</style>
