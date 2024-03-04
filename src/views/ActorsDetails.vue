<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import IconBtn from "@/components/iconBtn.vue";

const route = useRoute();
const router = useRouter();
const token = localStorage.getItem('token');
const id = route.params.id;
let actorsDetails = ref({});
let nationalityFetching = ref({});
let moviesFetching = ref({});
let editedActor = ref({});
let showDeleteMessage = ref(false);

onMounted(async () => {
  const actorsResponse = await axios.get(`https://127.0.0.1:8000/api/actors/${id}`, {headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  actorsDetails.value = actorsResponse.data;
  console.log(actorsDetails)

  const nationalityResponse = await axios.get(`https://127.0.0.1:8000${actorsDetails.value.nationality}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  nationalityFetching.value = nationalityResponse.data;
  console.log(nationalityFetching)

  const moviesPromises = actorsDetails.value.movies.map(async movieURL => {
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
  editedActor.value = { ...actorsDetails.value };
}

const submitEditForm = async () => {
  await axios.put(`https://127.0.0.1:8000/api/actors/${id}`, editedActor.value, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const updatedActorResponse = await axios.get(`https://127.0.0.1:8000/api/actors/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  actorsDetails.value = updatedActorResponse.data;
  closeEditPopup();
}

const deleteActor = async (actorId) => {
  await axios.delete(`https://127.0.0.1:8000/api/actors/${actorId}`, {headers: {'Authorization': `Bearer ${token}`}})
  showDeleteMessage.value = true;
  setTimeout(() => {
    showDeleteMessage.value = false;
    router.go(-1);
  }, 2000);
}

</script>

<template>
  <div class="content-view">
    <div class="movie-details-container">
      <div class="actor-poster-details">
      </div>
      <div class="movie-metadata">
        <div class="movie-metadata-header" style="display: flex; justify-content: space-between;">
          <h1>{{actorsDetails.firstName}} {{actorsDetails.lastName}}</h1>
          <div style="display: flex; gap: 10px;">
            <icon-btn icon="edit" text="Edit" @click="editPopup"/>
            <icon-btn icon="delete" text="Delete" @click="deletePopup"/>
          </div>
        </div>
        <h3>{{nationalityFetching.nationality}}</h3>
        <hr>
        <div class="actors-row">
          <div class="actor-container" v-for="movie in moviesFetching">
            <router-link :to="{name: 'moviesDetails', params: {id: movie.id}}">
              <div class="poster"></div>
              <h3 v-if="movie.title.length<15">{{movie.title}}</h3>
              <h3 v-else>{{ movie.title.slice(0,20) }}...</h3>
              <h3>{{movie.releaseDate.slice(0,4)}}</h3>
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
      <icon-btn icon="" text="Delete" @click="deleteActor(actorsDetails.id)"/>
      <icon-btn icon="" text="Cancel" @click="closeDeletePopup"/>
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
        <label for="fistName">First Name</label>
        <input type="text" name="firstName" v-model="editedActor.firstName">
        <label for="lastName">Last Name</label>
        <input type="text" name="lastName" v-model="editedActor.lastName">
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