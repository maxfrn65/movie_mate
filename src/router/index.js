import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Actors from '../views/Actors.vue'
import Categories from '../views/Categories.vue'
import Search from "@/views/Search.vue";
import Login from "@/views/Login.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import ActorsDetails from "@/views/ActorsDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movies/:id',
      name: 'moviesDetails',
      component: MovieDetails,
      props: true
    },
    {
      path: '/actors',
      name: 'actors',
      component: Actors
    },
    {
      path:'/actors/:id',
      name: 'actorsDetails',
      component: ActorsDetails,
      props: true
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
    },
  ]
})

export default router
