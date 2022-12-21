<template>
  <div class="login-view">
    <!-- <WTHeader title="Login">
      <div>login</div>
      <FHFullScreenCloser @click="$cFS('home')" />
    </WTHeader> -->

    <WTSwipeable @swipeDown="closeFullscreen('Home')">
      <div flow>
        <img src="pwa/maskIcon.svg" height="70" alt="" />
        <h1>Welcome!</h1>
      </div>
    </WTSwipeable>

    <!-- 登录表单 -->
    <transition name="login">
      <section class="form-wrap" v-if="formState.type === 'login'">
        <form @submit.prevent="onSignIn">
          <input
            ref="inputRef"
            v-model="formState.email"
            placeholder="请输入邮箱"
          />
          <input
            type="password"
            v-model="formState.password"
            placeholder="请输入密码"
          />
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
          >登 录</a-button>
          <div class="switch-btn">
            <span @click="formState.type='register'">点击注册</span>
            <span class="error-msg">{{errorMsg}}</span>
          </div>
        </form>
      </section>
    </transition>

    <!-- 注册表单 -->
    <transition name="register">
      <section class="form-wrap" v-if="formState.type === 'register'">
        <form @submit.prevent="onSignUp">
          <input
            ref="inputRef"
            v-model="formState.email"
            @blur="onBlur"
            placeholder="请输入邮箱"
          />
          <input
            type="password"
            v-model="formState.password"
            placeholder="请输入密码"
          />
          <input
            type="password"
            v-model="formState.confirm"
            placeholder="请确认密码"
          />
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
          >注 册</a-button>
          <div class="switch-btn">
            <span @click="formState.type='login'">点击登录</span>
            <span class="error-msg">{{errorMsg}}</span>
          </div>
        </form>
      </section>
    </transition>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from '@vue/runtime-core'

import WTSwipeable from '@/components/WTSwipeable.vue'
import { closeFullscreen } from '@/utils/fullScreen'
import { signIn, signUp, vertifyEmail } from '@/api/auth'

const formState = reactive({
  email: '460461118@qq.com',
  password: '123456',
  confirm: '',
  remember: true,
  type: 'login'
})

const errorMsg = ref('')
const inputRef = ref(null)

/* 登录表单提交事件 */
const onSignIn = () => signIn(formState)

/* 注册表单提交事件 */
const onSignUp = () => signUp(formState)

const onBlur = () => vertifyEmail(formState.email)

const disabled = computed(() => {
  return !(formState.email && formState.password)
})

onMounted(() => inputRef.value.focus())

</script>

<style lang="less" scoped>
.login-view {
  position: relative;
  min-height: 100vh;
  color: #fff;
  padding-bottom: 80px;
  // z-index: 10;
  // overflow: hidden;

  background: linear-gradient(rgba(@color, 0), rgba(@color, 0.5)),
  url('/public/assets/login-bg.webp');
  // filter: blur(10px);
  background-size: cover;
  background-position: center center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    // backdrop-filter: brightness(50%);
    // backdrop-filter: saturate(100%) blur(10px);
  }

  [flow] {
    flex-direction: column;
    padding: calc(50px + env(safe-area-inset-top)) 0;
    // z-index: 11;
    h1 {
      color: #fff;
      margin: 0 auto;
    }
  }

  .form-wrap {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 10vw);
    max-width: 400px;
    padding: 20px;
    border: 0;
    // border-radius: 10px;
    // background: rgba(245, 245, 247, 0.5);
    // backdrop-filter: saturate(100%) blur(10px);
  }

  form {
    input, .ant-btn, .switch-btn {
      width: 100%;
      height: 50px;
      border-radius: 25px;
      margin: 10px 0;
      font-size: 16px;
    }
    input {
      margin: 10px 0;
      padding: 0 25px;
      border: 0;
      color: #fff;
      background-color: rgba(185, 185, 185, 0.5);
      outline: none;
      &::input-placeholder {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
      }
      &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
      }
    }
    .switch-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      font-size: 14px;
    }
  }
}

.login-enter-active, .login-leave-active {
  transition: all .3s ease
}

.login-enter-from, .login-leave-to {
  margin-left: -100vw;
  opacity: 0;
}

// .register-enter-active, .register-leave-active {
//   transition: all .5s
// }

// .register-enter-from, .register-leave-to {
//   transform: translate(240px, -50%);
//   // margin-right: 0;
//   opacity: 0;
// }

.register-enter-active{
  animation: slidein .3s ease;
}
.register-leave-active{
  animation: slidein .3s ease reverse;
}

@keyframes slidein{
  from{
    transform: translate(100vw, -50%);
    opacity: 0;
  }
  to{
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
</style>
