import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import profilePlugin from './plugins/profile'
import gameConfig from './plugins/gameConfig'

const app = createApp(App)

app.use(router)
app.use(profilePlugin)
app.use(gameConfig, { length: 5, maxAttempts: 12 }) 

app.mount('#app')
