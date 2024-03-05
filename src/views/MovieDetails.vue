<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, onUnmounted, ref} from "vue";
import axios from "axios";
import IconBtn from "@/components/iconBtn.vue";

const api_url = 'https://localhost:8000';
const route = useRoute();
const router = useRouter();
const token = localStorage.getItem('token');
const id = route.params.id;
let actorsFetching = ref({});
let categoriesFetching = ref({});
let movieDetails = ref({});
let showDeleteMessage = ref(false);
let editedMovie = ref({});


onMounted(async () => {
  const moviesResponse = await axios.get(`${api_url}/api/movies/${id}`, {headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  movieDetails.value = moviesResponse.data
  console.log(movieDetails)
  const actorsPromises = movieDetails.value.actor.map(async actorURL => {
    const actorResponse = await axios.get(`${api_url}${actorURL}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return actorResponse.data;
  });

  actorsFetching.value = await Promise.all(actorsPromises);

  const categoryResponse = await axios.get(`${api_url}${movieDetails.value.category}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  categoriesFetching.value = categoryResponse.data;
  console.log(categoriesFetching)
});

const closeDeletePopup = () => {
  document.querySelector('.delete-form').style.display = 'none';
}

const deletePopup = () => {
  document.querySelector('.delete-form').style.display = 'block'
}

const closeEditPopup = () => {
  document.querySelector('.edit-form').style.display = 'none';
}

const editPopup = () => {
  document.querySelector('.edit-form').style.display = 'block'
  editedMovie.value = { ...movieDetails.value };
}


const submitEditForm = async () => {
  await axios.put(`${api_url}/api/movies/${id}`, editedMovie.value, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const updatedMovieResponse = await axios.get(`${api_url}/api/movies/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  movieDetails.value = updatedMovieResponse.data;

  closeEditPopup();
}

const deleteMovie = async (movieId) => {
  await axios.delete(`${api_url}/api/movies/${movieId}`, {headers: {'Authorization': `Bearer ${token}`}})
  showDeleteMessage.value = true; // Afficher le message de suppression
  setTimeout(() => {
    showDeleteMessage.value = false; // Masquer le message après un certain temps
    router.go(-1);
  }, 2000);
}

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
            <icon-btn icon="edit" text="Edit" @click="editPopup"/>
            <icon-btn icon="delete" text="Delete" @click="deletePopup"/>
          </div>
        </div>
        <h3 v-if="movieDetails.releaseDate">Release Date: {{movieDetails.releaseDate.substring(0,4)}}</h3>
        <h3>Length: {{movieDetails.duration}}</h3>
        <h3>Genre: {{categoriesFetching.name}}</h3>
        <h2>What is this movie about?</h2>
        <p>{{movieDetails.description}}</p>
        <hr>
        <h2>Cast</h2>
        <div class="not-logged-in" v-if="!token">
          <h1>Sign in to see more!</h1>
          <iconBtn text="Sign In" url="login"/>
        </div>
        <div class="actors-row" v-else>
          <div class="actor-container" v-for="actor in actorsFetching">
            <router-link :to="{name: 'actorsDetails', params: {id: actor.id}}">
              <div class="actor-poster"></div>
              <h3>{{actor.firstName}} {{actor.lastName}}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="form-bg delete-form">
    <div class="form-fg">
      <div class="popup-header">
        <h1>Delete</h1>
        <button @click="closeDeletePopup"><span class="material-symbols-outlined">close</span></button>
      </div>
      <icon-btn icon="" text="Delete" @click="deleteMovie(movieDetails.id)"/>
      <icon-btn icon="" text="Cancel" @click="closePopup"/>
      <div v-if="showDeleteMessage" class="delete-message">
        <p style="color: green">Le film a été supprimé avec succès.</p>
      </div>
    </div>
  </div>
  <div class="form-bg edit-form">
    <div class="form-fg">
      <div class="popup-header">
        <h1>Edit</h1>
        <button @click="closeEditPopup"><span class="material-symbols-outlined">close</span></button>
      </div>
      <form @submit.prevent="submitEditForm">
        <label for="title">Title</label>
        <input type="text" name="title" v-model="editedMovie.title">
        <label for="about">About</label>
        <textarea name="about" id="" cols="30" rows="10" v-model="editedMovie.description"></textarea>
        <label for="releaseDate">Release Date</label>
        <input type="text" name="releaseDate" v-model="editedMovie.releaseDate">
        <label for="title">Duration</label>
        <input type="text" required pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}" title="Write a duration in the format hh:mm:ss" v-model="editedMovie.duration">
        <input type="submit" value="Edit this Movie">
      </form>
      <div v-if="showDeleteMessage" class="delete-message">
        <p style="color: green">Le film a été modifié avec succès.</p>
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
            h3 {
              margin-top: 10px;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .form-bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px);
    background-color: rgb(0,0,0,0.5);
    .form-fg {
      .popup-header {
        display: flex;
        justify-content: space-between;
        button {
          background-color: transparent;
          border: none;
          transition: all 200ms ease-in-out;
          &:hover {
            color: #834AFF;
            cursor: pointer;
            transform: rotate(90deg);
          }
          span {
            font-size: 32px;
          }
        }
      }
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 50px;
      width: 700px;
      background-color: white;
      input {
        margin-top: 5px;
        margin-bottom: 5px;
        width: 100%;
      }
      input[type="submit"] {
        background-color: #1a1a1a;
        color: white;
        &:hover {
          cursor: pointer;
          background-color: #834AFF;
          &:active {
            background-color: #6638c7;

          }
        }
      }
      textarea {
        width: 100%;
        height: 100px;
      }
    }
  }
</style>