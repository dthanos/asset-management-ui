import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './config/vuetify'
import router from './config/router'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .mount('#app')
