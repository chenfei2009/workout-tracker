import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'

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
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    //   imports: ['vue', 'vue-router'],
    //   eslintrc: {
    //     enabled: false, //解决自动导入和eslint冲突，第一次为true，之后为false
    //     filepath: './eslintrc-auto-import.json',
    //     globalsPropValue: true
    //   }
    // }),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),
    // 添加下面这块
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  define: {
    // 'process.env': {},
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
