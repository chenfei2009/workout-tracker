<template>
  <div class="wt-timer">
    <div class="wt-timer--display">
      <a-progress type="circle" :percent="currentRate" :width="200" :showInfo="false" />
      <div class="wt-timer--inputs">
        <input
          type="number"
          inputmode="numeric"
          min="0"
          :disabled="state !== 0"
          @input="changeMinutes"
          max="60"
          v-model="minutes"
        />
        <div>:</div>
        <input
          type="number"
          inputmode="numeric"
          min="0"
          :disabled="state !== 0"
          @input="changeSeconds"
          max="60"
          v-model="seconds"
        />
      </div>
    </div>
    <div class="wt-timer--buttons">
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
import { computed, onMounted, onUnmounted, ref } from 'vue'

const minutes = ref('00')
const seconds = ref('30')
const state = ref(0) // 0 = stop (not running), 1 = running, 2 = paused
const currentRate = ref(0)
let timer = 0
let goal = 0
let startTime = 0
let saved = []
let remaining = 0

const props = defineProps({
  recTime: Number
})

// input输入框修改
const changeSeconds = () => {
  // 修改目标值
  // goal = new Date().getTime() + (+minutes.value * 60 + +seconds.value) * 1000
  // console.log('修改目标值', goal)
  const numbers = (seconds.value + '0').split('')
  if (+numbers[0] > 6) {
    seconds.value = +(seconds.value + '').substring(0, 1)
  } else if (+numbers[0] === 6 && +numbers[1] > 0) {
    seconds.value = +(seconds.value + '').substring(0, 1)
  } else {
    seconds.value = +(seconds.value + '').substring(0, 2)
  }
}

// input输入框修改
const changeMinutes = () => {
  // 修改目标值
  // goal = new Date().getTime() + (+minutes.value * 60 + +seconds.value) * 1000
  // console.log('修改目标值', goal)
  minutes.value = (minutes.value + '').substring(0, 3)
}

const pause = () => {
  clearInterval(timer)
  timer = 0
  state.value = 2
  remaining = goal - new Date().getTime()
}

const stop = () => {
  minutes.value = saved[0]
  seconds.value = saved[1]
  pause()
  state.value = 0
  saved = []
  if (seconds.value <= 9) seconds.value = '0' + seconds.value
  if (minutes.value <= 9) minutes.value = '0' + minutes.value
  currentRate.value = 100
}

const run = () => {
  state.value = 1
  timer = setInterval(() => {
    const remaining = new Date().getTime() - goal
    if (remaining < 0) {
      const totalSeconds = Math.abs(Math.floor(remaining / 1000))
      currentRate.value =
        (totalSeconds / (saved[0] * 60 + saved[1])) * 100
      seconds.value = totalSeconds % 60
      minutes.value = Math.floor(totalSeconds / 60)
      if (seconds.value <= 9) seconds.value = '0' + seconds.value
      if (minutes.value <= 9) minutes.value = '0' + minutes.value
    } else {
      stop()
    }
  }, 10)
}

const start = () => {
  saved = [+minutes.value, +seconds.value]
  startTime = new Date().getTime()
  goal = new Date().getTime() + (+minutes.value * 60 + +seconds.value) * 1000
  run()
}

const resume = () => {
  goal = new Date().getTime() + remaining
  run()
}

onUnmounted(() => stop())

onMounted(() => {
  currentRate.value = 100
  goal = props.recTime
  if (goal < 60) seconds.value = goal
  else minutes.value = Math.floor(goal / 60)
})

// const remaining = minutes.value * 60 + seconds.value
const timeStat = computed(() => Math.floor((new Date().getTime() - startTime) / 1000))

defineExpose({timeStat})
</script>

<style lang="less" scoped>
.wt-timer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .wt-timer--display {
    position: relative;
    .wt-timer--inputs {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        font-size: 3em;
        font-weight: 500;
        margin-bottom: 8px;
      }
      input {
        &:first-child {
          text-align: right;
        }
        font: inherit;
        color: inherit;
        border: none;
        outline: none;
        background: none;
        width: 100px;
        font-size: 3em;
        font-weight: 700;
        padding: 0;
        margin: 0;
        -webkit-appearance: none;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        -moz-appearance: textfield;
      }
    }
  }
  .wt-timer--buttons {
    position: absolute;
    bottom: 20%;
    margin-top: 10px;
    width: 100px;
    display: flex;
    justify-content: center;
  }
}
</style>
