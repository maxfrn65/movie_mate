<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";

const route = useRoute()
const token = localStorage.getItem('token');
const id = route.params.id;
const actorsFetching = ref({});
let movieDetails = ref({});

onMounted(async () => {
  const moviesResponse = await axios.get(`https://127.0.0.1:8000/api/movies/${id}`, {headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  movieDetails.value = moviesResponse.data
  console.log(movieDetails)
  const actorsPromises = movieDetails.value.actor.map(async actorURL => {
    const actorResponse = await axios.get(`https://127.0.0.1:8000${actorURL}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return actorResponse.data;
  });

  actorsFetching.value = await Promise.all(actorsPromises);
})
</script>

<template>
  <div class="content-view">
    <div class="movie-details-container">
      <div class="poster-details">
      </div>
      <div class="movie-metadata">
        <h1>{{movieDetails.title}}</h1>
        <h3 v-if="movieDetails.releaseDate">{{movieDetails.releaseDate.substring(0,4)}}</h3>
        <h3>{{movieDetails.duration}}</h3>
        <h2>What is this movie about?</h2>
        <p>{{movieDetails.description}}</p>
        <hr>`
        <h2>Actors</h2>
        <div class="actors-row">
          <div class="actor-container" v-for="actor in actorsFetching">
            <h3>{{actor.firstName}}</h3>
            <h3>{{actor.lastName}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .content-view {
    display: flex;
    margin-top: 50px;
    justify-items: center;
    align-items: center;
    .movie-details-container {
      display: flex;
      gap: 50px;
      p {
        max-width: 50%;
      }
      .movie-metadata {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .actors-row {
          display: flex;
          gap: 50px;
          .actor-container {
            display: flex;
            flex-direction: column;
            h2 {
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>