<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<script setup lang="ts">
// 这里是组件逻辑
</script>

<style>
/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100%;
}

/* 移除列表样式 */
ul, ol {
  list-style: none;
}

/* 移除链接下划线 */
a {
  text-decoration: none;
}
</style>