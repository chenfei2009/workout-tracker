<template>
  <!-- <WTPreviewSmall
    v-if="workout"
    class="wt-workout-preview-s"
    @click="handleClick"
    :title="workout.title"
  > -->
  <component
    :is="getComp.get(size)"
    :key="size"
    v-if="workout"
    class="wt-workout-preview"
    @click="handleClick"
    :title="workout.title"
  >
    <template v-slot:media>
      <div
        class="workout-thumbnail"
        v-if="thumbnail"
        :style="`background-image: url('${thumbnail}')`"
      />
    </template>

    <div class="exercise-amount">
      <span>{{ getIntensity(workout.intensity) }}</span>
      <span> | {{ workout.exercises.length }}个动作</span>
    </div>

    <a-button shape="round" @click.stop="startWorkout">开始训练</a-button>

  </component>
</template>

<script setup>
import { shallowRef, computed, defineAsyncComponent } from 'vue'
import { openFullscreen } from '@/utils/fullScreen'
import { WorkoutManager } from '@/utils/WorkoutManager'
// import WTPreviewSmall from './WTPreviewSmall.vue'
// import WTPreviewLarge from './WTPreviewLarge.vue'
// import WTWorkoutThumbnail from './WTWorkoutThumbnail.vue'

const props = defineProps({
  workout: Object,
  size: {
    type: String,
    default: 'small'
  }
})

// const isAuthor = computed(() => {
//   return true
//   // if (!this.workout) return false
//   // return this.workout.author === UserManagement.getUserID()
// })

// const compName = ref('')
// const compName = computed(() => {
//   if (props.size === 'small') return 'WTPreviewSmall'
//   return 'WTPreviewLarge'
// })

const getComp = shallowRef(new Map())
getComp.value.set(
  'small',
  defineAsyncComponent(() => import('./WTPreviewS.vue'))
)
getComp.value.set(
  'large',
  defineAsyncComponent(() => import('./WTPreviewL.vue'))
)

const thumbnail = computed(() => {
  if (props.workout.thumbnail) return props.workout.thumbnail
  return props.workout.exercises[0].thumbnail
})

const handleClick = () => {
  if (!props.workout) return
  openFullscreen('WorkoutDetails', { id: props.workout._id })
}

const startWorkout = () => {
  if (!props.workout) return
  WorkoutManager.startWorkout(props.workout.exercises, props.workout)
}

const getIntensity = intensity => {
  if (intensity === 1) return '初级'
  if (intensity === 2) return '中级'
  if (intensity === 3) return '高级'
  return null
}
</script>

<style lang="less" scoped>
.wt-workout-preview {
  // width: 100%;
  // height: 100%;
  overflow: hidden;
  .workout-thumbnail {
    height: 100%;
    background-position: center;
    background-size: cover;
  }

  .exercise-amount {
    // margin: 0 0 15px 20px;
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
    // position: absolute;
    // right: 10px;
    // bottom: 10px;
    // width: 7rem;
    // height: 2rem;
    // border-radius: 1rem;
    z-index: 10;
  }
}
</style>
