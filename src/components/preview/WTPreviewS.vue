<template>
  <div class="wt-preview-small" flow @click="clicked">
    <div class="media" :style="{ width: height + 'px', height: height + 'px' }">
      <slot name="media" />
    </div>
    <div class="container">
      <div class="title">{{ title }}</div>
      <div class="content" flow>
        <slot />
        <div>
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  height: {
    type: Number,
    default: 120
  }
})

const emit = defineEmits(['click'])

const clicked = e => emit('click', e)
</script>

<style lang="less" scoped>
.wt-preview-small {
  position: relative;
  // justify-content: space-between;
  border-radius: @border-radius;
  height: fit-content;
  margin-right: 20px;
  flex-shrink: 0;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: @shadow;
  &:hover {
    box-shadow: @shadow-hover;
  }

  background: @paragraph;
  // background: @paragraph;
  // @media #{@isLight} {
  //   background: $paragraph;
  // }
  // @media #{$isDark} {
  //   background: $color;
  // }

  @media only screen and(max-width: 599px) {
    width: 80vw;
    min-width: 300px;
    max-width: 350px;
  }

  @media only screen and(min-width: 600px) {
    min-width: 350px;
    max-width: 500px;
  }

  .media {
    :deep(img),
    :deep(video) {
      border-radius: @border-radius 0 0 @border-radius;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .container {
    flex-direction: column;
    padding: 15px;
    .title {
      overflow-wrap: break-word;
      font-weight: bold;
      font-size: 1.4em;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .content {
      margin-top: 10px;
      display: flex;
    }
  }
}
</style>
