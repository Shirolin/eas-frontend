import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData:
          '@import "@/assets/styles/variables.less";@import "@/assets/styles/base.less";',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        // 匹配所有以 /api 开头的请求
        target: 'http://127.0.0.1:8087', // 后端服务器地址
        changeOrigin: true, // 必须设置，用于欺骗服务器请求的来源
        // rewrite: (path) => path.replace(/^\/api/, ''), // 可选，重写路径，去掉 /api 前缀
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
