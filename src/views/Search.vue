<script setup>
import axios from 'axios'
import {ref} from "vue";

let token = localStorage.getItem('token');
let searchResults = ref('');
let searchInput = ref('');
const search = async () => {
  try {
    setTimeout( async () => {
      const response = await axios.get(`https://127.0.0.1:8000/api/movies?title=${searchInput.value}`, {
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
    <div v-if="searchInput" v-for="result in searchResults['hydra:member']">
      <h1>{{ result.title }}</h1>
      <p>{{ result.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  ::placeholder {
    color: white;
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