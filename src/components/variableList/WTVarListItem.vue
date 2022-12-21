<template>
  <router-link v-if="route" class="wt-var-list-item" transition :to="route">
    <span>{{ title }}</span>
    <slot />
  </router-link>
  <span v-else class="wt-var-list-item" transition>
    <span>{{ title }}</span>
    <slot />
  </span>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: String,
  routeName: String,
  to: Object // Location
})

const route = computed(() => {
  const to = props.to
  if (props.routeName && !to) {
    to.value = { name: props.routeName }
  }
  return to || null
})
</script>

<style lang="less" scoped>
.wt-var-list-item {
  padding: 5px 10px;
  margin: 0 5px 10px;
  border-radius: @border-radius;
  flex-grow: 1;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  background: @container;
  color: rgba(@color, 0.75);
  // @media #{$isDark} {
  //   background: $container_dark;
  //   color: rgba($color_dark, 0.75);
  // }

  &:hover {
    color: rgba(@color, 0.75);
    // @media #{$isDark} {
    //   color: rgba($color_dark, 1);
    // }
    transform: scale(1.0174);
  }
}
</style>
