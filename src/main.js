import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import profilePlugin from './plugins/profile'

const app = createApp(App)

app.use(router)
app.use(profilePlugin)

app.mount('#app')
