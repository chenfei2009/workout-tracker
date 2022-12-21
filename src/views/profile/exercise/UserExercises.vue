<template>
  <div class="view-workout-list">
    <!-- header -->
    <PageHeader title="我的动作">
      <WTTabs :tabs="tabs"/>
    </PageHeader>

    <div content max-width>
      <div class="list-wrap" flow v-if="exercises && exercises.length > 0">
        <WTWorkoutExercise
          v-for="e in exercises"
          :key="e._id"
          :exercise="e"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core'
import PageHeader from '@/components/common/PageHeader.vue'
import WTTabs from '@/components/WTTabs.vue'
import WTWorkoutExercise from '@/components/training/WTWorkoutExercise.vue'
import { UserManager } from '@/utils/UserManager'

// const activeKey = ref(1) // -1
const tabs = ref(['我创建的', '我收藏的'])

// const markedWorkouts = computed(() => UserManagement.getMarkedWorkouts())
const exercises = computed(() => UserManager.getExercises())

onMounted(() => UserManager.loadExercises())
</script>

<style lang="less" scoped>
[content] {
  margin: 75px 0;
}

.list-wrap {
  // width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  .wt-workout-exercise {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
