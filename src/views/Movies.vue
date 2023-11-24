<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import IconBtn from "@/components/iconBtn.vue";

  let moviesData = ref([]);
  onMounted(async () => {
    const moviesResponse = await axios.get('https://127.0.0.1:8000/api/movies?page=1')
    moviesData.value = moviesResponse.data})
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
      </tr>
      <tr v-for="movie in moviesData['hydra:member']">
        <td>{{ movie.id }}</td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.description }}</td>
        <td>{{ movie.release_date }}</td>
        <td>{{ movie.duration }}</td>
        <td><router-link to="" class="icn"><span class="material-symbols-outlined">edit</span></router-link><router-link to="" class="icn"><span class="material-symbols-outlined">delete</span></router-link></td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
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
      .icn {
        padding: 10px;
        border-radius: 50px;
        color: black;
        transition: color 0.25s ease-out;
        &:hover {
          background-color: #f5ecff;
          color: #834AFF;
        }
      }
    }
  }
</style>