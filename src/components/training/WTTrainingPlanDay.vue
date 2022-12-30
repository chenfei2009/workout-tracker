<template>
  <div class="wt-trainingplan-day">
    <!-- 加载中 -->
    <!-- <van-loading v-if="!isLoaded" :dark="store.darkmode" size="20" /> -->
    <a-spin v-if="isLoading" :delay="200"/>

    <div class="exercises" v-else>
      <div class="title-wrap">
        <WTHeading :subtitle="amount || '无需练习'" :title="dayName" :seeMore="false" />
        <!-- <div class="btn-wrap">
          <a-button @click="startWorkout"><span class="iconfont icon-right"></span></a-button>
          <a-button @click="updateDay"><span class="iconfont icon-edit"></span></a-button>
          <a-button @click="removeDay"><span class="iconfont icon-delete"></span></a-button>
        </div> -->
      </div>
      <template v-if="day">
        <WTCarousel>
          <WTWorkoutPreview
            v-for="w in day"
            :key="w._id"
            :workout="w"
          />
        </WTCarousel>
      </template>
      <template v-else>
        <div class="media-wrap">
          <div class="action-wrap">
            <span>+ 添加训练</span>
          </div>
          <video playsinline autoplay="autoplay" loop muted>
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-heavy-ropes-in-the-gym-23141-small.mp4"
            />
          </video>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// import request from '@/utils/request'
import { DAYS } from '@/utils/constants'
// import { openFullscreen } from '@/utils/fullScreen'

import { UserManager } from '@/utils/UserManager'
// import { WorkoutManager } from '@/utils/WorkoutManager'
import WTWorkoutPreview from '@/components/preview/WTWorkoutPreview.vue'
import WTCarousel from '../WTCarousel.vue'
import WTHeading from '../WTHeading.vue'

const props = defineProps({
  daynumber: Number,
  isLoading: Boolean
})

// const actionActive = ref(false)
// const isLoading = ref(true)
// defineExpose('isLoading')

// const day = computed((id, exercise) => {})
const day = computed(() => {
  if (props.daynumber === undefined) return null
  const plan = UserManager.getTrainingPlan()
  if (!plan) return null
  for (const [key, value] of Object.entries(plan)) {
    // 此处暂时用虚拟数据
    if (props.daynumber.toString() === key) return value
  }
  return null
})

const dayName = computed(() => DAYS[props.daynumber])

const amount = computed(() => {
  if (!day.value) return null
  const { length } = day.value
  return length + '个训练计划'
})

// function updateDay () {
//   openFullscreen('UpdateTrainingPlan', { day: '' + props.daynumber })
// }

// async function removeDay () {
//   if (actionActive.value) return
//   actionActive.value = true
//   const { data } = await request.delete('trainingplan/' + props.daynumber)
//   UserManagement.setTrainingPlan(data)
//   actionActive.value = false
// }
</script>

<style lang="less" scoped>
.wt-trainingplan-day {
  padding-bottom: 10px;
  .title-wrap {
    display: flex;
    justify-content: space-between;
    width: 90vw;
    max-width: 800px;
  }
  .wt-heading {
    margin: 0;
  }
  .wt-carousel {
    margin-top: 0;
  }
  .wt-list-item {
    // width: fit-content !important;
    margin-left: 10px !important;

    &:nth-child(3) {
      margin-left: 0px !important;
    }

    :deep(.title) {
      font-weight: 500;
    }
  }
}
.media-wrap {
  position: relative;
  height: 120px;
  width: 80vw;
  margin-bottom: 20px;
  border-radius: @border-radius;
  overflow: hidden;
  .action-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.4rem;
    color: #fff;
  }
  video {
    width: 100%;
  }
}
</style>
