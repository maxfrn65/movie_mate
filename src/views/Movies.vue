<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import IconBtn from "@/components/iconBtn.vue";

  const api_url = 'https://localhost:8000';
  let movies = [];
  let token = localStorage.getItem('token')
  let moviesData = ref([]);
  let newMovie = ref({
    title: '',
    description: '',
    releaseDate: '',
    duration: '',
    online: Math.floor(Math.random()*2)
  });
  const currentPage = ref(1);
  const moviesPerPage = 12;
  const totalMovies = ref(0);

  const fetchMovies = async () => {
    const response = await axios.get(`${api_url}/api/movies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        page: currentPage.value,
        itemsPerPage: moviesPerPage
      }
    });
    moviesData.value = response.data['hydra:member'];
    totalMovies.value = response.data['hydra:totalItems'];
  };

  onMounted(fetchMovies);

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchMovies();
    }
  };

  const nextPage = () => {
    if (currentPage.value < Math.ceil(totalMovies.value / moviesPerPage)) {
      currentPage.value++;
      fetchMovies();
    }
  };

  const addPopup = () => {
    document.querySelector('.add-form').style.display = 'block'
    newMovie.value = { ...moviesData.value };
  }

  const closeAddPopup = () => {
    document.querySelector('.add-form').style.display = 'none';
  }

  const submitAddForm = async () => {
    await axios.post(`${api_url}/api/movies`, newMovie.value, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const updatedMovieResponse = await axios.get(`${api_url}/api/movies`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    movieDetails.value = updatedMovieResponse.data;

    closeAddPopup();
  }
</script>

<template>
  <div class="content-view">
    <div class="header">
      <h1>Movies</h1>
      <iconBtn icon="add" text="Add a Movie" @click="addPopup"/>
    </div>
    <div class="not-logged-in" v-if="!token">
      <h1>You must be signed in to see the list!</h1>
      <iconBtn text="Sign In" url="login"/>
    </div>
    <div class="content-grid" v-else>
      <div v-if="moviesData" v-for="movie in moviesData" class="movie">
        <router-link :to="{name: 'moviesDetails', params: {id: movie.id}}">
          <div class="img-container">
            <div class="poster">
            </div>
          </div>
          <h2 v-if="movie.title.length<15">{{movie.title}}</h2>
          <h2 v-else>{{ movie.title.slice(0,15) }}...</h2>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">Previous</button>
      <span>Page {{ currentPage }}/{{Math.ceil(totalMovies/moviesPerPage)}}</span>
      <button @click="nextPage" :disabled="currentPage >= totalMovies.value / moviesPerPage">Next</button>
    </div>
  </div>
  <div class="form-bg add-form">
    <div class="form-fg">
      <div class="popup-header">
        <h1>Add</h1>
        <button @click="closeAddPopup"><span class="material-symbols-outlined">close</span></button>
      </div>
      <form @submit.prevent="submitAddForm">
        <label for="title">Title</label>
        <input type="text" name="title" v-model="newMovie.title">
        <label for="about">About</label>
        <textarea name="about" id="" cols="30" rows="10" v-model="newMovie.description"></textarea>
        <label for="releaseDate">Release Date</label>
        <input type="text" name="releaseDate" v-model="newMovie.releaseDate">
        <label for="title">Duration</label>
        <input type="text" required pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}" title="Write a duration in the format hh:mm:ss" v-model="newMovie.duration">
        <input type="submit" value="Add a Movie">
      </form>
      <div v-if="showDeleteMessage" class="delete-message">
        <p style="color: green">Le film a été modifié avec succès.</p>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }

  .content-grid {
    display: grid;
    margin-top: 50px;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px;
    justify-items: center;
    align-items: center;
    .movie {
      width: fit-content;
    }
  }
  .pagination {
    margin-top: 10px;
  }
  .edit-bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px);
    background-color: rgb(0,0,0,0.5);
    .edit-fg {
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
        width: 100%;
      }
      textarea {
        width: 100%;
        height: 100px;
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
