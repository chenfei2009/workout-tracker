<template>
  <div class="training-detail">
    <WTBanner :title="running" :subTitle="subTitle">
      <template v-slot:media>
        <video playsinline autoplay="autoplay" loop muted>
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-runner-does-stretch-routine-with-city-bridge-in-background-15801-small.mp4"
          />
        </video>
      </template>
      <router-link :to="{name: 'Workouts'}">发现更多训练</router-link>
    </WTBanner>

    <div content>
      <!-- 一周训练计划 -->
      <WTTrainingPlan />
      <br />
      <div class="btn-wrap" max-width>
        <WTButton icon="search" title="我的训练" routeName="UserWorkouts" />
        <WTButton icon="menu" title="全部训练" routeName="Workouts" />
        <WTButton icon="search" title="我的动作" routeName="UserExercises" />
        <WTButton icon="menu" title="全部动作" routeName="Exercises" />
      </div>
      <br />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store/index'
import WTButton from '@/components/WTButton.vue'
import WTTrainingPlan from '@/components/training/WTTrainingPlan.vue'
import WTBanner from '@/components/WTBanner.vue'

const store = useStore()
const running = computed(() => (store.runningWorkout || '腹肌撕裂者初级'))

const subTitle = computed(() => {
  if (!store.isUserValid) return '今日推荐'
  return '今日已完成'
})
</script>

<style lang="less" scoped>
header {
  position: relative;
  // background-color: rgba(0,0,0,0.3);
  .header-media {
    width: 100vw;
    height: 300px;
    video {
      height: 100%;
    }
  }
  .header-title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 20px;
    // background-color: rgba(0,0,0,0.3);
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.53) 25px
    );
    h1, h3 {
      font-weight: 500;
      color: #fff;
    }
  }
}
.btn-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-width: 150;
  gap: 10px;
}
.preview-wrap {
  width: 100vw;
  display: flex;
  // grid-template-columns: repeat(1, 1fr);
  // grid-template-rows: repeat(2, auto);
  .preview-item {
    flex: 1;
  }
}
</style>
