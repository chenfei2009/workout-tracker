<template>
  <div
    class="wt-workout-thumbnail"
    v-if="exercises"
    :thumbnails="thumbnails.length"
  >
    <div
      class="exercise-thumbnail"
      v-for="(t, i) in thumbnails"
      :key="i"
      :style="`background-image: url('${t}')`"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  exercises: Array
})

const thumbnails = computed(() => {
  if (!props.exercises) return []
  const { length } = props.exercises
  if (length === 0) return []
  let selection = []
  if (length < 4) selection = props.exercises.slice(0, 1)
  else if (length < 9) selection = props.exercises.slice(0, 4)
  else if (length < 16) selection = props.exercises.slice(0, 9)
  else selection = props.exercises.slice(0, 16)
  return selection.map(x => x.thumbnail)
})
</script>

<style lang="less" scoped>
.wt-workout-thumbnail {
  overflow: hidden;
  border-radius: @border-radius;
  display: grid;

  &[thumbnails='1'] {
    grid-template-columns: 1fr;
  }
  &[thumbnails='4'] {
    grid-template-columns: 1fr 1fr;
  }
  &[thumbnails='9'] {
    grid-template-columns: 1fr 1fr 1fr;
  }
  &[thumbnails='16'] {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  div {
    background-position: center;
    background-size: cover;
  }
}
</style>
