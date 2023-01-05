<template>
  <ul>
    <li v-for="(item, index) in dataSource" :key="index" :class="{'active': item.isDone}">
      <div class="list-item index">第{{index + 1}}组</div>
      <!-- 重量 weight -->
      <div class="list-item reps">
        <input type="number" v-model="item.weight" @focus="e => e.currentTarget.select()">
        <span @click="switchUnit(index)">{{item.unit}}</span>
      </div>
      <!-- 次数 reps -->
      <div class="list-item reps">
        <input type="number" v-model="item.reps" @focus="e => e.currentTarget.select()">
        <span>次</span>
      </div>
      <div class="list-item btn" v-if="!item.isDone" @click="repDone(index)">完成</div>
      <div class="list-item btn" v-else @click="dataSource.splice(index, 1)">删除</div>
      <!-- <div class="rest">组间休息</div> -->
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const dataSource = ref([
  {
    weight: null,
    unit: 'kg',
    reps: null,
    time: null,
    isDone: false
  }
])

const switchUnit = index => {
  dataSource.value[index].unit = (dataSource.value[index].unit === 'kg' ? 'lbs' : 'kg')
}

const addSet = () => {
  dataSource.value.push({
    weight: null,
    reps: null,
    time: null,
    distance: null,
    isDone: false
  })
}

const repDone = index => {
  if (!dataSource.value[index].reps && !dataSource.value[index].time) return
  // if (dataSource.value[index].reps <= 0 || dataSource.value[index].time <= 0) return
  dataSource.value[index].weight = dataSource.value[index].weight || 0
  dataSource.value[index].isDone = !dataSource.value[index].isDone
  addSet()
}

defineExpose({ dataSource })
</script>

<style lang="less" scoped>
ul {
  li {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1.5fr 1fr;
    // grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1);
    gap: 0.5rem;
    margin: 10px 0;
    height: 30px;
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
        font-size: 0.9rem;
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
