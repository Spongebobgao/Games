
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/flipCard',
      name: 'flipCard',
      component: FlipCard
    }
  ]
})

export default router
