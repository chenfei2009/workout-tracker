<template>
  <div class="view-update-training-plan">
    <div content max-width>
      <WTHeader title="TrainingPlan">
        FHFullScreenCloser
        <!-- <FHFullScreenCloser @click="close" /> -->
      </WTHeader>
      <br />
      <h1 center>TrainingPlan</h1>
      <h3 center>{{ dayName }}</h3>

      <h3 center>Aktuelles Workout</h3>
      <div class="workout-exercise-preview">
        <!-- <WTWorkoutThumbnail :exercises="currentWorkout.exercises" /> -->
        <div class="title">{{ currentWorkout.title }}</div>
      </div>

      <br />

      <div class="workouts">
        <div flow>
          <h3>Choose workout</h3>
          <a-button @click="openFullscreen('CreateWorkout')">
            <span class="iconfont icon-plus"></span>create
          </a-button>
        </div>
        <WTList v-if="workouts">
          <WTListItem
            v-for="w in workouts"
            :key="'w' + w._id"
            :avatar="w.exercises[0].thumbnail"
            :title="w.title"
            :subtitle="getWorkoutSubtitle(w)"
          >
            <a-button @click="updateDay(w._id)">
              <span class="iconfont icon-plus"></span>
              create
            </a-button>
          </WTListItem>
        </WTList>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import router from '@/router'

// import WTFullScreenCloser from '@/components/WTFullScreenCloser.vue'
import WTHeader from '@/components/WTHeader.vue'
import WTList from '@/components/list/WTList.vue'
import WTListItem from '@/components/list/WTListItem.vue'
// import WTWorkoutThumbnail from '@/components/training/WTWorkoutThumbnail.vue'
import request from '@/utils/request'
import { DAYS } from '@/utils/constants'
import { openFullscreen, closeFullscreen } from '@/utils/fullScreen'
import { UserManager } from '@/utils/UserManager'
import { WorkoutManager } from '@/utils/WorkoutManager'

const activeKey = ref('1')
const submitting = ref(false)
const query = ref('')

const results = ref(null)

async function submit () {
  if (query.value.length < 2) return
  const { data } = await request.get(
    'exercise/find/' + encodeURI(query.value)
  )
  results.value = data.data
}

const day = computed(() => {
  const day = router.currentRoute.value.params.day
  if (!day) close()
  if (isNaN(+day)) close()
  const dayNumb = +day
  if (dayNumb < 0 || dayNumb > 6) close()
  return dayNumb
})

const dayName = computed(() => {
  if (isNaN(day.value)) return ''
  return DAYS[day.value]
})

// { id: string; exercises: IExercise[] } | null
const trainingplanDay = computed(() => {
  const plan = UserManager.getTrainingPlan()
  if (!plan) return null
  for (const [key, value] of Object.entries(plan)) {
    if (day.value.toString() === key) return value
  }
  return null
})

const currentWorkout = computed(() => {
  const plan = trainingplanDay.value
  if (!plan) return null
  // if (day.id.startsWith('ex_')) return null
  // return UserManagement.getWorkout(day.id)
  return UserManager.getWorkout(day._id)
})

const workouts = computed(() => WorkoutManager.getWorkouts())

function getWorkoutSubtitle (workout) {
  const { length } = workout.exercises
  if (length === 1) return 'Eine Übung'
  return length + ' Übungen'
}

async function updateDay (id) {
  if (!id) return
  if (submitting.value) return
  submitting.value = true
  const { data } = await request.put('trainingplan/' + this.day + '/' + id)
  UserManager.setTrainingPlan(data)
  close()
}

function close () {
  closeFullscreen('TrainingPlan')
}

</script>

<style lang="less" scoped>
.view-update-training-plan {
  min-height: 100vh;
  color: #fff;

  // background: linear-gradient(rgba(@color, 0.6), rgba(@color, 0.2)),
  //   url('/public/assets/workout-bg.webp');
  background-size: cover;
  background-position: center center;

  [content] {
    padding-bottom: 20px;
  }

  .workout-exercise-preview {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;
    width: fit-content;
    .backdrop-blur(@color);
    border-radius: 70px;
    margin: 0 auto;
    .tc-avatar,
    .wt-workout-thumbnail {
      border-radius: inherit;
      width: 60px;
      height: 60px;
    }
    .title {
      padding-right: 20px;
      font-weight: 550;
      display: grid;
      place-content: center;
    }
  }

  [flow] {
    justify-content: space-between;
  }

  :deep(.tc-segments--head) {
    background: @color !important;
    // @supports (backdrop-filter: saturate(180%) blur(20px)) {
    //   background: rgba($color, 0.5) !important;
    //   backdrop-filter: saturate(180%) blur(20px);
    // }
  }

  .wt-list {
    max-height: 320px;
    overflow-y: auto;
    .custom-scrollbar__dark();
    .wt-list-item {
      background: rgba(@color, 0.8);
      color: #fff;
      .a-button {
        border-radius: 50px;
        margin-right: -5px;
      }
    }
  }
}
</style>
