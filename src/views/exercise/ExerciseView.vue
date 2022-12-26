<template>
  <div class="view-exercise">
    <!-- 搜索表头 -->
    <PageHeader title="动作库" :search="true" ref="headerRef" @submit="submit" />

    <div content>
      <!-- 侧边栏 -->
      <aside>
        <ul>
          <li
            v-for="(item, index) in areas"
            :key="index"
            :class="{ active: index === selected }"
            @click="handleAreaClick(index)"
          >
            {{item.name}}
          </li>
        </ul>
      </aside>
      <main>
        <!-- loading -->
        <section class="spin-wrap" content flow v-if="isLoading">
          <a-spin />
        </section>

        <!-- 动作列表 -->
        <section v-else-if="exercises && exercises.length > 0">
          <WTWorkoutExercise
            v-for="(e, i) in exercises"
            :key="i"
            :exercise="e"
          >
            <template v-slot:action>
              <a-button shape="round">开始训练</a-button>
            </template>
          </WTWorkoutExercise>
        </section>

        <!-- 新增自定义动作 -->
        <section v-else>
          <router-link :to="{name: 'SubmitExercise'}">
            新增自定义动作
          </router-link>
        </section>
      </main>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from '@/store'

import request from '@/utils/request'
import PageHeader from '@/components/common/PageHeader.vue'
import WTWorkoutExercise from '@/components/training/WTWorkoutExercise.vue'

const selected = ref(-1)
const isLoading = ref(false)
const headerRef = ref()

// const formState = reactive({
//   time: null,
//   intensity: null,
//   area: null,
//   cate: null
// })
const store = useStore()

const areas = ref([
  { id: '1', area: 'chest', name: '胸', isSelected: false },
  { id: '2', area: 'back', name: '背', isSelected: false },
  { id: '3', area: 'butt', name: '臀腿', isSelected: false },
  { id: '4', area: 'shoulder', name: '肩', isSelected: false },
  { id: '5', area: 'biceps', name: '二头', isSelected: false },
  { id: '6', area: 'triceps', name: '三头', isSelected: false },
  { id: '7', area: 'abs', name: '核心', isSelected: false },
  { id: '8', area: 'all', name: '全身', isSelected: false }
])

const exercises = computed(() => store.exercises)

onMounted(() => {
  // if (store.exercises && store.exercises.length > 0) return
  console.log('获取全部动作列表')
  loadExercises()
})

// function getOptionValues (arr) {
//   // const temp = arr.filter(x => x.isSelected)
//   return arr.filter(x => x.isSelected).map(x => x.value)
// }

function loadExercises (query = null, areas = null) {
  // 开启loading
  // isLoading.value = true
  // if (!query && !areas) {
  //   return request.get('/exercise/all')
  //     .then(res => {
  //       store.setExercises(res.data.data)
  //       // isLoading.value = false
  //       console.log(exercises.value)
  //     })
  //     .catch(err => console.log(err))
  // }
  request.get('/exercise', {
    params: { query, areas }
  })
    .then(res => {
      store.setExercises(res.data.data)
      // isLoading.value = false
      console.log(exercises.value)
    })
    .catch(err => console.log(err))
}

function handleAreaClick (index) {
  selected.value = index
  const areasQuery = areas.value[index].name
  console.log('请求参数', areasQuery)
  loadExercises(headerRef.value.input.trim(), areasQuery)
}

function submit () {
  // 格式化请求参数
  // const query = input.value.trim()
  // console.log('submit', query)
  const areasQuery = areas.value
    .filter(x => x.isSelected)
    .map(x => x.area)
    .join('&')
  loadExercises(headerRef.value.input.trim(), areasQuery)
}
</script>

<style lang="less" scoped>
[content] {
  margin: 50px 0;
  .title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  aside {
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 0;
    width: 60px;
    padding: 20px 0;
    ul {
      li {
        padding: 10px;
      }
    }
  }

  main {
    margin-left: 50px;
    .ant-btn {
      position: absolute;
      right: -20px;
      border: 0;
      border-radius: 32px 0 0 32px;
      // bottom: 0px;
    }
  }

  .active {
    background-color: #ccc;
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
    line-height: 40px;
    font-size: 1.2rem;
    color: #eee;
    background-color: rgb(90, 90, 90);
  }
}

.spin-wrap {
  justify-content: center;
  align-items: center;
  // height: 100%;
}

</style>
