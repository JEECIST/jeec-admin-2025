import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedState from "pinia-plugin-persistedstate";
import './global.css'
import App from './App.vue'

import router from './router'

const pinia = createPinia();
pinia.use(piniaPersistedState);

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
  
