<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import IconBtn from "@/components/iconBtn.vue";

const api_url = 'http://cb-be.maximefourna.fr';
const route = useRoute();
const router = useRouter();
const token = localStorage.getItem('token');
const id = route.params.id;
let categoriesDetails = ref({});
let moviesFetching = ref({});
let editedCategory = ref({});
let showDeleteMessage = ref(false);


onMounted(async () => {
  const categoriesResponse = await axios.get(`${api_url}/api/categories/${id}`, {headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  categoriesDetails.value = categoriesResponse.data;
  console.log(categoriesDetails)

  const moviesPromises = categoriesDetails.value.movies.map(async movieURL => {
    const movieResponse = await axios.get(`${api_url}${movieURL}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return movieResponse.data;
  });

  moviesFetching.value = await Promise.all(moviesPromises);
  console.log(moviesFetching)
});

const closeDeletePopup = () => {
  document.querySelector('.delete-form').style.display = 'none';
}

const closeEditPopup = () => {
  document.querySelector('.edit-form').style.display = 'none';
}

const editPopup = () => {
  document.querySelector('.edit-form').style.display = 'block'
  editedCategory.value = { ...categoriesDetails.value };
}

const submitEditForm = async () => {
  await axios.put(`${api_url}/api/categories/${id}`, editedCategory.value, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const updatedCategoryResponse = await axios.get(`${api_url}/api/categories/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  categoriesDetails.value = updatedCategoryResponse.data;
  closeEditPopup();
}
</script>

<template>
  <div class="content-view">
    <div class="movie-details-container">
      <div class="movie-metadata">
        <div class="movie-metadata-header" style="display: flex; justify-content: space-between;">
          <h1>{{categoriesDetails.name}}</h1>
          <div style="display: flex; gap: 10px;">
            <icon-btn icon="edit" text="Edit" @click="editPopup"/>
          </div>
        </div>
        <hr>
        <div class="actors-row">
          <div class="actor-container" v-for="movie in moviesFetching">
            <router-link :to="{name: 'moviesDetails', params: {id: movie.id}}">
              <div class="poster"></div>
              <h3 v-if="movie.title.length<15">{{movie.title}}</h3>
              <h3 v-else>{{ movie.title.slice(0,17) }}...</h3>
              <h3>{{movie.releaseDate.slice(0,4)}}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="form-bg delete-form">
  </div>
  <div class="form-bg edit-form">
    <div class="form-fg">
      <div class="popup-header">
        <h1>Edit</h1>
        <button @click="closeEditPopup"><span class="material-symbols-outlined">close</span></button>
      </div>
      <form @submit.prevent="submitEditForm">
        <label for="name">Name</label>
        <input type="text" name="name" v-model="editedCategory.name">
        <input type="submit">
      </form>
      <div v-if="showDeleteMessage" class="delete-message">
        <p style="color: green">Le film a été modifié avec succès.</p>
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