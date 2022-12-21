<template>
  <ul v-if="type === 'gym'">
    <li v-for="(item, index) in dataSource" :key="index" :class="{'active': item.isDone}">
      <div class="list-item index">第{{index + 1}}组</div>
      <!-- 重量 weight -->
      <div class="list-item weight">
        <input type="number" v-model="item.weight" @focus="e => e.currentTarget.select()">
      </div>
      <!-- 次数 reps -->
      <div class="list-item reps">
        <input type="number" v-model="item.reps" @focus="e => e.currentTarget.select()">
        <span>次</span>
      </div>
      <div class="list-item btn" @click="isDoneClick(index)">
        {{item.isDone ? '已完成' : '完成'}}
      </div>
      <div class="list-item btn" @click="dataSource.splice(index, 1)">删除</div>
      <!-- <div class="rest">组间休息</div> -->
    </li>
    <li>
      <div class="list-item" @click="addSet">添加组</div>
    </li>
  </ul>

  <ul v-else>
    <li v-for="(item, index) in dataSource" :key="index" :class="{'active': item.isDone}">
      <div class="list-item index">第{{index + 1}}组</div>
      <!-- 距离 weight -->
      <div class="list-item distance">
        <input type="number" v-model="item.distance" @focus="e => e.currentTarget.select()">
        <span>km</span>
      </div>
      <!-- 时长 reps -->
      <div class="list-item time">
        <input type="number" v-model="item.time" @focus="e => e.currentTarget.select()">
      </div>
      <!-- <div class="list-item time">
        <span>秒</span>
      </div> -->
      <div class="list-item btn" @click="isDoneClick(index)">
        {{item.isDone ? '已完成' : '完成'}}
      </div>
      <div class="list-item btn" @click="dataSource.splice(index, 1)">删除</div>
      <!-- <div class="rest">组间休息</div> -->
    </li>
    <li>
      <div class="list-item" @click="addSet">添加组</div>
    </li>
  </ul>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'gym'
  }
})

const dataSource = ref([
  {
    weight: null,
    reps: null,
    time: null,
    distance: null,
    isDone: false
  }
])

const addSet = () => {
  dataSource.value.push({
    weight: null,
    reps: null,
    time: null,
    distance: null,
    isDone: false
  })
}

const isDoneClick = index => {
  if (!dataSource.value[index].reps && !dataSource.value[index].time) return
  // if (dataSource.value[index].reps <= 0 || dataSource.value[index].time <= 0) return
  dataSource.value[index].weight = dataSource.value[index].weight || 0
  dataSource.value[index].isDone = !dataSource.value[index].isDone
}

defineExpose({
  dataSource
})
</script>

<style lang="less" scoped>
ul {
  li {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1);
    gap: 0.5rem;
    margin: 10px 0;
    height: 40px;
    font-size: 1rem;
    .list-item {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: @border-radius;
    }
    input {
      width: 100%;
      height: 100%;
      border: 0;
      outline: 0;
      text-align: center;
      background: none;
    }
    .reps {
      span {
        margin-left: 5px;
        margin-right: 15px;
        font-size: 0.6rem;
        opacity: .7;
      }
      input {
        text-align: right;
      }
    }
  }
  .active {
    .list-item {
      background-color: rgb(200, 200, 200);
    }
  }
}
</style>
