import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// naive-ui
import {
  create,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NCard,
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NForm,
    NFormItem,
    NInput,
    NCard,
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider
  ]
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(naive)

app.mount('#app')