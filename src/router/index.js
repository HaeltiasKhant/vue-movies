import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:type?',
      name: 'home',
      component: HomeView
    },
    {
      path: '/popular/:type?/page-:page?',
      name: 'popular',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Popular.vue')
    },
    {
      path: '/top-rated/:type?/page-:page?',
      name: 'topRated',
      component: () => import('../views/Toprated.vue')
    },
    {
      path: '/search/:type?/:searchName?/page-:page?',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/movie-infos/:id?',
      name: 'movieInfos',
      component: () => import('../views/MovieDetails.vue')
    },
    {
      path: '/tv-infos/:id?',
      name: 'tvInfos',
      component: () => import('../views/TvSeriesDetails.vue')
    },

    {
      path: '/watch/movie/:id?',
      name: 'watchMovie',
      component: () => import('../views/WatchMovie.vue')
    },

    {
      path: '/watch/tv/:id?/:ssNum?/:epiNum?',
      name: 'watchTv',
      component: () => import('../views/WatchTv.vue')
    },
    
    {
      path: '/acc/login',
      name: 'login',
      component: () => import('../views/loginView.vue')
    },
    {
      path: '/acc/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/acc/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/acc/profile/favorites',
      name: 'favorites',
      component: () => import('../views/Favorites.vue')
    },
    {
      path: '/acc/profile/watch-list',
      name: 'watchList',
      component: () => import('../views/WatchList.vue')
    }
  ]
})

export default router
