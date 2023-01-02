<template>
  <div class="view-profile">
    <div class="card-wrap" max-width>
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
        <a-list item-layout="horizontal">
          <a-list-item class="signout-btn" @click="AuthManager.signOut">
            <span>退出登录</span>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { AuthManager } from '@/utils/AuthManager.js'
</script>

<style lang="less" scoped>
.card-wrap {
  @media only screen and (min-width: 851px) {
    display: flex;
    gap: 10px;
    align-items: center;
    .ant-card {
      flex: 1;
    }
  }
}
.ant-card {
  border-radius: @border-radius;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
