<template>
  <WTPreview
    v-if="workout"
    class="wt-workout-preview"
    @click="handleClick"
    :title="workout.title"
  >
    <template v-slot:media>
      <div
        class="workout-thumbnail"
        v-if="workout.exercises"
        :style="`background-image: url('${thumbnail}')`"
      />
    </template>

    <div class="exercise-amount">
      <!-- v-if="workout.intensity -->
      <span>{{ getIntensity(workout.intensity) }}</span>
      <span> | {{ workout.exercises.length }}个动作</span>
    </div>

    <a-button shape="round" @click.stop="startWorkout">开始训练</a-button>

  </WTPreview>
</template>

<script setup>
import { computed, defineProps } from '@vue/runtime-core'

// import request from '@/utils/request'
import { openFullscreen } from '@/utils/fullScreen'
// import { UserManagement } from '@/utils/UserManagement'
import { RunningWorkout } from '@/utils/WorkoutManager'
import WTPreview from '../WTPreview.vue'
// import WTWorkoutThumbnail from './WTWorkoutThumbnail.vue'

const props = defineProps({
  workout: {}
})

// const isAuthor = computed(() => {
//   return true
//   // if (!this.workout) return false
//   // return this.workout.author === UserManagement.getUserID()
// })

const thumbnail = computed(() => {
  if (props.workout.thumbnail) return props.workout.thumbnail
  return props.workout.exercises[0].thumbnail
})

function handleClick (e) {
  console.log('emit click', e)
  // emit('click', e)
  if (props.workout) {
    openFullscreen('WorkoutDetails', { id: props.workout._id })
  }
}

function startWorkout () {
  if (props.workout) {
    RunningWorkout.startWorkout(props.workout.exercises)
  }
}

function getIntensity (intensity) {
  switch (intensity) {
    case 1:
      return '初级'
    case 2:
      return '中级'
    case 3:
      return '高级'
    default:
      // return null
      break
  }
}
</script>

<style lang="less" scoped>
.wt-workout-preview {
  .workout-thumbnail {
    height: 210px;
    border-radius: @border-radius @border-radius 0 0;
    overflow: hidden;

    background-position: center;
    background-size: cover;
  }

  .exercise-amount {
    margin: 0 0 15px 20px;
    opacity: 0.7;
    i {
      margin-right: 5px;
      font-size: 12px;
    }
    span {
      font-size: 14px;
    }
  }

  .ant-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    // width: 7rem;
    // height: 2rem;
    // border-radius: 1rem;
    z-index: 10;
  }
}
</style>
