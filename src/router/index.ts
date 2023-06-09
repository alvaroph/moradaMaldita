import { createRouter, createWebHistory } from 'vue-router'
import TableroJuego from '../views/TableroJuego.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TableroJuego
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SobreJuego.vue')
    }
  ]
})

export default router
