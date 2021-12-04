/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-12-04 17:48:42
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-12-04 17:49:37
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/style/style.css"
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(store).use(router).mount('#app')
