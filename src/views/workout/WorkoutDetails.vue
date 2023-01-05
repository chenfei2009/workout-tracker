<template>
  <div class="view-Workout">
    <!-- <WTHeader
      :title="state.workout ? state.workout.title : 'Workout'"
      :trigger="250"
      FullScreenCloser="Training"
    /> -->

    <WTSwipeable @swipeDown="closeFullscreen('Workouts')">
      <!-- banner -->
      <WTBanner v-if="state.workout" :title="state.workout.title || '123'">
        <template v-slot:media>
          <img :src="state.workout.thumbnail || '/assets/hero/home.webp'" alt="" />
        </template>
        <div>
          <span>31 分钟  |  初级</span>
          <span v-if="!isMark" class="iconfont icon-heart" @click="markWorkout"></span>
          <span v-else class="iconfont icon-heart-fill" @click="dismarkWorkout"></span>
        </div>
      </WTBanner>
    </WTSwipeable>

    <section content v-if="state.workout">
      <div max-width>
        介绍文字.....
      </div>
      <a-divider />
      <h4>全部动作</h4>
      <div max-width>
        <WTExercisePreview
          v-for="(e, i) in state.workout.exercises"
          :key="i"
          :exercise="e"
        />
      </div>
    </section>

    <div class="fixed-btn" @click="startWorkout">开始训练</div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import router from '@/router'
import WTSwipeable from '@/components/WTSwipeable.vue'
import WTExercisePreview from '@/components/preview/WTExercisePreview.vue'
import WTBanner from '@/components/WTBanner.vue'
import { _getWorkoutById } from '@/api/workout'
import {
  closeFullscreen
  // formatTimeForMessage
} from '@/utils/fullScreen'
import { WorkoutManager } from '@/utils/WorkoutManager'
import { _subWorkout } from '@/api/workout'

const isMark = ref(false)
const state = reactive({
  workout: null,
  error: false,
  author: null
})

// const tsUpdated = computed(() => {
//   if (!state.workout) return ''
//   // return formatTimeForMessage(state.workout.updated)
//   return state.workout.updated
// })

// const id = router.currentRoute.value.params.id

onMounted(() => {
  _getWorkoutById(router.currentRoute.value.params.id)
    .then(async res => {
      state.workout = res.data.data
      if (!state.workout) return
      // const { data } = await request.get('user/' + state.workout.author)
      state.author = '123456'
    })
    .catch((error) => {
      console.log(error)
      // state.error = true
      // closeFullscreen('Training')
    })
})

const startWorkout = () => {
  if (!state.workout) return
  WorkoutManager.startWorkout(state.workout.exercises, state.workout)
}

const markWorkout = () => _subWorkout(state.workout._id)

</script>

<style lang="less" scoped>
.view-Workout {
  min-height: 100vh;

  [content] {
    // padding-top: 0;
    padding-bottom: 80px;
    .grid {
      display: grid;
      min-width: 150px;
      gap: 10;
      left: 50%;
      transform: translate(-50%, calc(-100% - 40px));
      position: absolute;
      z-index: 10;
    }
  }

  .fixed-btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    font-size: 1.2rem;
    color: #eee;
    background-color: rgb(90, 90, 90);
  }
}
</style>
