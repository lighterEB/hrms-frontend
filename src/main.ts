import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  create,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NMenu,
  NDropdown,
  NAvatar,
  NIcon,
  NStatistic,
  NNumberAnimation,
  NMessageProvider
} from 'naive-ui'

import App from './App.vue'
import router from './router'

// 创建 Naive UI 实例
const naive = create({
  components: [
    NButton,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    NMenu,
    NDropdown,
    NAvatar,
    NIcon,
    NStatistic,
    NNumberAnimation,
    NMessageProvider
  ]
})

const app = createApp(App)
const pinia = createPinia()

// 注册插件
app.use(router)
app.use(pinia)
app.use(naive)

app.mount('#app')