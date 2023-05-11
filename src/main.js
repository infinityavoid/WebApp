import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import 'miku-web-app'

createApp(App).use(store).mount('#app')