<template>
  <div
    class="wt-header"
    transition
    v-if="enhanced"
    :enhanced="enhanced"
    :fullscreen="$route.meta.fullscreen || null"
  >
    <!-- <transition name="back-transition">
      <router-link
        class="back"
        transition
        v-if="!isRoot && backTitle && enhanced"
        :key="backTitle"
        :to="{ name: rootRoute }"
      >
        <span class="iconfont icon-arrow-left-bold"></span>
      </router-link>
    </transition> -->
    <transition name="title-transition">
      <div :key="title" v-if="enhanced" class="title">{{ title }}</div>
    </transition>
    <div
      v-if="fullScreenCloser && enhanced"
      class="full-screen-closer"
      cursor
      transition
      @click="handleClick"
    >
      <span class="iconfont icon-arrow-left-bold"></span>
    </div>
    <!-- <div><slot /></div> -->
  </div>
</template>

<script setup>
import router from '@/router'
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue'

const $route = router.currentRoute

const props = defineProps({
  title: String,
  rootRoute: String,
  backTitle: String,
  trigger: {
    type: Number,
    default: 100
  },
  fullScreenCloser: String
})

const enhanced = ref(window.scrollY > props.trigger)

const isRoot = computed(() => {
  if (!props.rootRoute) return true
  return router.currentRoute.value.name === props.rootRoute
})

onMounted(() => {
  console.log('enhanced初始值', enhanced.value)
  console.log('!isRoot && backTitle', !isRoot.value, props.backTitle)
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll () {
  enhanced.value = window.scrollY > props.trigger
}

function handleClick (e) {
  // console.log('emit click', e)
  if (props.fullScreenCloser) router.push({ name: props.fullScreenCloser })
}
</script>

<style lang="less" scoped>
.wt-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 50px;
  padding: 0 5vw;
  padding-top: env(safe-area-inset-top);
  z-index: 999;

  @media (@isDesktop) {
    &:not([fullscreen]) {
      display: none;
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  a.back {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    span {
      margin-right: 2.5px;
      font-size: 14px;
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-50% + env(safe-area-inset-top) / 2));

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: pre-wrap;

    font-weight: 600;
    font-size: 18px;
  }

  .backdrop-blur(@background);
  // @media #{$isDark} {
  //   @include backdrop-blur($background_dark);
  // }

  &:not([enhanced]) {
    background: transparent;
    backdrop-filter: saturate(100%) blur(0px);
  }

  &[enhanced] {
    a.back {
      color: @success;
    }
  }

  .full-screen-closer {
    font-size: 1.8em;
    opacity: 0.75;
    margin-right: calc(-5vw + 10px);

    &:hover,
    &:active {
      opacity: 1;
    }
  }
}

.title-transition-enter,
.title-transition-leave-active {
  opacity: 0;
  transform: scale(0.8);
}
.title-transition-enter-active,
.title-transition-leave-active {
  transition: all 0.3s ease-in-out;
}

.back-transition-enter,
.back-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.back-transition-enter-active,
.back-transition-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
