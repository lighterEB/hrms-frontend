import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  create,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NIcon,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NSpace,
  NDropdown,
  NAvatar,
  NCard,
  NRadio,
  NRadioGroup,
  NModal,
  NMessageProvider,
  NStatistic,
  NNumberAnimation,
  NGrid,
  NGridItem,
  NList,
  NListItem,
  NThing,
  NText,
  NCheckbox,
  NEmpty,
  NSelect,
  NDataTable
} from 'naive-ui'

import App from './App.vue'
import router from './router'
import message from './utils/message'

import './style.css'

const naive = create({
  components: [
    NButton,
    NForm,
    NFormItem,
    NInput,
    NInputGroup,
    NIcon,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NMenu,
    NSpace,
    NDropdown,
    NAvatar,
    NCard,
    NRadio,
    NRadioGroup,
    NModal,
    NMessageProvider,
    NStatistic,
    NNumberAnimation,
    NGrid,
    NGridItem,
    NList,
    NListItem,
    NThing,
    NText,
    NCheckbox,
    NEmpty,
    NSelect,
    NDataTable
  ]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

// 挂载全局消息API
app.config.globalProperties.$message = message

app.mount('#app')