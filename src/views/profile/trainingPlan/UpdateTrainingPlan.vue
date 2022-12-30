<template>
  <div class="view-update-training-plan">
    <PageHeader :title="'UpdatePlan' + dayName"/>

    <div content max-width>
      <div class="exercises">
        <div class="title-wrap">
          <WTHeading :subtitle="amount || '无需练习'" :title="dayName" :seeMore="false" />
        </div>
        <template v-if="day">
          <WTWorkoutPreview
            v-for="w in day"
            :key="w._id"
            :workout="w"
          />
        </template>
        <div v-if="actions" class="btn-wrap">
          <a-button size="small" @click="updateDay">
            <span class="iconfont icon-edit"></span>
          </a-button>
          <a-button size="small" @click="removeDay('123456')">
            <span class="iconfont icon-delete"></span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import router from '@/router'

import PageHeader from '@/components/common/PageHeader.vue'
import WTWorkoutPreview from '@/components/preview/WTWorkoutPreview.vue'
import WTHeading from '@/components/WTHeading.vue'
// import request from '@/utils/request'
import { DAYS } from '@/utils/constants'
// import { closeFullscreen } from '@/utils/fullScreen'
import { UserManager } from '@/utils/UserManager'
// import { WorkoutManager } from '@/utils/WorkoutManager'

// const submitting = ref(false)
// const query = ref('')

// const results = ref(null)

// async function submit () {
//   if (query.value.length < 2) return
//   const { data } = await request.get(
//     'exercise/find/' + encodeURI(query.value)
//   )
//   results.value = data.data
// }

// const day = computed(() => {
//   const day = router.currentRoute.value.params.day
//   if (!day) close()
//   if (isNaN(+day)) close()
//   const dayNumb = +day
//   if (dayNumb < 0 || dayNumb > 6) close()
//   return dayNumb
// })
const day = computed(() => {
  const day = router.currentRoute.value.params.day
  const plan = UserManager.getTrainingPlan()
  if (!plan) return null
  for (const [key, value] of Object.entries(plan)) {
    // 此处暂时用虚拟数据
    if (day.toString() === key) return value
  }
  return null
})

const amount = computed(() => {
  if (!day.value) return null
  const { length } = day.value
  return length + '个训练计划'
})

const dayName = computed(() => {
  if (isNaN(day.value)) return ''
  return DAYS[day.value]
})

// { id: string; exercises: IExercise[] } | null
// const trainingplanDay = computed(() => {
//   const plan = UserManager.getTrainingPlan()
//   if (!plan) return null
//   for (const [key, value] of Object.entries(plan)) {
//     if (day.value.toString() === key) return value
//   }
//   return null
// })

async function updateDay (id) {
  console.log(id)
  // if (!id) return
  // if (submitting.value) return
  // submitting.value = true
  // const { data } = await request.put('trainingplan/' + this.day + '/' + id)
  // UserManager.setTrainingPlan(data)
  // close()
}

// function close () {
//   closeFullscreen('TrainingPlan')
// }

const removeDay = () => {
  console.log('removeDay')
  // if (actionActive.value) return
  // actionActive.value = true
  // const { data } = await request.delete('trainingplan/' + props.daynumber)
  // UserManagement.setTrainingPlan(data)
  // actionActive.value = false
}

</script>

<style lang="less" scoped>
.view-update-training-plan {
  min-height: 100vh;
  // color: #fff;

  // background: linear-gradient(rgba(@color, 0.6), rgba(@color, 0.2)),
  //   url('/public/assets/workout-bg.webp');
  background-size: cover;
  background-position: center center;

  [content] {
    padding-top: 70px;
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
