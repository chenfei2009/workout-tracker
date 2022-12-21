<template>
  <div class="search-workouts">
    <!-- 搜索表头 -->
    <header class="header" flow>
      <div class="title" v-if="!isShowInput">发现训练</div>
      <!-- <input v-else v-model="input" /> -->
      <a-input v-else v-model:value="input" :bordered="false" autofocus @submit="submit" />
      <span class="iconfont icon-search" @click="searchBtnClick"></span>
    </header>

    <!-- 搜索关键词 -->
    <section content v-if="!isLoading && (!state.results || state.results.length===0)">
      <div class="title">训练时长</div>
      <ul class="option-list time-list">
        <li
          v-for="item in timeOptions"
          :key="item.value"
          class="list-item"
          :class="{active: item.isSelected}"
          @click="item.isSelected=!item.isSelected"
        >
          {{item.value}}
        </li>
      </ul>

      <a-divider />

      <div class="title">训练难度</div>
      <ul class="option-list intensity-list">
        <li
          v-for="item in intensityOptions"
          :key="item.value"
          class="list-item"
          :class="{active: item.isSelected}"
          @click="item.isSelected=!item.isSelected"
        >
          {{item.value}}
        </li>
      </ul>

      <a-divider />

      <div class="title">训练部位</div>
      <ul class="option-list area-list">
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

      <a-divider />

      <div class="title">热门分类</div>
      <ul class="cate-list">
        <li
          v-for="item in cateOptions"
          :key="item.value"
          class="list-item"
          :class="{active: item.isSelected}"
          @click="item.isSelected=!item.isSelected"
        >
          {{item.value}}
        </li>
      </ul>
      <div class="fixed-btn" @click="submit">搜 索</div>
    </section>

    <!-- loading -->
    <section class="spin-wrap" content flow v-if="isLoading">
      <a-spin />
    </section>

    <!-- 搜索结果 -->
    <section class="results-wrap" content flow v-else>
      <WTWorkoutPreview
        v-for="w in state.results"
        :key="w._id"
        :workout="w"
      />
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/runtime-core'
import request from '@/utils/request'
import WTWorkoutPreview from '@/components/training/WTWorkoutPreview.vue'

const input = ref('')
const isShowInput = ref(false)
const isLoading = ref(false)

// const formState = reactive({
//   time: null,
//   intensity: null,
//   area: null,
//   cate: null
// })

const state = reactive({
  results: []
})

function searchBtnClick () {
  if (!isShowInput.value) {
    isShowInput.value = true
    // console.log(inputRef)
    // inputRef.value.focus()
  }
}

const timeOptions = reactive([
  { value: '5-15', isSelected: false },
  { value: '15-30', isSelected: false },
  { value: '30-60', isSelected: false },
  { value: '60+', isSelected: false }
])

const intensityOptions = reactive([
  { value: '初级', isSelected: false },
  { value: '中级', isSelected: false },
  { value: '高级', isSelected: false }
])

const areaOptions = reactive([
  { value: '胸', isSelected: false },
  { value: '核心', isSelected: false },
  { value: '肩', isSelected: false },
  { value: '手臂', isSelected: false },
  { value: '背', isSelected: false },
  { value: '臀腿', isSelected: false }
])

const cateOptions = reactive([
  { value: '塑形训练', isSelected: false },
  { value: '热身放松', isSelected: false },
  { value: 'HIIT训练', isSelected: false },
  { value: '增肌训练', isSelected: false },
  { value: '健康改善', isSelected: false },
  { value: '热身放松', isSelected: false },
  { value: '练后拉伸', isSelected: false },
  { value: '器械训练', isSelected: false },
  { value: '其他训练', isSelected: false }
])

function getOptionValues (arr) {
  // const temp = arr.filter(x => x.isSelected)
  return arr.filter(x => x.isSelected).map(x => x.value)
}

function submit () {
  // 格式化请求参数
  const formState = {}
  formState.query = input.value.trim()
  formState.time = getOptionValues(timeOptions)
  formState.intensity = getOptionValues(intensityOptions)
  formState.area = getOptionValues(areaOptions)
  formState.cate = getOptionValues(cateOptions)
  console.log('submit', formState)
  // 开启loading
  isLoading.value = true
  // 发送请求
  request.post('/workout/search', formState)
    .then(res => {
      state.results = res.data.data
      state.results.push(...res.data.data)
      isLoading.value = false
      console.log(state.results)
    })
    .catch(err => console.log(err))
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  height: 50px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: @background;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  font-size: 1.2rem;
  .title {
    font-size: inherit;
    font-weight: 600;
  }
  input {
    flex: 1;
  }
  .ant-input {
    font-size: 16px;
  }
  .icon-search {
    font-size: inherit;
  }
}

[content] {
  margin: 50px 0;
  .title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .option-list {
    display: grid;
    grid-gap: 20px;
    .list-item {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 10px;
      text-align: center;
    }
  }

  .time-list {
    grid-template-columns: repeat(4, 4fr);
    // grid-template-rows: repeat(2, 7rem);
  }

  .intensity-list {
    grid-template-columns: repeat(3, 3fr);
  }

  .area-list {
    grid-template-columns: repeat(3, 3fr);
    grid-template-rows: repeat(2, auto);
  }

  .cate-list {
    display: grid;
    grid-gap: 0;
    grid-template-columns: repeat(3, 3fr);
    grid-template-rows: repeat(2, auto);
    border: 1px solid #ccc;
    border-right: 0;
    border-radius: 10px;
    overflow: hidden;
    .list-item {
      padding: 10px;
      border-right: 1px solid #ccc;
      // border-bottom: 1px solid #000;
      text-align: center;
    }
    :nth-child(-n+6) {
      border-bottom: 1px solid #ccc;
    }
    // :nth-child(n+1) {
    //   border-right: 1px solid #000;
    // }
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

.results-wrap {
  justify-content: center;
  flex-wrap: wrap;
  .wt-preview {
    margin-bottom: 20px;
  }
}
</style>
