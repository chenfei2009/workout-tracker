<template>
  <div class="view-exercise-form">
    <!-- <FHErrorList :id="errorList" /> -->
    <div max-width>
      <a-drawer
        :title="title"
        placement="bottom"
        :closable="false"
        :visible="visible"
        @close="onClose"
      >
        <template #extra>
          <!-- <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button> -->
          <a-button type="primary" @click="onClose">确认</a-button>
        </template>
        <!-- 动作类型 选项列表 单选 -->
        <template v-if="title==='选择动作类型'">
          <ul class="option-list type-list">
            <li
              v-for="item in typeOptions"
              :key="item.value"
              class="list-item"
              :class="{active: dto.type === item.value}"
              @click="changeType(item.value)"
            >
              {{item.value}}
            </li>
          </ul>
        </template>
        <!-- 目标部位 选项列表 可多选 -->
        <template v-if="title==='选择目标部位'">
          <ul class="option-list">
            <li
              v-for="item in areaOptions"
              :key="item.value"
              class="list-item"
              :class="{active: item.isSelected}"
              @click="item.isSelected=!item.isSelected"
            >
              {{item.value}}
            </li>
          </ul>
        </template>
        <!-- 目标肌群 选项列表 可多选 -->
        <template v-else-if="title==='选择目标肌群'">
          <ul class="option-list" flow>
            <li
              v-for="item in muscleOptions"
              :key="item.value"
              class="list-item"
              :class="{active: item.isSelected}"
              @click="item.isSelected=!item.isSelected"
            >
              {{item.value}}
            </li>
          </ul>
        </template>
      </a-drawer>

      <!-- 基本信息 表单 -->
      <WTTransition>
        <div class="form" v-if="props.activeKey === 1">
          <a-input v-model:value="dto.title" placeholder="请输入动作名称"/>
          <!-- <a-input v-model:value="dto.thumbnail" placeholder="请粘贴图片链接"/> -->
          <div class="option" @click="showDrawer('选择动作类型')">
            <div class="label">动作类型</div>
            <div class="input">{{dto.type}} <span class="iconfont icon-arrow-right-bold" /></div>
          </div>
          <div class="option" @click="showDrawer('选择目标部位')">
            <div class="label">目标部位</div>
            <div class="input">{{dto.area}} <span class="iconfont icon-arrow-right-bold" /></div>
          </div>
          <div class="option" @click="showDrawer('选择目标肌群')">
            <div class="label">目标肌群</div>
            <div class="input"><span class="iconfont icon-arrow-right-bold" /></div>
          </div>
          <div class="option">
            <div class="label">难度等级</div>
            <div class="input">
              <a-rate v-model:value="dto.intensity" :count="3" :tooltips="desc" />
            </div>
          </div>
        </div>
      </WTTransition>

      <!-- 目标容量 表单 -->
      <WTTransition>
        <div v-if="props.activeKey === 2">
          <div sub style="opacity: .5">
            填写目标组数、时长或距离，作为提示信息
          </div>

          <!-- <tc-divider :dark="$store.getters.darkmode" name="Gym-Übung" /> -->
          <a-divider>力量训练</a-divider>
          <div class="title" sub>目标组数 | min - max</div>
          <div flow>
            <a-input
              type="number"
              min="1"
              step="1"
              v-model:value="dto.sets.min">
              <template #addonBefore>min </template></a-input>
            <a-input
              type="number"
              :min="dto.sets.max"
              step="1"
              v-model:value="dto.sets.max">
              <template #addonBefore>max</template></a-input>
          </div>

          <div class="title" sub>目标次数 | min - max</div>
          <div flow>
            <a-input
              type="number"
              min="1"
              step="1"
              v-model:value="dto.reps.min">
              <template #addonBefore>min </template></a-input>
            <a-input
              type="number"
              :min="dto.reps.max"
              step="1"
              v-model:value="dto.reps.max">
              <template #addonBefore>max</template></a-input>
          </div>

          <!-- <tc-divider :dark="$store.getters.darkmode" name="Zeit-Übung" /> -->
          <a-divider>有氧训练 / HIIT</a-divider>
          <div class="title" sub>目标时长</div>
          <div sub>
            <a-input
              type="number"
              v-model:value="dto.time"
              min="0"
              step="1">
              <template #addonBefore>时长</template></a-input>
          </div>

          <a-divider>长距离训练</a-divider>
          <div class="title" sub>目标距离</div>
          <a-input
            placeholder="z.B.: 5 km"
            v-model:value="dto.time">
            <template #addonBefore>距离</template></a-input>
        </div>
      </WTTransition>

      <!-- 更多信息 表单 -->
      <WTTransition>
        <div v-if="props.activeKey === 3">
          指导视频
          <a-input v-model="dto.explanatoryVideo"/>

          <!-- <tl-grid minWidth="250" gap="0 20"> -->
          <div>
            <div>
              <div class="title" sub>选择标签</div>
              居家动作
              <a-checkbox v-model="dto.possibleAtHome"/>
            </div>
          </div>

          <div class="title">动作分解</div>
          <ol>
            <li v-for="(s, i) in dto.steps" :key="'s-' + i">
              <span>{{ s }}</span>
              <a tfcolor="error" @click="removeStep(i)">删除</a>
            </li>
          </ol>
          <div class="wt-graph-card">
            <div class="title" small>下一步</div>
            <a-textarea v-model="step"/>
            <div class="flow">
              <a color="success" @click="addStep">添加步骤</a>
            </div>
          </div>

          <div class="title">注意事项</div>
          <ol>
            <li v-for="(w, i) in dto.warnings" :key="'w-' + i">
              <span>{{ w }}</span>
              <a color="error" @click="removeWarning(i)">删除</a>
            </li>
          </ol>
          <div class="wt-graph-card">
            <div class="title" small>注意事项</div>
            <a-textarea v-model="warning" />
            <div class="flow">
              <a tfcolor="success" @click="addWarning">添加事项</a>
            </div>
          </div>
        </div>
      </WTTransition>

      <br />
      <div class="fixed-btn-wrap" flow>
        <template v-if="mode === 'create'">
          <a-button
            :disabled="isSubmitting || dto.title.length<3"
            @click="createExercise"
          >新建动作</a-button>
        </template>
        <template v-else-if="mode === 'update'">
          <a-button
            shape="round"
            :disabled="isSubmitting"
            @click="updateExercise"
          >更新动作</a-button>
        </template>
        <template v-else-if="mode === 'publish'">
          <a-button
            shape="round"
            :disabled="isSubmitting"
            @click="denySubmission"
          >Delete application</a-button>
          <a-button
            shape="round"
            :disabled="isSubmitting"
            @click="acceptExercise"
          >Publish exercise</a-button>
        </template>
        <template v-else-if="mode === 'change'">
          <a-button
            shape="round"
            :disabled="isSubmitting"
            @click="rejectChanges"
          >Reject changes</a-button>
          <a-button
            shape="round"
            :disabled="isSubmitting"
            @click="acceptExercise"
          >Accept changes</a-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, reactive, ref, toRef } from 'vue'
