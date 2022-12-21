<template>
  <WTPreview
    v-if="exercise"
    class="wt-exercise-preview"
    @click="handleDetailClick"
    :title="exercise.title"
  >
    <template v-slot:media>
      <img :src="exercise.thumbnail" alt="" />
    </template>
    <div class="level">
      <span>Level</span>
      <span>{{exercise.difficulty}}</span>
    </div>
    <template v-slot:action>
      <!-- share workout list details update -->
      <!-- 都缺少图标 -->
      <a-dropdown placement="topLeft">
        <a-button shape="circle" @click.stop>
          <span class="iconfont icon-dots-vertical"></span>
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item @click.stop="shareExercise(exercise)">
              <span class="iconfont icon-share"></span>
              Share Exercise
            </a-menu-item>
            <a-menu-item @click.stop="addToWorkout">
              <span class="iconfont icon-share"></span>
              Add To Workout
            </a-menu-item>
            <a-menu-item @click.stop="addToList(exercise)">
              <span class="iconfont icon-share"></span>
              Add To List
            </a-menu-item>
            <a-menu-item @click.stop="handleDetailClick">
              <span class="iconfont icon-share"></span>
              Details
            </a-menu-item>
            <a-menu-item v-if="isAuthor" @click.stop="updateExercise">
              <span class="iconfont icon-share"></span>
              Update Exercise
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
    <!-- <template v-slot:"action" v-if="exercise.reviewed"></template>
    <template v-else-if="$route.name === 'exercise-submissions'">
      <tc-action-item
        icon="pencil"
        title="Anfrage bearbeiten"
        @click="handleClick"
      />
    </template>
    <template v-else>
      <tc-action-item
        error
        icon="trashcan-alt"
        title="Übung löschen"
        @click="cancelSubmission"
      />
    </template> -->
  </WTPreview>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from '@/store/index'

// import request from '@/utils/request'
import { ExerciseManagemer } from '@/utils/ExerciseManager'
import { openFullscreen } from '@/utils/fullScreen'
// import { UserManagement } from '@/utils/UserManagement'

import WTPreview from '../WTPreview.vue'

const store = useStore()

const props = defineProps({
  exercise: Object
})

const isAuthor = computed(() => {
  console.log(props.exercise)
  if (!props.exercise) return false
  // return this.exercise.author === UserManagement.getUserID()
  return true
})

function handleDetailClick (e) {
  openFullscreen('ExerciseDetails', { id: props.exercise._id })
  // this.$emit('click', e);
  // if (
  //   this.exercise &&
  //   this.exercise.reviewed &&
  //   this.$route.name !== 'exercise-submissions'
  // ) {
  //   openFullscreen('exercise-details', { id: this.exercise._id })
  // }
}

function shareExercise (ex) {
  console.log('share', ex)
}

function addToWorkout () {
  if (props.exercise) {
    ExerciseManagement.addToWorkout(props.exercise)
  }
}

function addToList (ex) {
  if (!ex) return
  // if (!store.getters.valid) {
  //   return openFullscreen('login')
  // }
  store.addToSpotaneousList(ex)
}

function updateExercise () {
  if (isAuthor.value) {
    openFullscreen('UpdateExercise', { id: props.exercise._id })
  }
}

// function cancelSubmission () {
//   if (props.exercise) {
//     console.log('delete-exercise', props.exercise._id)
//     // request.delete('exercise/cancelSubmission/' + props.exercise._id);
//   }
// }
</script>

<style lang="less" scoped>
.wt-exercise-preview {
  .level {
    margin-left: 10px;
    opacity: 0.7;
    span {
      font-size: 14px;
    }
    i {
      margin-left: 5px;
      font-size: 10px;

      &[difficulty='1'] {
        color: @success;
      }
      &[difficulty='2'] {
        color: @alarm;
      }
      &[difficulty='3'] {
        color: @error;
      }
    }
  }
}
</style>
