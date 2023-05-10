import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import VueTelegram from "vue-tg";

createApp(App).use(store, VueTelegram).mount('#app')