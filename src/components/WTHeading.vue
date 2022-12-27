<template>
  <div class="wt-heading" flow>
    <div class="left">
      <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
      <div class="title">{{ title }}</div>
    </div>
    <div
      class="more"
      v-if="to"
      @click="router.push({ name: to })"
    >更多</div>
  </div>
</template>

<script setup>
import router from '@/router'

defineProps({
  title: String,
  subtitle: String,
  to: String
})
</script>

<style lang="less" scoped>
.wt-heading {
  margin: 0 0 10px;
  justify-content: space-between;
  .subtitle {
    font-size: 12px;
    font-weight: bold;
    opacity: 0.5;
  }
  .title {
    font-size: 25px;
    font-weight: bold;
  }
  .more {
    padding-top: 5px;
  }
}
</style>
