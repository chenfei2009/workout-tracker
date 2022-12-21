<template>
  <div class="wt-list">
    <transition-group name="slide">
      <slot />
    </transition-group>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.slide-move,
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(0, 100%);
}
.slide-leave-to {
  transform: translate(0, -100%);
  opacity: 0;
}
</style>
