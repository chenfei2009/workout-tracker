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
      <div class="timer-wrapper total-wrapper">
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
          <div v-if="type === 'gym'" class="timer-wrapper ex">
            <div class="tag">当前动作用时</div>
            <transition-group class="timer" name="timer" tag="ul">
              <li v-for="(t, i) in timeEx" :key="t + '_' + i" :sep="t === ':'">
                {{ t }}
              </li>
            </transition-group>
          </div>
        </div>
      </WTTransition>

      <WTTransition>
        <div :key="index" class="sets-reps">
          <!-- <div v-if="type === 'gym'" class="timer-wrapper ex">
            <div class="tag">当前动作用时</div>
            <transition-group class="timer" name="timer" tag="ul">
              <li v-for="(t, i) in timeEx" :key="t + '_' + i" :sep="t === ':'">
                {{ t }}
              </li>
            </transition-group>
          </div> -->
          <template v-if="type === 'gym'">
            <div>{{volume}}</div>
            <WTGymForm ref="tableRef" :type="type" />
          </template>
          <template v-else>
            <a-tabs v-model:activeKey="activeName">
              <div class="tip">目标时长：{{state.workout.times[index]}}秒</div>
              <a-tab-pane tab="倒计时" key="timer">
                <WTTimer :recTime="state.workout.times[index] - 0" ref="timerRef"/>
              </a-tab-pane>
              <a-tab-pane tab="秒表" key="stopwatch">
                <WTStopwatch ref="stopwatchRef" />
              </a-tab-pane>
            </a-tabs>
          </template>
          <!-- <WTRunningTable
            ref="tableRef"
            :type="type"
            :recTime="state.workout.times[index] - 0"
          /> -->
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
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import WTTransition from '@/components/WTTransition.vue'
import WTBanner from '@/components/WTBanner.vue'
// import WTRunningTable from '@/components/forms/WTRunningTable.vue'
import WTGymForm from '@/components/forms/WTGymForm.vue'
import WTStopwatch from '@/components/WTStopwatch.vue'
import WTTimer from '@/components/WTTimer.vue'
import { aMinute, anHour, aSecond } from '@/utils/constants'
import { closeFullscreen } from '@/utils/fullScreen'
import { WorkoutManager } from '@/utils/WorkoutManager'

const startTime = ref(0)

const state = reactive({
  workout: null,
  exercises: [],
  stats: []
})

const tableRef = ref()

const index = ref(0)
const time = ref([0, 0, ':', 0, 0, ':', 0, 0])
const timeEx = ref([0, 0, ':', 0, 0, ':', 0, 0])
const timer = ref(0)

const volume = computed(() => {
  if(state.workout.reps[index.value]) {
    // console.log(state.workout.reps)
    const reps = state.workout.reps[index.value].replace(/,/g, '次 ')
    // const reps = state.workout.reps.reduce((prev, cur) => {
    //   return prev + cur + '次 '
    // }, '')
    // return `推荐容量：${state.workout.reps.length}组 X ${state.workout.reps[index.value]}次`
    return `推荐容量：${state.workout.reps.length}组 ${reps}次`
  }
  return null
})

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
  const { reps } = state.workout
  if (reps[index.value]) return 'gym'
  return 'time'
})

// time 类型数据
const activeName = ref('timer')
const timerRef = ref()
const stopwatchRef = ref()



// 监听 index 的变化
watch(
  () => index.value,
  (val, preVal) => indexChanged(val, preVal),
  { immediate: true }
)

onMounted(() => {
  if (!WorkoutManager.hasActiveWorkout()) {
    closeFullscreen('Workouts')
  }
  state.workout = WorkoutManager.getWorkout()
  state.exercises = WorkoutManager.getExercises()
  startTime.value = WorkoutManager.getStartTime()
  state.stats = WorkoutManager.getStats()
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

  WorkoutManager.saveStats(state.stats)

  updateTime()
}

/* 缓存训练数据 */
const setWeightReps = () => {
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
  WorkoutManager.saveStats(state.stats)
}

/* 缓存时间数据 */
const setTime = () => {
  if (activeName.value === 'timer') {
    console.log('缓存timer数据', timerRef.value.timeStat)
  } else {
    console.log('缓存stopwatch数据', stopwatchRef.value.timeStat)
  }
  state.stats[index.value].time = (activeName.value === 'timer' ? timerRef.value.timeStat : stopwatchRef.value.timeStat)
  WorkoutManager.saveStats(state.stats)
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
}


/* 切换下一个动作 */
const next = () => {
  // 保存当前训练记录
  type.value === 'gym' ? setWeightReps() : setTime()
  // 切换动作
  index.value = Math.min(state.exercises.length, index.value + 1)
}

/* 切换上一个动作 */
const prev = () => {
  // 保存当前训练记录
  type.value === 'gym' ? setWeightReps() : setTime()
  // 切换动作
  index.value = Math.max(0, index.value - 1)
}

/* 结束训练，不保存数据 */
const cancel = () => {
  // 清空定时器
  clearInterval(timer.value)
  WorkoutManager.clearActiveWorkout()
}

/* 保存训练，提交数据 */
const save = () => {
  // 保存当前训练记录
  type.value === 'gym' ? setWeightReps() : setTime()
  indexChanged(0, index.value)
  // 清空定时器
  clearInterval(timer.value)
  WorkoutManager.saveWorkout(state.stats)
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
    // display: flex;
    opacity: 0.75;
    position: relative;
    padding: 5px;
    margin-bottom: 10px;
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
      margin-bottom: 0;
      li {
        font-weight: 900;
        font-size: 2rem; // 2.6em;
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
      border-radius: @border-radius;
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

  .total-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 0;
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

  .tip {
    position: absolute;
    top: 0;
    right: 12px;
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

:deep(.ant-tabs) {
  // margin-top: -12px;
  .ant-tabs-nav-wrap {
    margin-left: -22px;
  }
  .ant-tabs-tab {
    padding-top: 0;
  }
}
</style>
