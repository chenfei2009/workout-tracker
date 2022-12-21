import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      }
    ]
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    })
  ],
  define: {
    'process.env': {
      'BASE_URL': "./"
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      // less: {
      //   charset: false,
      //   additionalData: `@import "${resolve(__dirname,'src/assets/_variables.less')}";`,
      //   additionalData: `@import "${resolve(__dirname,'src/assets/_mixins.less')}";`
      // }
      less: {
        additionalData: `@import "${resolve(__dirname,'src/assets/_mixins.less')}";`,
        modifyVars: {
          hack: `true; @import (reference) "${resolve("src/assets/_variables.less")}";`,
        },
        javascriptEnabled: true,
      }
    }
  }
})
