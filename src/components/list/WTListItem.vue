<template>
  <div
    class="wt-list-item"
    transition
    :cursor="to || routeName"
    @click="handleClick"
    flow
  >
    <div class="avatar-wrap" v-if="avatar">
      <a-avatar :size="40" :src="avatar" />
    </div>
    <div class="content">
      <div class="title-wrap">
        <div class="title">{{ title }}</div>
      </div>
      <div class="desc-wrap" flow>
        <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
        <div class="description" v-if="description">{{ description }}</div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'

const props = defineProps({
  avatar: String,
  title: String,
  subtitle: String,
  routeName: String,
  description: String,
  to: Object
})

const emit = defineEmits('itemClick')

const handleClick e => {
  console.log('emit click', e)
  emit('itemClick', e)
  if (props.routeName && !props.to) {
    router.push({ name: props.routeName })
  } else if (props.to) {
    router.push(props.to)
  } else {
    console.log('未传参数，不跳转页面')
  }
}

</script>

<style lang="less" scoped>
.wt-list-item {
  align-items: center;
  padding: 2.5px;
  height: 45px;
  padding-right: 10px;

  border-radius: 50px;
  background: @paragraph;
  // @media #{$isDark} {
  //   background: $paragraph_dark;
  // }
  box-shadow: @shadow;
  &:not(:first-of-type) {
    margin-top: 10px;
  }

  &:hover {
    background: rgba(darken(@paragraph, 20%), 0.5);
    // @media #{$isDark} {
    //   background: rgba(lighten($paragraph_dark, 20%), 0.5);
    // }
  }

  .content {
    flex: 1;
    margin: 5px 10px;
    .title-wrap {
      display: flex;
      // flex-wrap: nowrap;
      // flex-grow: 1;
      &:first-child {
        // display: flex;
        // flex-wrap: nowrap;
        // flex-direction: column;
        // justify-content: flex-start;
        flex-grow: 1;
      }
      &:nth-child(2) {
        margin-left: 5px;
      }
      .title {
        font-weight: 600;
      }
    }
    .desc-wrap {
      justify-content: space-between;
      .subtitle {
        margin-top: 2px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        opacity: 0.75;
        font-size: 15px;
      }
      .description {
        font-style: italic;
      }
    }
  }
}
</style>
