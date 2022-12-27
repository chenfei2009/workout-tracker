<template>
  <div class="wt-router">
    <transition :name="transitionName" :mode="transitionMode">
      <keep-alive :include="[keepAlive && $route.name]">
        <router-view :fullscreen="fullscreen" class="sub-view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script setup>
// import { getDepth } from '@/utils/functions';

import router from '@/router'
import { computed, onMounted, ref } from 'vue'

const transitionName = ref('slide-bottom')
const transitionMode = ref('out-in')

const keepAlive = computed(() => {
  return Object.keys(router.currentRoute.value.params).length === 0
})

const fullscreen = computed(() => {
  return router.currentRoute.meta.fullscreen
})

onMounted(() => {
  // this.$router.beforeEach((to, from, next) => {
  //   const toDepth = getDepth(to)
  //   const fromDepth = getDepth(from)
  //   const toPath = to.fullPath.split('/').slice(0, 2)
  //   const fromPath = from.fullPath.split('/').slice(0, 2)
  //   this.$store.commit('savePosition')
  //   this.transitionMode = null
  //   if (to.meta.fullscreen) {
  //     this.transitionMode = 'in-out';
  //     this.transitionName = 'slide-fullscreen'
  //   } else if (from.meta.fullscreen) {
  //     this.transitionMode = 'in-out'
  //     this.transitionName = 'slide-fullscreen'
  //   } else if (fromPath.join('/') !== toPath.join('/')) {
  //     this.transitionMode = null;
  //     this.transitionName = 'slide-bottom'
  //   } else {
  //     this.transitionMode = null;
  //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   }
  //   next()
  // })
})
</script>

<style lang="less" scoped>
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(60px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-60px, 0);
}

.slide-bottom-enter {
  opacity: 0;
  transform: translate(0, 100px);
}

.slide-bottom-enter-active,
.slide-bottom-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-fullscreen-leave-to,
.slide-fullscreen-enter {
  opacity: 0;
  transform: translate(0, 100%);
  border-radius: 50vw;
}
.slide-fullscreen-enter {
  z-index: 12;
}

.wt-router {
  position: relative;
  max-width: 100vw;
  .sub-view {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 10;

    background-color: @background;
    // @media #{$isDark} {
    //   background-color: $background_dark;
    // }

    &[fullscreen] {
      transition: all 0.71s cubic-bezier(0.55, 0, 0.1, 1);
      z-index: 11;
    }
  }
}
</style>