import router from '@/router'

import WTTransition from '@/components/WTTransition.vue'
import request from '@/utils/request'
import { AREAS, MUSCLES } from '@/utils/constants'
// import FHErrorList from '@/components/FHErrorList.vue'
// import { CreateExerciseDTO } from '@/utils/dtos'
// import { NotificationManagement } from '@/utils/NotificationManagement'
// import { VariableManagement } from '@/utils/VariableManagement'

const props = defineProps({
  exercise: Object,
  activeKey: Number
})

const emit = defineEmits(['close'])

// const activeKey = ref(2) // -1
const isSubmitting = ref(false)
const step = ref('')
const warning = ref('')
const mode = ref('create') // 'update' | 'create' | 'change' | 'publish'
// const errorList = ref('exercise-form')

/**
 * 抽屉组件相关
 */
const title = ref('')
const visible = ref(false)

const typeOptions = ref([
  { value: '力量训练', dec: '次数 重量 组数' },
  { value: '只需记录时间', dec: '秒表或计数器' },
  { value: '只需记录距离', dec: '距离' },
  { value: '拉伸', dec: '无需记录任何数据' }
])

const setOptions = arr => arr.map(x => { return { value: x, isSelected: false } })
const areaOptions = toRef(setOptions(AREAS))
const muscleOptions = toRef(setOptions(MUSCLES))

function showDrawer (target) {
  title.value = target
  visible.value = true
}

function onClose () {
  visible.value = false
}

function changeType (value) {
  onClose()
  dto.type = value
}

// 表单内容
const dto = reactive({
  title: '',
  type: '力量训练',
  areas: [],
  affectedMuscles: [],
  // thumbnail: '',
  intensity: 1,
  warnings: [],
  steps: [],
  sets: {}, // min: 1, max: 8
  reps: {} // min: 1, max: 8
})

const desc = ref(['初级', '中级', '高级'])

// const muscles = computed(() => VariableManagement.getMuscleNames())

onMounted(() => {
  setGym()

  if (props.exercise) {
    const ex = props.exercise

    areaOptions.value.forEach(x => {
      if (props.exercise.areas.includes(x.value)) x.isSelected = true
    })

    muscleOptions.value.forEach(x => {
      if (props.exercise.affectedMuscles.includes(x.value)) x.isSelected = true
    })

    dto.title = ex.title
    dto.affectedMuscles = ex.affectedMuscles
    dto.thumbnail = ex.thumbnail || ''
    dto.intensity = ex.intensity
    dto.warnings = ex.warnings || []
    dto.steps = ex.steps || []
    // dto.explanatoryVideo = (edited || ex).explanatoryVideo
    dto.possibleAtHome = ex.possibleAtHome
    dto.time = ex.time
    dto.distance = ex.distance
    dto.sets = mapMinMaxString(ex.sets)
    dto.reps = mapMinMaxString(ex.reps)
  }

  if (!props.exercise) {
    mode.value = 'create'
  } else if (router.currentRoute.value.name === 'UpdateExercise') {
    mode.value = 'update'
  } else if (router.currentRoute.value.name === 'ExerciseSubmission') {
    mode.value = props.exercise.reviewed ? 'change' : 'publish'
  }

  // props.activeKey = 1
})

