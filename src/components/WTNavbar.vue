<template>
  <!-- :dark="$store.getters.darkmode" -->
  <div
    flow
    class="wt-nav-bar"
    :fadeout="router.currentRoute.value.meta.fullscreen"
  > 
    <div class="left" flow>
      <object data="pwa/maskIcon.svg" type="image/svg+xml" />
      <span>健身记录助手</span>
    </div>
    <!-- <b v-slot:"logo">{{ $route.meta.hero }}</b> -->
    <div class="right" flow>
      <!-- 发现训练 -->
      <div class="nav-bar-item" @click="router.push('/workouts')">
        <span class="iconfont icon-share"></span>
        <span>发现</span>
      </div>

      <!-- 动作库 -->
      <div class="nav-bar-item" @click="router.push('/exercises')">
        <span class="iconfont icon-menu"></span>
        <span>动作</span>
      </div>

      <!-- 首页 -->
      <div class="nav-bar-item" @click="router.push('/home')">
        <span class="iconfont icon-home"></span>
        <span>开始</span>
      </div>

      <!-- 数据 -->
      <div class="nav-bar-item" @click="router.push('/stats')">
        <span class="iconfont icon-menu"></span>
        <span>数据</span>
      </div>

      <!-- 我的 -->
      <div class="nav-bar-item" v-if="store.isUserValid" @click="router.push('/profile')">
        <span class="iconfont icon-user"></span>
        <span>我的</span>
      </div>

      <!-- 登录 -->
      <div class="nav-bar-item" v-else @click="openFullscreen('Login')">
        <span class="iconfont icon-user"></span>
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useStore } from '@/store/index'
import { openFullscreen } from '@/utils/fullScreen'
// import { computed } from 'vue'
// import { NotificationManagement } from '@/utils/NotificationManagement'

const store = useStore()

// const navProfile = () => {
//   if (router.currentRoute.value.name !== 'profile') router.push({ name: 'profile' })
// }

// const profileNotifications = () => NotificationManagement.getTotalNotifications()
</script>

<style lang="less" scoped>
.wt-nav-bar {
  @isMobile: ~"only screen and (max-width: 850px)";
  @media @isMobile {
    display: none !important;
  }
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: @background_dark;
  // opacity: 0.7;
  color: #fff;
  z-index: 999;
  padding: 0 20px;
  transition: all 0.5s ease-in-out !important;
  &[fadeout] {
    transition-delay: 0.3s !important;
    transform: translateY(calc(-50px - env(safe-area-inset-bottom)));
    opacity: 0;
  }
  .left {
    height: 80px;
    align-items: center;
    font-size: 24px;
    // font-weight: 700;
    font-family: 'Microsoft JhengHei';
    // font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    object {
      width: 60px;
      height: 60px;
      // scale: 0.5;
    }
  }
  .right {
    font-size: 16px;
    gap: 20px;
    .nav-bar-item {
      cursor: pointer;
      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
