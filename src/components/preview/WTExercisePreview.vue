<template>
  <div
    class="wt-exercise-preview"
    v-if="exercise"
    @click="openFullscreen('ExerciseDetails', { id: exercise._id })"
  >
    <div flow>
      <!-- <img border="rounded" :src="exercise.thumbnail" /> -->
      <div
        class="exercise-thumbnail"
        :style="`background-image: url('${exercise.thumbnail}')`"
      />
    </div>
    <div class="information">
      <div flow>
        <div class="title">{{ exercise.title }}</div>
        <div class="info">{{ getInfo(exercise) }}</div>
      </div>
      <div class="intensity">
        <i
          v-for="(k, i) in Array(exercise.intensity)"
          :key="i"
          class="iconfont icon-dot"
          :intensity="exercise.intensity"
        />
      </div>
      <div class="muscles">
        {{ exercise.affectedMuscles.join(' / ') }}
      </div>
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
import { openFullscreen } from '@/utils/fullScreen'

defineProps({ exercise: Object })

function getInfo (exercise) {
  if (exercise.time) {
    return exercise.time < 60 ? `${exercise.time}s` : `${exercise.time / 60}min`
  }
  if (exercise.distance) return `${exercise.distance}m`
  // if (exercise.sets && exercise.reps) return `${exercise.sets} X ${exercise.reps}`
  if (exercise.sets) return `${exercise.sets} 组`
}
</script>

<style lang="less" scoped>
.wt-exercise-preview {
  &:not(:last-child) {
    margin-bottom: 10px;
    padding-bottom: 10px;

    border-bottom: 1px solid rgba(@color, 0.2);
    @media (@isDark) {
      border-bottom: 1px solid rgba(@color_dark, 0.2);
    }
  }

  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 5px;

  [flow] {
    .exercise-thumbnail {
      width: 100px;
      height: 75px;
      background-size: cover;
      border-radius: 2px;
    }
  }

  .information {
    // width: 100%;
    position: relative;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    [flow] {
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: nowrap;
    }
    .title {
      font-weight: bold;
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }
    .intensity {
      i {
        // margin-right: 3px;
        font-size: 10px;

        &[intensity=1] {
          color: @success;
        }
        &[intensity=2] {
          color: @alarm;
        }
        &[intensity=3] {
          color: @error;
        }
      }
    }
    .muscles {
      width: 150px;
      opacity: 0.6;
      font-size: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
