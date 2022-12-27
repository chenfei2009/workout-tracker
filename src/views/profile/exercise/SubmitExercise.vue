<template>
  <div class="view-submit-exercise">
    <PageHeader title="新建动作" :search="false">
      <WTTabs :tabs="tabs" @switch="handleTabClick"/>
    </PageHeader>

    <div content>
      <WTExerciseForm @close="router.push({name: 'Exercises'})" :activeKey="activeKey" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import PageHeader from '@/components/common/PageHeader.vue'
import WTTabs from '@/components/WTTabs.vue'
import WTExerciseForm from '@/components/forms/WTExerciseForm.vue'

const tabs = ref(['基本信息', '目标容量', '更多信息'])
const activeKey = ref(1)

function handleTabClick (value) {
  activeKey.value = value
}
</script>

<style lang="less" scoped>
.view-submit-exercise {
  [content] {
    margin-top: 80px;
  }
}
</style>
