
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import FlipCard from '@/components/FlipCard'
import WhackTheMole from '@/components/WhackTheMole'
import ConnectFour from '@/components/ConnectFour'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/flipCard',
      component: FlipCard
    },
    {
      path: '/whackTheMole',
      component: WhackTheMole
    },
    {
      path: '/connectFour',
      component: ConnectFour
    }
  ]
})

export default router
