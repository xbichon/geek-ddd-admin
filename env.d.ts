/// <reference types="vite/client" />

// 为 .vue 单文件组件提供类型声明，解决在 TS 中导入 .vue 的隐式 any 问题
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}