<template>
  <div class="wt-spontaneous-workout">
    <transition name="workout-button">
      <!-- 悬浮按钮 -->
      <div
        class="workout-button"
        v-if="showButton && exercises.length > 0"
        @click="listVisible = !listVisible">
        <span class="iconfont icon-menu"></span>
        <div class="amount" v-if="exercises.length > 0">
          {{ exercises.length }}
        </div>
      </div>
    </transition>

    <transition name="workout-list">
      <!-- 训练列表 -->
      <div
        class="workout-list"
        v-if="showButton && listVisible && exercises.length > 0">
        <WTList>
          <WTListItem
            v-for="(e, i) in exercises"
            :key="i + e._id"
            :avatar="e.thumbnail"
            :title="e.title">
            <a-button @click="removeExercise(i)">
              <!-- <template #icon><MinusOutlined /></template> -->
            </a-button>
          </WTListItem>
        </WTList>
        <div>
          <a-button @click="startWorkout">
            <span class="iconfont icon-right"></span>
          </a-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useStore } from '@/store/index'
import router from '@/router'

// import { FHEventBus } from '@/utils/FHEventbus'
import WTList from './list/WTList.vue'
import WTListItem from './list/WTListItem.vue'
import { RunningWorkout } from '@/utils/WorkoutManager'

const store = useStore()

// let exercises = reactive([])
const listVisible = ref(true)

const exercises = computed(() => store.spotaneousList)

// onMounted(() => {
//   console.log(addToList)
//   // FHEventBus.$on('add-to-list', this.addToList)
// })

const showButton = computed(() => {
  // return true
  return [
    'Training',
    'WorkoutDetails',
    'MuscleExercises',
    'ExerciseSearchResults'
  ].includes(router.currentRoute.value.name || 'noname')
})

function removeExercise (index) {
  store.removeSpotaneousList(index)
  if (exercises.value.length === 0) {
    listVisible.value = false
  }
}

function startWorkout () {
  if (exercises.value.length > 0) {
    const ex = exercises.value.map(x => {
      return {
        affectedMuscles: x.affectedMuscles,
        difficulty: x.difficulty,
        thumbnail: x.thumbnail,
        title: x.title,
        type: x.distance ? 'distance' : x.sets ? 'gym' : 'time',
        _id: x._id
      }
    })
    // 清空 spotaneousList
    store.clearSpotaneousList()
    // 隐藏列表显示
    listVisible.value = false
    // 跳转页面
    RunningWorkout.startWorkout(ex)
  }
}

</script>

<style lang="less" scoped>
.wt-spontaneous-workout {
  .workout-list {
    z-index: 1000;
    position: fixed;
    bottom: calc(100px + env(safe-area-inset-bottom));
    right: calc(50px + env(safe-area-inset-right));
    // @media #{$isDesktop} {
    //   right: calc(5vw + 50px);
    // }
    // @media #{$isMobile} {
    //   right: calc(50px + env(safe-area-inset-right));
    // }

    max-height: 200px;
    overflow-y: auto;
    max-width: 70vw;
    border-radius: 25px;
    padding: 10px;

    .backdrop-blur(@background);
    // @media #{$isDark} {
    //   @include backdrop-blur($background_dark);
    // }
    // @media #{$isLight} {
    //   @include backdrop-blur($background);
    // }

    .custom-scrollbar__dark();

    .wt-list {
      .wt-list-item {
        background: rgba(@container, 0.8);
        color: @color;
        // @media #{$isDark} {
        //   background: rgba($container_dark, 0.8);
        //   color: $color_dark;
        // }
        // @media #{$isLight} {
        //   background: rgba($container, 0.8);
        //   color: $color;
        // }
        .tc-button {
          border-radius: 50px;
          margin-right: -5px;
        }
        margin-bottom: 10px;
      }
    }
  }
  .workout-button {
    z-index: 1000;
    position: fixed;
    bottom: calc(60px + env(safe-area-inset-bottom));
    right: calc(10px + env(safe-area-inset-right));
    // @media #{$isDesktop} {
    //   right: 5vw;
    // }
    // @media #{$isMobile} {
    //   right: calc(10px + env(safe-area-inset-right));
    // }

    background: @color;
    color: @paragraph;
    // @media #{$isDark} {
    //   background: $paragraph;
    //   color: $color;
    // }
    // @media #{$isLight} {
    //   background: $color;
    //   color: $paragraph;
    // }

    @scale: 40px;
    height: @scale;
    width: @scale;
    border-radius: @scale;
    display: grid;
    place-content: center;
    cursor: pointer;
    .amount {
      background: @success;
      height: calc(@scale / 1.5);
      width: calc(@scale / 1.5);
      border-radius: calc(@scale / 1.5);
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      display: grid;
      place-content: center;
      color: #fff;
    }
  }
}

.workout-button-enter,
.workout-button-leave-to {
  transform: translateX(10vw) scale(0);
  opacity: 0;
}
.workout-button-leave-active,
.workout-button-enter-active {
  transition: all 0.4s ease-in-out;
}

.workout-list-enter,
.workout-list-leave-to {
  transform: translate(calc(10vw + 80px), 80px) scale(0);
  opacity: 0;
}
.workout-list-leave-active,
.workout-list-enter-active {
  transition: all 0.4s ease-in-out;
}
</style>
