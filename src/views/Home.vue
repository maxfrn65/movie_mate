<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const moviesData = ref([]);
const actorsData = ref([]);
onMounted(async () => {
  const moviesResponse = await axios.get('https://127.0.0.1:8000/api/movies?page=1')
  moviesData.value = moviesResponse.data
  console.log(moviesData.value)
  const actorsResponse = await axios.get('https://127.0.0.1:8000/api/actors?page=1')
  actorsData.value = actorsResponse.data
})
</script>

<template>
  <div v-if="moviesData['hydra:member']" v-for="movie in moviesData['hydra:member'].slice(0,4)">
    <img src="" alt="">
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.description }}</p>
  </div>
  <hr>
  <div v-if="actorsData['hydra:member']" v-for="actor in actorsData['hydra:member'].slice(0,4)">
    <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
    <p>{{ actor.description }}</p>
  </div>
</template>
