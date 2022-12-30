<template>
  <div class="wt-training-plan" max-width>
    <!-- 节标题 -->
    <WTHeading title="训练计划" subtitle="最近七天" :to="{ name: 'TrainingPlan' }"/>

    <!-- 一周训练日历 -->
    <div class="day-tiles">
      <div
        class="day-tile"
        transition
        cursor
        v-for="(item, index) in days"
        :key="'tpday-' + item"
        :selected="item === selected"
        @click="selected = item"
      >
        <div class="day-name">{{ dayNames[item].substring(0, 2) }}</div>
        <div class="day-date">{{ getDateInXDays(index) }}</div>
        <span class="iconfont icon-dot" v-if="hasExercises(item)"></span>
      </div>
    </div>

    <!-- 未登录 -->
    <div v-if="status === -1" class="login" flow crusior @click="openFullscreen('Login')">
      <span>您尚未登录</span>
      <span>点击这里 查看或定制您的训练</span>
    </div>

    <!-- 当日训练计划 -->
    <div class="day-wrapper" v-else>
      <transition name="fade">
        <WTTrainingPlanDay
          :key="selected"
          :daynumber="selected"
          :isLoading="status === 0"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import WTTrainingPlanDay from '@/components/training/WTTrainingPlanDay.vue'
import WTHeading from '@/components/WTHeading.vue'
import { UserManager } from '@/utils/UserManager'
import { aDay, DAYS } from '@/utils/constants'
import { openFullscreen } from '@/utils/fullScreen'

const status = ref(1) // -1 未登录 // 0 loading // 1 loaded

const dayNames = ref(DAYS)

const selected = ref(new Date().getDay())

const days = computed(() => {
  const today = new Date().getDay()
  const days = []
  for (let i = 0; i < 7; i++) {
    days.push((today + i) % 7)
  }
  return days
})

const plan = computed(() => UserManager.getTrainingPlan())

const hasExercises = day => {
  // const plan = UserManager.getTrainingPlan()
  if (!plan.value) return false
  for (const [key, value] of Object.entries(plan.value)) {
    if (day.toString() === key && value.length > 0) return true
  }
  return false
}

// const getDayPlan = day => {
//   if (day === undefined) return null
//   if (!plan.value) return null
//   for (const [key, value] of Object.entries(plan.value)) {
//     // 此处暂时用虚拟数据
//     console.log('day changed', day)
//     if (day.toString() === key) return value
//   }
//   return null
// }

// const dayPlan = computed(() => getDayPlan(selected.value) )

const getDateInXDays = days => (new Date(new Date().getTime() + days * aDay).getDate())

onMounted(async () => {
  if (!UserManager.getUserId()) {
    status.value = -1
    return console.log('游客模式')
  }
  console.log(plan.value)
  if (!plan.value) {
    status.value = 0
    await UserManager.loadTrainingPlan()
    status.value = 1
  }
})
</script>

<style lang="less" scoped>
.wt-training-plan {
  .day-tiles {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
    .day-tile {
      text-align: center;
      border-radius: @border-radius;
      padding-bottom: 5px;
      &:hover,
      &:active,
      &[selected] {
        background: @paragraph_dark;
        color: @color_dark;
        // @media ($isDark) {
        //   background: @paragraph;
        //   color: @color;
        // }
      }
      .day-name {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.75;
        margin-top: 10px;
      }
      .day-date {
        font-weight: bold;
        font-size: 1.2em;
        margin-top: 5px;
      }
      .icon-dot {
        font-size: 1.5em;
        color: @success;
      }
    }
  }

  .day-wrapper {
    margin-top: 10px;
    margin-bottom: -20px;
    position: relative;
    // height: 200px;
  }

  .login {
    width: 100%;
    height: 80px;
    border-radius: @border-radius;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed #eee;
    background-color: #fff;
    margin-top: 15px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-leave-active {
  // z-index: -1;
  position: absolute;
}
.fade-enter {
  opacity: 0;
  transform: translateX(-20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
