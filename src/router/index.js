import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Actors from '../views/Actors.vue'
import Categories from '../views/Categories.vue'
import Search from "@/views/Search.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/actors',
      name: 'actors',
      component: Actors
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
