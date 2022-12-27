<template>
  <div class="tab-bar-item" @click="changeItem">
    <div :style="activeStyle"><slot name="item-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import router from '@/router'

const props = defineProps({
  to: String,
  activeColor: {
    type: String,
    default: 'red'
  }
})

const isActive = computed(() => {
  return router.currentRoute.value.path.indexOf(props.to) !== -1
})

const activeStyle = computed(() => {
  return isActive.value ? { color: props.activeColor } : {}
})

const changeItem = () => router.push(props.to)
</script>

<style scoped>
.tab-bar-item {
  /* 平均分布 */
  flex: 1;
  text-align: center;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tab-bar-item img {
  height: 20px;
  margin-top: 4px;
}
/* .active {
  color: red;
} */
</style>
