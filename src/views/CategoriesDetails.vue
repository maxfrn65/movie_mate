<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import IconBtn from "@/components/iconBtn.vue";

const route = useRoute();
const token = localStorage.getItem('token');
const id = route.params.id;
let categoriesDetails = ref({});
let moviesFetching = ref({});


onMounted(async () => {
  const categoriesResponse = await axios.get(`https://127.0.0.1:8000/api/categories/${id}`, {headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  categoriesDetails.value = categoriesResponse.data;
  console.log(categoriesDetails)

  const moviesPromises = categoriesDetails.value.movies.map(async movieURL => {
    const movieResponse = await axios.get(`https://127.0.0.1:8000${movieURL}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return movieResponse.data;
  });

  moviesFetching.value = await Promise.all(moviesPromises);
  console.log(moviesFetching)
});



</script>

<template>
  <div class="content-view">
    <div class="movie-details-container">
      <div class="movie-metadata">
        <div class="movie-metadata-header" style="display: flex; justify-content: space-between;">
          <h1>{{categoriesDetails.name}}</h1>
          <div style="display: flex; gap: 10px;">
            <icon-btn icon="edit" text="Edit"/>
            <icon-btn icon="delete" text="Delete" />
          </div>
        </div>
        <hr>
        <div class="actors-row">
          <div class="actor-container" v-for="movie in moviesFetching">
            <router-link :to="{name: 'moviesDetails', params: {id: movie.id}}">
              <div class="poster"></div>
              <h3>{{movie.title}}</h3>
              <h3>{{movie.releaseDate.slice(0,4)}}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-view {
  padding: 150px 200px;
  .movie-details-container {
    display: flex;
    gap: 50px;
    .movie-metadata {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: 80%;
      .actors-row {
        display: flex;
        gap: 50px;
        flex-wrap: wrap;
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