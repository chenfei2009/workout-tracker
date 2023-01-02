<template>
  <!-- <tc-tabbar :moveout="$route.meta.fullscreen" :dark="$store.getters.darkmode" /> -->
  <tab-bar :fadeout="$route.meta.fullscreen" class="wt-tabbar">
    <!-- 发现训练 -->
    <tab-bar-item to="/workouts">
      <template v-slot:item-icon>
        <span class="iconfont icon-share"></span>
      </template>
      <template v-slot:item-text>
        <span>发现</span>
      </template>
    </tab-bar-item>

    <!-- 动作库 -->
    <tab-bar-item to="/exercises">
      <template v-slot:item-icon>
        <span class="iconfont icon-menu"></span>
      </template>
      <template v-slot:item-text>
        <span>动作</span>
      </template>
    </tab-bar-item>

    <!-- 首页 -->
    <tab-bar-item to="/home">
      <template v-slot:item-icon>
        <span class="iconfont icon-home"></span>
      </template>
      <template v-slot:item-text>
        <span>开始</span>
      </template>
    </tab-bar-item>

    <!-- 数据 -->
    <tab-bar-item to="/stats">
      <template v-slot:item-icon>
        <span class="iconfont icon-menu"></span>
      </template>
      <template v-slot:item-text>
        <span>数据</span>
      </template>
    </tab-bar-item>

    <!-- 我的 -->
    <tab-bar-item to="/profile" v-if="store.isUserValid">
      <template v-slot:item-icon>
        <span class="iconfont icon-user"></span>
      </template>
      <template v-slot:item-text>
        <span>我的</span>
      </template>
    </tab-bar-item>

    <!-- 登录 -->
    <tab-bar-item to="/login" v-else>
      <template v-slot:item-icon>
        <span class="iconfont icon-user"></span>
      </template>
      <template v-slot:item-text>
        <span>登录</span>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script setup>
import router from '@/router'
import { useStore } from '@/store/index'

import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'

const $route = router.currentRoute
const store = useStore()

// export default class FHTabbar extends Vue {
//   get profileNotifications(): number {
//     return NotificationManagement.getTotalNotifications();
//   }
// }
</script>

<style lang="less" scoped>
.wt-tabbar {
  @isDesktop: ~"only screen and (min-width: 851px)";
  @media @isDesktop {
    display: none !important;
  }
  // @media only screen and(min-width: 851px) {
  //   display: none !important;
  // }
  // @media (@isDesktop) {
  //   display: none !important;
  // }
  transition: all 0.5s ease-in-out !important;
  &[fadeout] {
    transform: translateY(calc(50px + env(safe-area-inset-bottom)));
    opacity: 0;
  }
}
</style>
