<script setup>
import axios from 'axios'
import {ref} from "vue";

const api_url = 'https://cb-be.maximefourna.fr';
let token = localStorage.getItem('token');
let searchResults = ref('');
let searchInput = ref('');
const search = async () => {
  try {
    setTimeout( async () => {
      const response = await axios.get(`${api_url}/api/movies?title=${searchInput.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }

      })
      searchResults.value = response.data
    console.log(searchResults);
  }, 1500)} catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <input type="text" name="search" placeholder="Search..." @input="search" v-model="searchInput">
  <div>
    <div class="content-grid">
      <div v-if="searchInput" v-for="result in searchResults['hydra:member']">
        <router-link :to="{name: 'moviesDetails', params: {id: result.id}}">
          <div class="img-container">
            <div class="poster">
            </div>
          </div>
          <h2 v-if="result.title.length<15">{{result.title}}</h2>
          <h2 v-else>{{ result.title.slice(0,15) }}...</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  ::placeholder {
    color: white;
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
  input {
    border: none;
    background-color: #834AFF;
    color: white;
    width: 100%;
    height: 100px;
    padding: 30px;
    font-size: 32px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    &:focus {
      outline: none;
    }
  }
</style>