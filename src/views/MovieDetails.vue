<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import IconBtn from "@/components/iconBtn.vue";

const route = useRoute();
const token = localStorage.getItem('token');
const id = route.params.id;
let actorsFetching = ref({});
let categoriesFetching = ref({});
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

  const categoryResponse = await axios.get(`https://127.0.0.1:8000${movieDetails.value.category}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  categoriesFetching.value = categoryResponse.data;
  console.log(categoriesFetching)
});

</script>

<template>
  <div class="content-view">
    <div class="movie-details-container">
      <div class="poster-details">
      </div>
      <div class="movie-metadata">
        <div class="movie-metadata-header" style="display: flex; justify-content: space-between;">
          <h1>{{movieDetails.title}}</h1>
          <div style="display: flex; gap: 10px;">
            <icon-btn icon="edit" text="Edit"/>
            <icon-btn icon="delete" text="Delete" />
          </div>
        </div>
        <h3 v-if="movieDetails.releaseDate">Release Date: {{movieDetails.releaseDate.substring(0,4)}}</h3>
        <h3>Length: {{movieDetails.duration}}</h3>
        <h3>Genre: {{categoriesFetching.name}}</h3>
        <h2>What is this movie about?</h2>
        <p>{{movieDetails.description}}</p>
        <hr>
        <h2>Actors</h2>
        <div class="not-logged-in" v-if="!token">
          <h1>Sign in to see more!</h1>
          <iconBtn text="Sign In" url="login"/>
        </div>
        <div class="actors-row" v-else>
          <div class="actor-container" v-for="actor in actorsFetching">
            <router-link :to="{name: 'actorsDetails', params: {id: actor.id}}">
              <h3>{{actor.firstName}}</h3>
              <h3>{{actor.lastName}}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .content-view {
    display: flex;
    padding: 150px 200px;
    .movie-details-container {
      display: flex;
      gap: 50px;
      width: fit-content;
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