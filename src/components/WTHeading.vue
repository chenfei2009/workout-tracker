<template>
  <div class="wt-heading" flow>
    <div class="left">
      <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="more" v-if="seeMore" @click="onClick">更多</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  seeMore: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['seeMore'])

function onClick () {
  emit('seeMore', props.title)
}
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
