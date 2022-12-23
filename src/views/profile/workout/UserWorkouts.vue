<template>
  <div class="view-workout-list">
    <!-- header -->
    <PageHeader title="我的训练">
      <WTTabs :tabs="tabs"/>
    </PageHeader>

    <div content max-width>
      <div class="list-wrap" flow v-if="workouts && workouts.length > 0">
        <WTWorkoutPreview
          v-for="w in workouts"
          :key="w._id"
          :workout="w"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import WTTabs from '@/components/WTTabs.vue'
import WTWorkoutPreview from '@/components/training/WTWorkoutPreview.vue'
import { UserManager } from '@/utils/UserManager'

// const activeKey = ref(1) // -1
const tabs = ref(['我创建的', '我收藏的'])

// const markedWorkouts = computed(() => UserManagement.getMarkedWorkouts())
const workouts = computed(() => UserManager.getCreatedWorkouts())

onMounted(() => UserManager.loadCreatedWorkouts())
</script>

<style lang="less" scoped>
[content] {
  margin: 80px 0;
}

.list-wrap {
  justify-content: center;
  flex-wrap: wrap;
  .wt-preview {
    margin-bottom: 20px;
  }
}
</style>
