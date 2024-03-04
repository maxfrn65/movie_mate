<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import IconBtn from "@/components/iconBtn.vue";
  import IconFormBtn from "@/components/iconFormBtn.vue";

  let movies = [];
  let selectedMovieId = null;
  let selectedMovie = null;
  let editedMovieTitle = '';
  let token = localStorage.getItem('token')
  let moviesData = ref([]);

  onMounted(async () => {
    const moviesResponse = await axios.get('https://127.0.0.1:8000/api/movies', {headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    moviesData.value = moviesResponse.data
    console.log(moviesData.value)
  })

  const closePopup = () => {
    document.querySelector('.edit-bg').style.display = 'none'
  }

  function edit(movieId) {
    document.querySelector('.edit-bg').style.display = 'block';
    document.body.classList.add('.stop-scroll');
    this.selectedMovieId = this.selectedMovieId === movieId ? null : movieId;
    this.selectedMovie = this.movies.find(movie => movie.id === this.selectedMovieId);
    this.editedMovieTitle = this.selectedMovie ? this.selectedMovie.title : '';
  }

</script>

<template>
  <div class="content-view">
    <div class="header">
      <h1>Movies</h1>
      <iconBtn icon="add" text="Add a Movie" />
    </div>
    <div class="not-logged-in" v-if="!token">
      <h1>You must be signed in to see the list!</h1>
      <iconBtn text="Sign In" url="login"/>
    </div>
    <div class="content-grid" v-else>
      <div v-if="moviesData" v-for="movie in moviesData['hydra:member']" class="movie">
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
    </div>
  <div class="edit-bg">
    <div class="edit-fg">
      <div class="popup-header">
        <h1>Edit</h1>
        <button @click="closePopup"><span class="material-symbols-outlined">close</span></button>
      </div>
      <form action="">
        <div class="form-label">
          <label for="">Title</label>
          <input type="text" v-model="editedMovieTitle">
        </div>
      </form>
      <icon-btn icon="" text="Edit this Movie" />
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
</style>
