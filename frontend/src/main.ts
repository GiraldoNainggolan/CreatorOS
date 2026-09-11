import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './core/router'
import { setupErrorHandler } from './core/utils/errorHandler'
import faviconUrl from './assets/GN.png'

import './style.css'

// Ensure browser favicon is set to GN.png
const faviconLink = (document.querySelector("link[rel*='icon']") || document.createElement('link')) as HTMLLinkElement
faviconLink.type = 'image/png'
faviconLink.rel = 'icon'
faviconLink.href = faviconUrl
if (!faviconLink.parentNode) {
  document.head.appendChild(faviconLink)
}

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

setupErrorHandler(app)

app.mount('#app')
