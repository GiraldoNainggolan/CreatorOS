import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './core/router'
import { setupErrorHandler } from './core/utils/errorHandler'

import './style.css'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

setupErrorHandler(app)

app.mount('#app')
