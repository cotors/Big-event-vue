import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router'
//pinia:存储token
import { createPinia } from 'pinia'
const pinia = createPinia()
//添加pinia-persistedstate-plugin实现数据持久化存储
import { createPersistedState } from 'pinia-persistedstate-plugin'
//导入中文语言包
import locale from 'element-plus/dist/locale/zh-cn.js'
const persist = createPersistedState()
pinia.use(persist)

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(ElementPlus,{locale})

app.mount('#app')
