<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import IconBtn from "@/components/iconBtn.vue";
  import IconFormBtn from "@/components/iconFormBtn.vue";

  let token = localStorage.getItem('token')
  let moviesData = ref([]);
  onMounted(async () => {
    const moviesResponse = await axios.get('https://127.0.0.1:8000/api/movies', {headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    moviesData.value = moviesResponse.data})

  const closePopup = () => {
    document.querySelector('.edit-bg').style.display = 'none'
  }

  const edit = () => {
    document.querySelector('.edit-bg').style.display = 'block';
    document.body.classList.add('.stop-scroll');
  }
</script>

<template>
  <div class="content-view">
    <div class="t-header">
      <h1>Movies</h1>
      <iconBtn icon="add" text="Add a Movie" />
    </div>
      <table>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>description</th>
          <th>release date</th>
          <th>duration</th>
          <th>edit/delete</th>
        </tr>
        <tr v-for="movie in moviesData['hydra:member']">
          <td>{{ movie.id }}</td>
          <td>{{ movie.title }}</td>
          <td>{{ movie.description }}</td>
          <td>{{ movie.releaseDate }}</td>
          <td>{{ movie.duration }}</td>
          <td><a class="icn" @click="edit(movie.id)"><span class="material-symbols-outlined">edit</span></a><router-link to="" class="icn"><span class="material-symbols-outlined">delete</span></router-link></td>
        </tr>
      </table>
  </div>
  <div class="edit-bg">
    <div class="edit-fg">
      <div class="popup-header">
        <h1>Edit</h1>
        <button @click="closePopup"><span class="material-symbols-outlined">close</span></button>
      </div>
      <div class="form-label">
        <label for="">Titre</label>
        <input type="text" v-model="movieTitle">
      </div>
      <div class="form-label">
        <label for="">Description</label>
        <textarea></textarea>
      </div>
      <div class="form-label">
        <label for="">Release Date</label>
        <input type="date">
      </div>
      <div class="form-label">
        <label for="">Duration (min)</label>
        <input type="number" min="0">
      </div>
      <icon-btn icon="" text="Edit" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .t-header {
    display: flex;
    justify-content: space-between;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th {
      text-align: left;
      padding: 10px 0;
      font-weight: bold;
      border-bottom: 1px solid #1a1a1a;
    }
    td {
      padding: 10px 0;
      border-bottom: 1px solid #1a1a1a;
      height: fit-content;
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