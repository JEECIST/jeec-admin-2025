import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './global.css'
import App from './App.vue'

import router from './router'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
