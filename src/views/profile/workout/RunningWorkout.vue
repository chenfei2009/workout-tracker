<template>
  <div class="view-running-workout">
    <WTTransition>
      <WTBanner
        :key="index"
        v-if="dataLoaded"
        :title="state.exercises[index].title"
        subTitle="正在训练"
      >
        <template v-slot:media>
          <img :src="state.exercises[index].thumbnail" alt="" />
        </template>
        <div>31 分钟  |  初级</div>
      </WTBanner>
    </WTTransition>
    <div class="index" v-if="dataLoaded">
      <span>{{ index + 1 }}</span>
      <span>/</span>
      <span>{{ state.exercises.length }}</span>
    </div>

    <div content max-width v-if="dataLoaded">
      <div class="timer-wrapper">
        <div class="tag">总用时</div>
        <transition-group class="timer" name="timer" tag="ul">
          <li
            v-for="(t, i) in time"
            :key="t + '_' + i"
            :sep="t === ':'"
          >{{ t }}</li>
        </transition-group>
      </div>

      <WTTransition>
        <div :key="index" class="sets-reps">
          <div class="timer-wrapper ex">
            <div class="tag">当前动作用时</div>
            <transition-group class="timer" name="timer" tag="ul">
              <li v-for="(t, i) in timeEx" :key="t + '_' + i" :sep="t === ':'">
                {{ t }}
              </li>
            </transition-group>
          </div>
          <div class="info">
            <span>Tips: 推荐组数 {{state.exercises[index].sets}}</span>
            <span> 推荐次数 {{state.exercises[index].reps}}</span>
          </div>
          <WTRunningTable ref="tableRef" :type="type"/>
        </div>
      </WTTransition>

      <div class="action-wrapper">
        <a-button
          shape="round"
          v-if="index === 0"
          @click="cancel"
        >
          <span class="iconfont icon-stop"></span>
          结束训练
        </a-button>
        <a-button
          shape="round"
          v-else
          @click="prev"
        >
          <span class="iconfont icon-arrow-left-bold"></span>
          上一动作
        </a-button>
        <a-button
          shape="round"
          v-if="index < state.exercises.length - 1"
          @click="next">
          <span class="iconfont icon-arrow-right-bold"></span>
          下一动作
        </a-button>
        <a-button
          shape="round"
          v-else
          @click="save"
        >完成训练</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { computed, onMounted, onUnmounted, watch } from 'vue'

import WTTransition from '@/components/WTTransition.vue'
import WTBanner from '@/components/WTBanner.vue'
import WTRunningTable from '@/components/forms/WTRunningTable.vue'
import { aMinute, anHour, aSecond } from '@/utils/constants'
import { closeFullscreen } from '@/utils/fullScreen'
import { RunningWorkout } from '@/utils/WorkoutManager'

const startTime = ref(0)

const state = reactive({
  exercises: [],
  stats: []
})

const tableRef = ref()

const index = ref(0)
const time = ref([0, 0, ':', 0, 0, ':', 0, 0])
const timeEx = ref([0, 0, ':', 0, 0, ':', 0, 0])
const timer = ref(0)

const dataLoaded = computed(() => {
  return ( // true
    state.exercises &&
    state.exercises.length > 0 &&
    startTime.value > 0 &&
    state.stats &&
    state.stats.length > 0
  )
})

// 'gym' | 'distance' | 'time'
const type = computed(() => {
  const { reps, time } = state.exercises[index.value]
  if (reps) return 'gym'
  if (time) return 'time'
  return 'distance'
})

// 监听 index 的变化
watch(
  () => index.value,
  (val, preVal) => indexChanged(val, preVal),
  { immediate: true }
)

onMounted(() => {
  if (!RunningWorkout.hasActiveWorkout()) {
    closeFullscreen('Workouts')
  }
  state.exercises = RunningWorkout.getExercises()
  startTime.value = RunningWorkout.getStartTime()
  state.stats = RunningWorkout.getStats()
  updateTime()
  timer.value = setInterval(updateTime, 1000)
  indexChanged(0, undefined)
})

onUnmounted(() => {
  clearInterval(timer.value)
})

/**
 * @param {number} ms
 * @returns {array} string[]
 */
function getHMS (ms) {
  return [
    ...('0' + Math.floor((ms / anHour) % 24) + ':').slice(-3).split(''),
    ...('0' + Math.floor((ms / aMinute) % 60) + ':').slice(-3).split(''),
    ...('0' + Math.floor((ms / aSecond) % 60)).slice(-2).split('')
  ]
}

function updateTime () {
  time.value = getHMS(new Date().getTime() - startTime.value)
  const stat = state.stats[index.value]
  if (stat) {
    timeEx.value = getHMS(
      new Date().getTime() - stat.start + stat.duration
    )
  }
}

/**
 * @param {number | undefined} to
 * @param {number | undefined} from
 */