function addStep () {
  if (step.value.length < 10) return
  dto.steps.push(step)
  step.value = ''
}

function removeStep (index) {
  dto.steps.splice(index, 1)
}

function addWarning () {
  if (warning.value.length < 10) return
  dto.warnings.push(warning)
  warning.value = ''
}

function removeWarning (index) {
  dto.Warning.splice(index, 1)
}

function setGym () {
  dto.reps = { min: 1, max: 12 }
  dto.sets = { min: 1, max: 6 }
}

function mapMinMaxString (s) {
  if (!s) return { min: 0, max: 0 }
  if (s.includes('-')) {
    const split = s.split(' - ')
    return { min: +split[0], max: +split[1] }
  }
  return { min: +s, max: +s }
}

function cleanDTO () {
  dto.areas = areaOptions.value
    .filter(x => x.isSelected === true)
    .map(x => x.value)
  dto.affectedMuscles = muscleOptions.value
    .filter(x => x.isSelected === true)
    .map(x => x.value)
  const { distance, time } = dto
  if (distance && distance.length === 0) {
    delete dto.distance
  }
  if (time && time <= 0) {
    delete dto.time
  }
  if ((distance && distance.length > 0) || (time && time > 0)) {
    delete dto.sets
    delete dto.reps
  }
  const { sets, reps } = dto
  dto.sets = `${sets.min} - ${sets.max}`
  dto.reps = `${reps.min} - ${reps.max}`
  // dto.intensity = +dto.intensity
}

async function createExercise () {
  if (isSubmitting.value) return
  isSubmitting.value = true
  cleanDTO()
  console.log('createExercise', dto)
  request
    .post('exercise', dto)
    .then(handleResponse)
    .catch(handleCatch)
}

async function updateExercise () {
  if (isSubmitting.value) return
  isSubmitting.value = true
  cleanDTO()
  console.log('updateExercise', dto)
  request
    .put('exercise/update/' + props.exercise._id, dto)
    .then(handleResponse)
    .catch(handleCatch)
}

// public async denySubmission() {
//   if (this.isSubmitting) return;
//   this.isSubmitting = true;
//   this.cleanDTO();

//   backend
//     .delete('exercise/' + this.exercise._id)
//     .then(this.handleResponse)
//     .catch(this.handleCatch);
// }

function handleResponse () {
  isSubmitting.value = false
  emit('close')
}

function handleCatch (err) {
  const { statusCode, message } = err
  console.log(statusCode, message, err)
  // if (statusCode && statusCode === 422 && message) {
  //   FHEventBus.$emit('fh-error-list-' + this.errorList, message);
  // }
  // this.setGym();
  isSubmitting.value = false
}
</script>

<style lang="less" scoped>
.view-exercise-form {
  padding-top: 0;

  h3 {
    margin-top: 5px;
  }

  [sub] {
    margin-bottom: 15px;
  }

  .title {
    font-weight: 700;
    white-space: nowrap;
    margin: 10px 0 2px;
    margin-left: 8px;
    &[small] {
      text-align: center;
      font-size: 14px;
      margin: 0px;
      margin-bottom: 10px;
    }
  }
  .spacer {
    height: 5px;
  }

  .form {
    input {
      padding: 20px 15px;
      border: 0;
      border-radius: @border-radius;
    }
    .option {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      margin: 10px 0;
      padding: 15px;
      border-radius: @border-radius;
    }
  }

  .wt-graph-card {
    margin-top: 10px;
    .tl-flow {
      margin-top: 10px;
    }
  }

  .wt-table-2 {
    margin-top: 5px;
    /deep/ .tc-td {
      height: 30px;
    }
  }

  ol {
    margin: 0;
    list-style-type: circle !important;
    li {
      margin: 0 0 5px 20px;
    }
  }

  .fixed-btn-wrap {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    justify-content: center;
    .ant-btn {
      width: 200px;
      height: 40px;
      border-radius: 20px;
      text-align: center;
      // line-height: 40px;
      font-size: 1.2rem;
      color: #eee;
      background-color: rgb(90, 90, 90);
    }
  }
}

.ant-drawer {
  // 未生效
  .ant-drawer-content-wrapper {
    border-radius: 10px;
    overflow: hidden;
    // background-color: @background;
  }
  .option-list {
    display: grid;
    grid-template-columns: repeat(3, 3fr);
    grid-gap: 20px;
    .list-item {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 10px;
      text-align: center;
    }
    .active {
      background-color: #ccc;
    }
  }
  .type-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
