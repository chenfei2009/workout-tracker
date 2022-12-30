<template>
  <div class="view-training-plan" content max-width>
    <WTTrainingPlanDay
      v-for="(_x, i) in Array(7)"
      :key="i"
      :daynumber="i"
      :actions="true"
    />
  </div>
</template>

<script setup>
import WTTrainingPlanDay from '@/components/training/WTTrainingPlanDay.vue'
</script>

<style lang="less" scoped>
</style>
