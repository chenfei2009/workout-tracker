<template>
  <div class="view-add-to-workout">
    <PageHeader title="添加到训练" :search="true" ref="headerRef" @submit="console.log(submit)" />
    <div content max-width>
      <template v-if="exercise">
        <div class="exer-wrap">
          <img :src="exercise.thumbnail" />
          <h2>{{ exercise.title }}</h2>
        </div>

        <a-divider />

        <div class="add-btn-wrap">
          <h3>选择训练</h3>
          <a-button @click="openFullscreen('CreateWorkout')">
            <span class="iconfont icon-plus"></span>
          </a-button>
        </div>

        <p v-if="!workouts || workouts.length === 0" center>
          您尚未创建您的个人训练
        </p>

        <WTList v-else>
          <WTListItem
            v-for="w in workouts"
            :key="w._id"
            :avatar="w.exercises[0].thumbnail"
            :title="w.title"
            :subtitle="getSubtitle(w)">
            <a-button :disabled="isSubmitting" @click="useWorkout(w)">选择</a-button>
          </WTListItem>
        </WTList>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/store/index'

import PageHeader from '@/components/common/PageHeader.vue'
import WTList from '@/components/list/WTList.vue'
import WTListItem from '@/components/list/WTListItem.vue'
import request from '@/utils/request'
// import { CreateWorkoutDTO } from '@/utils/dtos'
import { openFullscreen, closeFullscreen } from '@/utils/fullScreen'
// import { NotificationManagement } from '@/utils/NotificationManagement'
import { UserManager } from '@/utils/UserManager'

const store = useStore()

const isSubmitting = ref(false)
const headerRef = ref()

// 从 store 中获取 exercise
const exercise = computed(() => store.workoutToAdd)

// 从 store 中获取 workouts
// UserManagement.loadWorkouts() 返回的是Promise
const workouts = computed(() => UserManager.getUserWorkouts() || [])

onMounted(() => {
  if (!exercise.value) closeFullscreen('Training')
})

/**
 * @param {IWorkout} workout
 * @returns {string}
 */
function getSubtitle (workout) {
  return `${workout.exercises.length}个动作`
}

async function useWorkout (w) {
  if (!w) return
  const e = exercise.value
  if (!e) return
  if (isSubmitting.value) return
  isSubmitting.value = true

  const dto = {
    title: w.title,
    exercises: [...w.exercises.map(x => x._id), e._id]
  }

  console.log('上传数据到后台', w, dto)
  // closeFullscreen('Training')
  request
    .put('workout/' + w._id, dto)
    .then(res => {
      UserManager.addWorkout(res.data)
      // NotificationManagement.sendNotification(
      //   'Added Exercise',
      //   'The Exercise ' +
      //     e.title +
      //     ' became a Workout ' +
      //     w.title +
      //     ' added',
      //   undefined,
      //   e.thumbnail
      // )
    })
    .catch(() => {
      console.log('添加失败')
      // NotificationManagement.sendNotification(
      //   'Error While Saving',
      //   'The Exercise ' +
      //     e.title +
      //     ' cound not go to the Workout ' +
      //     w.title +
      //     ' to be added',
      //   undefined,
      //   e.thumbnail
      // )
    })
    // .finally(() => {
    //   closeFullscreen('Training')
    // })
}
</script>

<style lang="less" scoped>
.view-add-to-workout {
  min-height: 100vh;

  // background: linear-gradient(rgba(@color, 0.6), rgba(@color, 0.2)),
  //   url('/public/assets/workout-bg.webp');
  background-size: cover;
  background-position: center center;

  [content] {
    padding-top: 70px;
    padding-bottom: 20px;
  }

  .exer-wrap {
    display: flex;
    flex-direction: column;
    img {
      width: 200px;
      height: 100px;
    }
  }

  .add-btn-wrap {
    display: flex;
    justify-content: space-between;
  }

  .wt-list-item {
    // background: rgba(@color, 0.8);
    // color: #fff;
    .van-button {
      border-radius: 50px;
      margin-right: -5px;
    }
  }
}
</style>
