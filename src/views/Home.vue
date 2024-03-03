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
  <div>
    <h1>Trending Movies</h1>
    <div class="homepage-div">
      <div v-if="moviesData['hydra:member']" v-for="movie in moviesData['hydra:member'].slice(0,5)">
        <router-link :to="{name: 'moviesDetails', params: {id: movie.id}}">
          <div>
            <img src="" alt="">
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.releaseDate.substring(0,4) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <hr>
  <div>
    <h1>Trending Actors</h1>
    <div class="homepage-div">
      <div v-if="actorsData['hydra:member']" v-for="actor in actorsData['hydra:member'].slice(0,5)">
        <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
        <p>{{ actor.description }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage-div {
  display: flex;
  margin: 20px;
  gap: 20px;
}
a {
  text-decoration: none;
  color: black;
  &:hover {
    color: #834AFF;
  }
}
</style>