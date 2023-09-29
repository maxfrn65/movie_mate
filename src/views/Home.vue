<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref([]);
onMounted(async () => {
  const response = await axios.get('https://127.0.0.1:8000/api/movies?page=1')
  data.value = response.data
})
console.log(data.value)
</script>

<template>
  <h1>Hello World</h1>
  <div v-for="movie in data['hydra:member']">
    <div v-for="n in 5">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.description }}</p>
    </div>
  </div>
</template>
