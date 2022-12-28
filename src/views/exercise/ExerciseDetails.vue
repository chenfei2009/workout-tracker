<template>
  <div class="exercise-detail">
    <!-- $route.meta.fullscreen: true -->
    <WTHeader
      v-if="state.exercise"
      :title="state.exercise.title"
      :trigger="250"
      fullScreenCloser="Exercises"
    />
    <WTSwipeable @swipeDown="closeFullscreen('Exercises')">
      <WTBanner v-if="state.exercise" :title="state.exercise.title || '123'">
        <template v-slot:media>
          <img :src="state.exercise.thumbnail || '/assets/hero/home.webp'" alt="" />
        </template>
        <div class="action" flow>
          <a-button v-if="state.exercise.isMarked" @click="cancelMarkExercise">取消收藏</a-button>
          <a-button v-else @click="markExercise">收藏</a-button>
          <a-button @click="addToWorkout">添加</a-button>
          <a-button v-if="isAuthor" @click="updateExercise">更新</a-button>
          <a-button v-if="isAuthor" @click="deleteExercise">删除</a-button>
        </div>
      </WTBanner>
    </WTSwipeable>
    <div content v-if="state.exercise" max-width>
      <!-- <h1 center>{{ state.exercise.title }}</h1> -->
      <div class="quick-information">
        <div class="information">
          <div class="title">难度</div>
          <div class="value">{{ state.exercise.intensity }}</div>
        </div>
        <div class="information" v-if="state.exercise.sets">
          <div class="title">推荐组数</div>
          <div class="value">{{ state.exercise.sets }}</div>
        </div>
        <div class="information" v-if="state.exercise.reps">
          <div class="title">推荐次数</div>
          <div class="value">{{ state.exercise.reps }}</div>
        </div>
        <div class="information" v-if="state.exercise.time">
          <div class="title">推荐时长</div>
          <div class="value">{{ state.exercise.time }}</div>
        </div>
        <div class="information" v-if="state.exercise.distance">
          <div class="title">推荐距离</div>
          <div class="value">{{ state.exercise.distance }}</div>
        </div>
      </div>

      <!-- kneeFriendly possibleAtHome -->
      <template v-if="state.exercise.kneeFriendly || state.exercise.possibleAtHome">
        <WTVarList>
          <WTVarListItem
            optional
            v-if="state.exercise.kneeFriendly"
            title="kneeFriendly"
          />
          <WTVarListItem
            optional
            v-if="state.exercise.possibleAtHome"
            title="possibleAtHome"
          />
        </WTVarList>
        <br />
      </template>

      <!-- desc -->
      <template v-if="state.exercise.desc">
        <WTHeading title="动作简介" :seeMore="false" />
        <div>{{state.exercise.desc}}</div>
        <br />
      </template>

      <!-- Affected Muscles -->
      <WTHeading title="目标肌群" :seeMore="false" />
      <WTVarList>
        <!-- :to="{ name: 'muscle-exercises', params: { muscle: m } }" -->
        <WTVarListItem
          v-for="(m, i) in state.exercise.affectedMuscles"
          :key="i"
          :title="m"
        />
      </WTVarList>

      <template v-if="state.exercise.warnings && state.exercise.warnings.length > 0">
        <br />
        <WTHeading title="注意事项" :seeMore="false" />
        <div
          v-for="(w, i) in state.exercise.warnings"
          :key="'w-' + i"
        >{{w}}</div>
        <!-- <tc-quote
          :dark="$store.getters.darkmode"
          v-for="(w, i) in exercise.warnings"
          :title="w"
          :key="'w-' + i"
          tfcolor="error"
        /> -->
      </template>

      <template v-if="state.exercise.steps && state.exercise.steps.length > 0">
        <br />
        <WTHeading title="步骤" :seeMore="false" />

        <div class="exercise-steps">
          <div
            class="exercise-step"
            v-for="(s, i) in state.exercise.steps"
            :key="'s-' + i"
          >
            <div class="numb">{{ i + 1 }}</div>
            <div class="text">{{ s }}</div>
          </div>
        </div>
      </template>

      <div>
        <br />
        <WTHeading title="Area" subtitle="right" :seeMore="false" />

        <div class="img-wrap">
          <img src="https://static.ouj.com/hiyd_cms/muscle/2b09475829ef4c608c8eb15fea82c820.gif
" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import router from '@/router'
import WTBanner from '@/components/WTBanner.vue'
import WTHeader from '@/components/WTHeader.vue'
import WTHeading from '@/components/WTHeading.vue'
import WTSwipeable from '@/components/WTSwipeable.vue'
import WTVarList from '@/components/variableList/WTVarList.vue'
import WTVarListItem from '@/components/variableList/WTVarListItem.vue'
import { ExerciseManager } from '@/utils/ExerciseManager'
import { UserManager } from '@/utils/UserManager'
import { _getExerciseById, _markExercise, _cancelMarkExercise } from '@/api/exercise'
import { openFullscreen, closeFullscreen } from '@/utils/fullScreen'

const state = reactive({
  exercise: null
})
const error = ref(false)

// 获取 exercise
const getExerciseById = async () => {
  _getExerciseById(router.currentRoute.value.params.id)
    .then(res => {
      state.exercise = res.data.data
      // if (!state.exercise) closeFullscreen('Training')
      console.log(res.data.data.isMarked)
    })
    .catch(() => {
      error.value = true
      // closeFullscreen('Training')
    })
}

onMounted(() => getExerciseById())

const userId = UserManager.getUserId()

const isAuthor = computed(() => {
  if (!state.exercise) return false
  return state.exercise.author === userId
})

// 收藏动作
const markExercise = async () => {
  if (!state.exercise) return
  try {
    const { data: res } = await _markExercise(state.exercise._id)
    if (res.meta.status === 200) state.exercise.isMarked = true
  } catch (err) {
    console.error(err)
  } 
}

// 取消收藏动作
const cancelMarkExercise = async () => {
  if (!state.exercise) return
  try {
    const { data: res } = await _cancelMarkExercise(state.exercise._id)
    if (res.meta.status === 200) state.exercise.isMarked = false
  } catch (err) {
    console.error(err)
  } 
}

const addToWorkout = () => {
  if (!state.exercise) return
  ExerciseManager.addToWorkout(state.exercise)
}

const updateExercise = () => {
  if (!state.exercise) return
  openFullscreen('UpdateExercise', { id: state.exercise._id })
}

</script>

<style lang="less" scoped>
.exercise-detail {
  min-height: 100vh;

  .grid {
    display: grid;
    min-width: 150px;
    gap: 10px;
    left: 50%;
    transform: translate(-50%, calc(-100% - 40px));
    position: absolute;
    z-index: 10;
  }

  :deep(.tc-quote--text) {
    display: none;
  }
  :deep(.tc-quote--title__prestyle)d {
    margin-bottom: 0 !important;
  }

  .action {
    gap: 10px;
  }

  [content] {
    // padding-top: 0;

    .quick-information {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      .information {
        display: flex;
        flex-direction: column;
        width: 70px;
        padding: 0 10px;
        .title {
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          opacity: 0.5;
        }
        i {
          margin: 10px 0;
          font-size: 1.5em;
        }
        .value {
          font-weight: bold;
        }
      }
    }

    .wt-var-list-item[optional] {
      background: @success;
      color: #fff;
    }

    .exercise-steps {
      .exercise-step {
        &:not(:first-of-type) {
          margin-top: 20px;
        }
        display: grid;
        grid-template-columns: 40px 1fr;
        grid-gap: 10px;
        .numb {
          display: grid;
          place-content: center;
          height: 30px;
          width: 30px;
          border-radius: 30px;
          color: #fff;
          background: rgba(0, 0, 0, .6);
          font-weight: 500;
        }
        .text {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
