import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import 'miku-web-app'
import router from './routes/index'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')