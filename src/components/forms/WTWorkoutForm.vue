<template>
  <a-drawer
    height="90vh"
    placement="bottom"
    :closable="false"
    :visible="visible"
    @close="visible=false"
  >
    <form @submit.prevent="submit">
      <a-input
        v-model:value="query"
        placeholder="搜索动作"
        @input="submit"
      />
    </form>

    <p
      center
      v-if="
        (!results || results.length === 0) && selectedExercises.length === 0
      "
    >搜索动作</p>

    <template v-else>
      <br />
      <div class="result-wrap">
        <div class="list-wrap">
          <div>搜索结果</div>
          <WTList>
            <WTListItem
              v-for="r in results || []"
              :key="'r' + r._id"
              :avatar="r.thumbnail"
              :title="r.title"
              @click="add(r)"
            >
              <span class="tips" style="opacity: 0.5">选择</span>
            </WTListItem>
          </WTList>
        </div>
        <div class="list-wrap">
          <div>已选择</div>
          <WTList>
            <WTListItem
              v-for="(s, i) in selectedExercises"
              :key="'s' + i + s._id"
              :avatar="s.thumbnail"
              :title="s.title"
              @click="remove(i)"
            >
              <span class="tips">删除</span>
            </WTListItem>
          </WTList>
        </div>
      </div>
    </template>
  </a-drawer>

  <div class="wt-workout-form">
    <!-- <FHErrorList :id="errorKey" /> -->
    <section>
      <div class="label">训练名称</div>
      <a-input v-model:value="dto.title" placeholder="请输入训练名称"/>
      <div class="label">训练描述</div>
      <a-textarea v-model:value="dto.desc">请输入训练介绍</a-textarea>
      <div class="label">难度等级</div>
      <div class="input">
        <a-rate v-model:value="dto.intensity" :count="3" />
      </div>
      <div class="label">已选择{{selectedExercises.length}}个动作</div>
      <a-button @click="visible=true">点击添加</a-button>
    </section>
    <div flow>
      <!-- create Workout -->
      <a-button
        class="fixed-btn"
        v-if="!workout"
        :disabled="isSubmitting"
        @click="createWorkout"
      >创建训练</a-button>
      <!-- Update Workout -->
      <a-button
        class="fixed-btn"
        v-if="workout"
        :disabled="isSubmitting"
        @click="updateWorkout"
      >更新训练</a-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref, watch } from 'vue'
import router from '@/router'

// import { CreateWorkoutDTO } from '@/utils/dtos'
// import { closeFullscreen } from '@/utils/fullScreen'
import { UserManager } from '@/utils/UserManager'
import { _createWorkout, _updateWorkout } from '@/api/workout'
import { _getExercisesByQuery } from '@/api/exercise'

// import WTErrorList from '../WTErrorList.vue'
import WTList from '../list/WTList.vue'
import WTListItem from '../list/WTListItem.vue'

const props = defineProps({
  workout: Object
})

// const errorKey = ref('workout-form')
const visible = ref(false)
const query = ref('') // 查询 exercise 关键字
const selectedExercises = ref([])
const results = ref(null) // 搜索结果
const isSubmitting = ref(false)

const dto = reactive({
  title: '',
  desc: '',
  intensity: 1,
  exercises: []
})

onMounted(() => workoutChanged())

watch(() => props.workout, workoutChanged, { deep: true, immediate: true })

function workoutChanged () {
  if (props.workout) {
    selectedExercises.value = props.workout.exercises
    dto.title = props.workout.title
  }
}

/**
 * 搜索/添加/删除 动作
 */
// 搜索动作
const submit = async () => {
  if (query.value.length < 2) return
  // const { data } = await request.get('exercise/find/' + encodeURI(query.value))
  const { data } = await _getExercisesByQuery(query.value, '')
  results.value = data.data
}

// 添加动作
const add = ex => selectedExercises.value.push(ex)

// 删除动作
const remove = index => selectedExercises.value.splice(index, 1)

/**
 * 创建/更新 workout
 */
// 格式化 dto.exercises
const prepareDTO = () => (dto.exercises = selectedExercises.value.map(x => x._id))

const handleResponse = res => {
  UserManager.addWorkout(res.data.data)
  router.go(-1)
}

const handleCatch = err => {
  const { statusCode, message } = err
  if (statusCode && statusCode === 422 && message) {
    // FHEventBus.$emit('fh-error-list-' + this.errorKey, message)
    console.log(message)
  }
  isSubmitting.value = false
}

// 创建 workout
const createWorkout = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  prepareDTO()
  _createWorkout(dto)
    .then(handleResponse)
    .catch(handleCatch)
}

// 更新 workout
const updateWorkout = async () => {
  if (isSubmitting.value || !props.workout) return
  isSubmitting.value = true
  prepareDTO()
  _updateWorkout(props.workout._id, dto)
    .then(handleResponse)
    .catch(handleCatch)
}

</script>

<style lang="less" scoped>
.wt-workout-form {
  form,
  .a-input {
    // margin-left: auto !important;
    // margin-right: auto !important;
    max-width: 400px;
    margin-top: 20px;

    .a-input {
      padding: 10px 20px;
    }
  }
}

.result-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}

.wt-list {
  max-height: 400px;
  overflow-y: auto;
  z-index: 10;

  // .custom-scrollbar__dark();

  .wt-list-item {
    // background: rgba(@color, 0.8);
    // color: #fff;
    .tips {
      font-size: 10px;
    }
    .a-button {
      border-radius: 50px;
      margin-right: -5px;
    }
  }
}

.fixed-btn {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  font-size: 1.2rem;
  color: #eee;
  background-color: rgb(90, 90, 90);
}
</style>
