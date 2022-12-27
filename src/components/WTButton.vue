<template>
  <div
    class="wt-button"
    :class="{ 'wt-button__frosted': frosted }"
    cursor
    transition
    @click="handleClick"
  >
    <span v-if="icon" class="iconfont" :class="'icon-'+icon"></span>
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script setup>
import router from '@/router'

const $route = router.currentRoute.value

const props = defineProps({
  icon: String,
  title: String,
  to: Object,
  routeName: String,
  frosted: Boolean
})

const navigate = to => {
  if ($route.name === to.name) return
  router.push(to)
}

const handleClick = () => {
  if (props.to && props.to.name) {
    navigate(props.to)
  } else if (props.routeName) {
    navigate({ name: props.routeName })
  }
  // this.$emit('click', e);
}
</script>

<style lang="less" scoped>
.wt-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: @border-radius;

  background: @container;
  // &__frosted {
  //   @include backdrop-blur(@container);
  // }
  // @media #{$isDark} {
  //   background: $container_dark;
  //   &__frosted {
  //     @include backdrop-blur($container_dark);
  //   }
  // }

  &:hover,
  &:active {
    transform: scale(1.0174);
    box-shadow: 1px 2px 3px rgba(#111, 0.12);
  }

  i,
  span {
    margin: 0 5px;
  }
  span {
    font-weight: 500;
    white-space: nowrap;
  }
}
</style>
