<template>
  <div class="wt-stopwatch">
    <div class="wt-stopwatch--display">
      <div v-for="(l, i) in display" :key="i">{{ l }}</div>
    </div>
    <div class="wt-stopwatch--buttons">
      <a-button
        :disabled="state === 0"
        round
        type="danger"
        @click="stop"
      >清零</a-button>
      <a-button
        v-if="state === 0"
        round
        type="primary"
        @click="start"
      >开始</a-button>
      <a-button
        v-if="state === 1"
        round
        type="default"
        @click="pause"
      >暂停</a-button>
      <a-button
        v-if="state === 2"
        round
        type="default"
        @click="resume"
      >继续</a-button>
    </div>
  </div>
</template>

<script setup>
import { anHour, aMinute, aSecond } from '@/utils/constants'
import { computed, onUnmounted, ref } from 'vue'

const state = ref(0) // 0 = stop (not running), 1 = running, 2 = paused
const timestamp = ref(0)
const display = ref('00:00,00')
const previousTime = ref(0)

let stopwatch = null

onUnmounted(() => stop())


const run = () => {
  state.value = 1
  stopwatch = setInterval(() => {
    const now = new Date().getTime()
    const dif = now - timestamp.value
    const hours = Math.floor(dif / anHour)
    const minutes = Math.floor((dif - hours * anHour) / aMinute)
    const seconds = Math.floor(
      (dif - hours * anHour - minutes * aMinute) / aSecond
    )
    const milliseconds = dif % 1000

    let displayTemp = ''
    if (hours > 0) {
      displayTemp += (hours < 10 ? '0' : '') + hours + ':'
    }
    displayTemp += (minutes < 10 ? '0' : '') + minutes + ':'
    displayTemp += (seconds < 10 ? '0' : '') + seconds + ','
    displayTemp += (milliseconds + '00').substring(0, 2)
    display.value = displayTemp
  }, 10)
}

const start = () => {
  timestamp.value = new Date().getTime()
  run()
}

const pause = () => {
  clearInterval(stopwatch)
  stopwatch = null
  state.value = 2
  previousTime.value = new Date().getTime() - timestamp.value
}

const stop = () => {
  pause()
  state.value = 0
  display.value = '00:00,00'
  previousTime.value = 0
}

const resume = () => {
  timestamp.value = new Date().getTime() - previousTime.value
  run()
}

const timeStat = computed(() => Math.floor((new Date().getTime() - timestamp.value) / 1000))
defineExpose({timeStat})
</script>

<style lang="less" scoped>
.wt-stopwatch {
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .wt-stopwatch--display {
    font-size: 3em;
    font-weight: 700;
    display: inline-flex;
    div {
      width: 32px;
      text-align: center;
      &:nth-child(3n) {
        width: 15px;
      }
    }
  }
  .wt-stopwatch--buttons {
    margin-top: 10px;
    width: 220px;
    display: flex;
    justify-content: space-between;
    .van-button {
      width: 105px;
      height: 30px;
    }
  }
}
</style>
