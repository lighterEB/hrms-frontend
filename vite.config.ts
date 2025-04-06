import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // 请将此处改为您的实际后端服务地址
        target: 'http://localhost:8080',
        changeOrigin: true,
        // 不进行路径重写，保留 /api 前缀
        rewrite: (path) => path
      }
    }
  }
})
