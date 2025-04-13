import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'], {
  messageProviderProps: {
    placement: 'top',
    containerStyle: {
      zIndex: 9999
    },
    max: 3,
    duration: 3000,
    keepAliveOnHover: true,
    closable: true
  }
})

// 防止消息重叠，限制相同内容的消息只能显示一次
const messageMap = new Map<string, number>()
const messageTimeout = 300 // 防抖时间（毫秒）

const messageWrapper = {
  success(content: string) {
    if (shouldShowMessage(content)) {
      return message.success(content)
    }
  },
  error(content: string) {
    if (shouldShowMessage(content)) {
      return message.error(content)
    }
  },
  warning(content: string) {
    if (shouldShowMessage(content)) {
      return message.warning(content)
    }
  },
  info(content: string) {
    if (shouldShowMessage(content)) {
      return message.info(content)
    }
  },
  loading(content: string) {
    if (shouldShowMessage(content)) {
      return message.loading(content)
    }
  }
}

function shouldShowMessage(content: string): boolean {
  const now = Date.now()
  if (messageMap.has(content)) {
    const lastTime = messageMap.get(content) || 0
    if (now - lastTime < messageTimeout) {
      return false
    }
  }
  messageMap.set(content, now)
  return true
}

export default messageWrapper