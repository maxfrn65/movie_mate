<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const api_url = 'https://cb-be.maximefourna.fr';
const moviesData = ref([]);
const actorsData = ref([]);
onMounted(async () => {
  const moviesResponse = await axios.get(`${api_url}/api/movies?page=1`)
  moviesData.value = moviesResponse.data
  console.log(moviesData.value)
  const actorsResponse = await axios.get(`${api_url}/api/actors?page=1`)
  actorsData.value = actorsResponse.data
})
</script>

<template>
  <div class="content-view">
    <div>
      <h1>Trending Movies</h1>
      <div class="homepage-div">
        <div v-if="moviesData['hydra:member']" v-for="movie in moviesData['hydra:member'].slice(0,5)">
          <router-link :to="{name: 'moviesDetails', params: {id: movie.id}}">
            <div>
              <div class="poster"></div>
              <h2 v-if="movie.title.length<15">{{movie.title}}</h2>
              <h2 v-else>{{ movie.title.slice(0,15) }}...</h2>
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
        <div class="actor-card" v-if="actorsData['hydra:member']" v-for="actor in actorsData['hydra:member'].slice(0,5)">
          <router-link :to="{name: 'actorsDetails', params: {id: actor.id}}">
          <div class="actor-poster"></div>
          <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
          <p>{{ actor.description }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-view {
  padding: 100px 200px;
}
.homepage-div {
  display: flex;
  margin: 20px;
  gap: 20px;
  .actor-card{
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
}
.actor-card {
  h2 {
    margin-top: 10px;
    text-align: center;
  }
}
a {
  text-decoration: none;
  color: black;
  &:hover {
    color: #834AFF;
  }
}
</style>