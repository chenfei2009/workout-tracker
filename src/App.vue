<template>
  <WTTabbar />
  <!-- <WTNavbar /> -->
  <!-- <WTRouter /> -->
  <router-view/>
  <WTSpontaneousWorkout />
  <!-- <nav>
    <router-link to="/home">Home</router-link> |
    <router-link to="/start">Start</router-link>
  </nav> -->
  <!-- <router-view/> -->
</template>

<script setup>
// import WTNavbar from './components/WTNavbar.vue'
// import WTRouter from './components/WTRouter.vue'
import WTTabbar from './components/WTTabbar.vue'
import WTSpontaneousWorkout from './components/WTSpontaneousWorkout.vue'
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  text-rendering: auto;

  // @include custom-scrollbar__light();
  background: @background;
  color: @color;

  // @media #{$isDark} {
  //   @include custom-scrollbar__dark();
  //   background: $background_dark;
  //   color: $color_dark;
  // }

  overflow-x: hidden;
}

body {
  margin: 0;
}

// [class^='interim'] {
//   min-height: 100vh;
// }

[center] {
  text-align: center;
}

[error] {
  color: @error;
}

[alarm] {
  color: @alarm;
}

[success] {
  color: @success;
}

[huge] {
  font-size: 40px;
}

[content] {
  padding-top: 20px;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
  padding-left: calc(5vw + env(safe-area-inset-left));
  padding-right: calc(5vw + env(safe-area-inset-right));
  // @media #{$isMobile} {
  //   padding-bottom: calc(70px + env(safe-area-inset-bottom));
  // }
}

[max-width] {
  max-width: 800px;
  margin: 0 auto;
}

[line-break] {
  white-space: pre-line;
}

[cursor] {
  cursor: pointer;
}

[transition] {
  transition: all 0.2s ease-in-out;
}

[banner] {
  color: #fff;
  position: relative;
  height: 240px;
  overflow: hidden;
  img {
    width: 100%;
  }
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-top: env(safe-area-inset-top);
    color: #fff;
  }
}

[flow] {
  display: flex;
}

.wt-graph-card {
  background: @paragraph;
  // @media (prefers-color-scheme: dark) {
  //   background: $paragraph_dark;
  // }
  padding: 10px;
  // border-radius: #{1.5 * $border-radius};
}
</style>
