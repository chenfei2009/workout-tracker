<template>
  <div class="wt-timer">
    <div class="wt-timer--display">
      <a-progress type="circle" :percent="currentRate" />
      <!-- <van-circle
        v-model:current-rate="currentRate"
        :rate="30"
        :speed="100"
        size="220px"
        :stroke-width="60"
        layer-color="#eee"
      /> -->
      <!-- <tc-progress
        type="ring"
        tfcolor="success"
        :percent="percentage"
        :ringSize="220"
        :ringWidth="12"
        :dark="$store.getters.darkmode"
      /> -->
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
      >Stop</a-button>
      <a-button
        v-if="state === 0"
        round
        type="primary"
        @click="start"
      >Start</a-button>
      <a-button
        v-if="state === 1"
        round
        type="default"
        @click="pause"
      >Pause</a-button>
      <a-button
        v-if="state === 2"
        round
        type="default"
        @click="resume"
      >Resume</a-button>
    </div>
  </div>
</template>

<script setup>
const { onUnmounted, ref } = require('@vue/runtime-core')

const minutes = ref('00')
const seconds = ref('30')
const state = ref(0) // 0 = stop (not running), 1 = running, 2 = paused
const currentRate = ref(0)
let timer = 0
let goal = 0
let saved = []
let remaining = 0

onUnmounted(() => stop())

function changeSeconds () {
  const numbers = (seconds.value + '0').split('')
  if (+numbers[0] > 6) {
    seconds.value = +(seconds.value + '').substring(0, 1)
  } else if (+numbers[0] === 6 && +numbers[1] > 0) {
    seconds.value = +(seconds.value + '').substring(0, 1)
  } else {
    seconds.value = +(seconds.value + '').substring(0, 2)
  }
}

function changeMinutes () {
  // console.log(minutes.value)
  minutes.value = (minutes.value + '').substring(0, 3)
}

function start () {
  saved = [+minutes.value, +seconds.value]
  goal =
    new Date().getTime() + (+minutes.value * 60 + +seconds.value) * 1000
  run()
}

function stop () {
  minutes.value = saved[0]
  seconds.value = saved[1]
  pause()
  state.value = 0
  saved = []
  if (seconds.value <= 9) seconds.value = '0' + seconds.value
  if (minutes.value <= 9) minutes.value = '0' + minutes.value
  currentRate.value = 100
}

function pause () {
  clearInterval(timer)
  timer = 0
  state.value = 2
  remaining = goal - new Date().getTime()
}

function resume () {
  goal = new Date().getTime() + remaining
  run()
}

function run () {
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
      this.stop()
    }
  }, 10)
}

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
      top: 50%;
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
