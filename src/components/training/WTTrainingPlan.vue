<template>
  <div class="wt-training-plan" max-width>
    <!-- 节标题 -->
    <WTHeading title="训练计划" subtitle="最近七天" to="TrainingPlan"/>

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

    <!-- 当日训练计划 -->
    <div class="day-wrapper" v-if="store.isUserValid">
      <transition name="fade">
        <WTTrainingPlanDay :key="selected" :daynumber="selected" />
      </transition>
    </div>

    <!-- 未登录 -->
    <div v-else class="login" flow crusior @click="router.push('/login')">
      <span>您尚未登录</span>
      <span>点击这里 查看或定制您的训练</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store/index'
import router from '@/router'
import WTTrainingPlanDay from './WTTrainingPlanDay.vue'
import WTHeading from '@/components/WTHeading.vue'
import { UserManager } from '@/utils/UserManager'
import { aDay, DAYS } from '@/utils/constants'

const store = useStore()

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

const hasExercises = day => {
  const plan = UserManager.getTrainingPlan()
  if (!plan) return false
  for (const [key, value] of Object.entries(plan)) {
    if (day.toString() === key && value.length > 0) return true
  }
  return false
}

const getDateInXDays = days => (new Date(new Date().getTime() + days * aDay).getDate())
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
