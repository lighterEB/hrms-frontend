import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      dts: true,
      resolvers: [
        // 自动导入 naive-ui 组件
        name => {
          if (name.startsWith('N')) {
            return { name, from: 'naive-ui' }
          }
        }
      ]
    })
  ],
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
