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

      <template v-if="currentExercise">
        <!-- <tc-divider :dark="true" /> -->
        <a-divider />
        <h3 center>current exercise</h3>
        <div class="workout-exercise-preview">
          <!-- <a-avatar :src="currentExercise.thumbnail" /> -->
          <img :src="currentExercise.thumbnail" />
          <div class="title">{{ currentExercise.title }}</div>
        </div>
      </template>

      <template v-if="currentWorkout">
        <!-- <tc-divider :dark="true" /> -->
        <a-divider />
        <h3 center>Aktuelles Workout</h3>
        <div class="workout-exercise-preview">
          <!-- <WTWorkoutThumbnail :exercises="currentWorkout.exercises" /> -->
          <div class="title">{{ currentWorkout.title }}</div>
        </div>
      </template>

      <br />

      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Workout" />
        <a-tab-pane key="2" tab="Exercise" />
      </a-tabs>

      <WTTransition>
        <div class="workouts" v-if="activeKey === '1'">
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
      </WTTransition>

      <WTTransition>
        <div class="exercises" v-if="activeKey === '2'">
          <div flow>
            <h3>Exercise</h3>
            <form @submit.prevent="submit">
              <a-input
                v-model:value="query"
                placeholder="Find exercise"
                @input="submit"
              />
              <!-- <a-input
                pattern=".{2,}"
                v-model="query"
                icon="lens"
                :frosted="true"
                :dark="true"
                placeholder="Find exercise"
                @input="submit"
              /> -->
            </form>
          </div>

          <WTList>
            <WTListItem
              v-for="e in results || []"
              :key="'e' + e._id"
              :avatar="e.thumbnail"
              :title="e.title"
            >
              <a-button
                :disabled="submitting"
                icon="dot"
                @click="updateDay('ex_' + e._id)"
              />
            </WTListItem>
          </WTList>
        </div>
      </WTTransition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import router from '@/router'

import WTTransition from '@/components/WTTransition.vue'
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

const currentExercise = computed(() => {
  const plan = trainingplanDay.value
  if (!plan) return null
  // if (!day.id.startsWith('ex_')) return null
  // return day.exercises[0]
  return plan
})

const currentWorkout = computed(() => {
  const plan = trainingplanDay.value
  if (!plan) return null
  // if (day.id.startsWith('ex_')) return null
  // return UserManagement.getWorkout(day.id)
  return UserManager.getWorkout(0)
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

  background: linear-gradient(rgba(@color, 0.6), rgba(@color, 0.2)),
    url('/public/assets/workout-bg.webp');
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