function indexChanged (to, from) {
  console.log('indexChanged', 'from', from, 'to', to)
  if (!state.stats || state.stats.length === 0) return

  if (to !== undefined) {
    const statTo = state.stats[to]
    if (statTo.start === -1) {
      statTo.start = new Date().getTime()
    }
    console.log('reset statTo', statTo.duration)
  }
  if (from !== undefined) {
    const statFrom = state.stats[from]
    statFrom.duration += new Date().getTime() - statFrom.start
    statFrom.start = -1
    console.log('reset statFrom', statFrom.duration)
  }

  RunningWorkout.saveStats(state.stats)

  updateTime()
}

/* 缓存训练数据 */
function setWeightReps () {
  // 保存成数组？ 本地存储后丢失 exercise 属性
  // 转换成对象
  // const stats = Object.assign({}, tableRef.value.dataSource.filter(x => x.isDone))
  // stats.exercise = state.exercises[index.value]._id
  // WorkoutManagement.saveStats(stats)
  // const dataSource = tableRef.value.dataSource.filter(x => x.reps > 0 && x.isDone)
  // dataSource.forEach(x => {
  //   state.stats[index.value].reps.push(x.reps)
  //   state.stats[index.value].weights.push(x.weight)
  //   WorkoutManagement.saveStats(state.stats)
  // })
  const dataSource = tableRef.value.dataSource.filter(x => x.reps > 0 && x.isDone)
  state.stats[index.value].reps = dataSource.map(x => x.reps)
  state.stats[index.value].weights = dataSource.map(x => x.weight)
  RunningWorkout.saveStats(state.stats)
}

/* 缓存时间数据 */
// function setTime () {
//   if (exTime.value && exTimeUnit.value && exTimeUnit.value.length > 0) {
//     switch (exTimeUnit.value) {
//       case 'Hours':
//         exTime.value *= anHour
//         break
//       case 'Minutes':
//         exTime.value *= aMinute
//         break
//       default:
//         exTime.value *= aSecond
//         break
//     }
//     if (exTime.value > 0) {
//       state.stats[index.value].time = exTime
//       WorkoutManagement.saveStats(state.stats)
//     }
//     exTime.value = 0
//   }
// }

/* 切换下一个动作 */
function next () {
  // 保存当前训练记录
  setWeightReps()
  // 切换动作
  index.value = Math.min(state.exercises.length, index.value + 1)
}

/* 切换上一个动作 */
function prev () {
  // 保存当前训练记录
  setWeightReps()
  // 切换动作
  index.value = Math.max(0, index.value - 1)
}

/* 结束训练，不保存数据 */
function cancel () {
  RunningWorkout.clearActiveWorkout()
}

/* 保存训练，提交数据 */
function save () {
  // 保存当前训练记录
  setWeightReps()
  indexChanged(0, index.value)
  // 清空定时器
  clearInterval(timer.value)
  RunningWorkout.saveWorkout(state.stats)
}

</script>

<style lang="less" scoped>
.view-running-workout {
  min-height: 100vh;

  [content] {
    padding-top: 20px;
    padding-bottom: calc(70px + env(safe-area-inset-bottom));
  }

  .index {
    // margin-top: -50px;
    position: absolute;
    right: 0;
    transform: translateY(-100%);
    color: #fff;
    .backdrop-blur(@success);
    padding: 5px 5vw 5px 20px;
    border-radius: 15px 0 0;
    span {
      font-size: 1.4em;
      font-weight: 800;
      &:first-child {
        font-weight: bold;
        opacity: 0.6;
        font-size: 1.2em;
      }
    }
  }

  .timer-wrapper {
    position: relative;
    padding: 5px;
    margin-bottom: 20px;
    border-radius: @border-radius;
    background: @color_dark;
    // @media #{$isDark} {
    //   background: $color;
    // }
    .tag {
      position: absolute;
      left: 10px;
      top: 5px;
    }
    .timer {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 5px;
      li {
        font-weight: 900;
        font-size: 2.6em;
        text-align: center;
        width: 28px;
        &:nth-child(3n) {
          color: @success;
        }
        &[sep] {
          width: 20px;
        }
      }
    }
    &.ex {
      opacity: 0.75;
      width: fit-content;
      padding: 5px 10px 5px 100px;
      margin-left: auto;
      .timer {
        li {
          font-size: 18px;
          width: 12px;
          &[sep] {
            width: 10px;
          }
        }
      }
    }
  }

  .action-wrapper {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    // padding: 0 5vw env(safe-area-inset-bottom);
    padding: 15px;
    height: 80px;
    z-index: 99;

    // @media (@isDark) {
    //   @include backdrop-blur(@color);
    // }

    // display: flex;
    // justify-content: center;
    // align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .ant-btn {
      height: 40px;
      font-size: 1.2rem;
      color: #eee;
      background-color: rgb(90, 90, 90);
    }
  }

  .time {
    .saved-time {
      font-weight: bold;
      opacity: 0.7;
    }
    .grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, auto) auto;
      grid-gap: 0;
    }
  }
}

.timer-enter-active {
  transition: all 0.5s ease-in-out;
}
.timer-leave-active {
  display: none;
}

.timer-enter {
  opacity: 0;
  transform: translateY(-10px) scale(0.7);
}
</style>
