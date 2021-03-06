
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import FlipCard from '@/components/FlipCard'
import WhackTheMole from '@/components/WhackTheMole'
import FiveInARow from '@/components/FiveInARow'
import Snake from '@/components/Snake'
import SpaceInvaders from '@/components/SpaceInvaders'
import Frogger from '@/components/Frogger'
import Tetris from '@/components/Tetris'



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
      path: '/fiveInARow',
      component: FiveInARow
    },
    {
      path: '/snake',
      component: Snake
    },
    {
      path: '/spaceInvaders',
      component: SpaceInvaders
    },
    {
      path: '/frogger',
      component: Frogger
    },
    {
      path: '/tetris',
      component: Tetris
    }
  ]
})

export default router
