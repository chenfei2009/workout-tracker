<template>
  <div class="vi-workout-list">
    <!-- 搜索表头 -->
    <PageHeader :title="title" />
    <div class="results-wrap" content flow v-if="workouts && workouts.length > 0">
      <WTWorkoutPreview
        v-for="w in workouts"
        :key="w._id"
        :workout="w"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core'
import router from '@/router'
import PageHeader from '@/components/common/PageHeader.vue'
import WTWorkoutPreview from '@/components/training/WTWorkoutPreview.vue'
import { _getCateWorkouts, _getTrendingWorkouts } from '@/api/workout'

const params = router.currentRoute.value.query
const title = computed(() => params.cate ? params.cate : params.area)

const workouts = ref([])

onMounted(() => {
  if (title.value === '正在流行') return loadTrendingWorkouts(params)
  loadCateWorkouts(params)
})

const loadCateWorkouts = async params => {
  _getCateWorkouts(params)
    .then(res => (workouts.value = res.data.data))
    .catch(err => console.log(err))
}

const loadTrendingWorkouts = async () => {
  _getTrendingWorkouts()
    .then(res => (workouts.value = res.data.data))
    .catch(err => console.log(err))
}
</script>

<style lang="less" scoped>
[content] {
  margin: 50px 0;
}

.results-wrap {
  justify-content: center;
  flex-wrap: wrap;
  .wt-preview {
    margin-bottom: 20px;
  }
}
</style>
