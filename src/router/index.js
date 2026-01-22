import { createRouter, createWebHistory } from 'vue-router'
import { pseudo } from '../plugins/profile'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import StatsView from '../views/StatsView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/game', name: 'Game', component: GameView },
  { path: '/stats', name: 'Stats', component: StatsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Home' && !pseudo.value) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
