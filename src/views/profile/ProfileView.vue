<template>
  <div class="view-profile">
    <div max-width>
      <!-- 瀑布流 -->
      <!-- <masonry :cols="{ default: 2, 600: 1 }" gutter="20px"> -->
      <a-card title="训练">
        <a-list item-layout="horizontal">
          <a-list-item>
            <router-link :to="{ name: 'Workouts' }">训练模板</router-link>
          </a-list-item>
          <a-list-item>
            <router-link :to="{ name: 'TrainingPlan' }">训练计划</router-link>
          </a-list-item>
        </a-list>
      </a-card>
      <br>
      <a-card title="数据">
        <a-list item-layout="horizontal">
          <a-list-item>
            <router-link :to="{ name: 'Statistics' }">训练数据</router-link>
          </a-list-item>
          <a-list-item>
            <router-link :to="{ name: 'Achievements' }">训练成就</router-link>
          </a-list-item>
        </a-list>
      </a-card>
      <br>
      <a-card title="管理">
        <a-list item-layout="horizontal">
          <a-list-item><span>系统设置</span></a-list-item>
        </a-list>
      </a-card>
      <br>
      <a-card title="退出登录" class="signout-btn" @click="signOut"></a-card>
    </div>
  </div>
</template>

<script setup>
import { signOut } from '@/api/auth.js'
</script>

<style lang="less" scoped>
 .ant-card {
   border-radius: @border-radius;
   background-color: rgba(255, 255, 255, 0.5);
 }
</style>
