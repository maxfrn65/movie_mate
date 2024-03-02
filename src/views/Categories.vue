<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import IconBtn from "@/components/iconBtn.vue";

let token = localStorage.getItem('token')
let categoriesData = ref([]);
onMounted(async () => {
  const categoriesResponse = await axios.get('https://127.0.0.1:8000/api/categories', {headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  categoriesData.value = categoriesResponse.data})
</script>

<template>
  <div class="content-view">
    <div class="t-header">
      <h1>Categories</h1>
      <iconBtn icon="add" text="Add a Category" />
    </div>
    <div class="not-logged-in" v-if="!token">
      <h1>You must be signed in to see the list!</h1>
      <iconBtn text="Sign In" url="login"/>
    </div>
    <table v-else>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>edit/delete</th>
      </tr>
      <tr v-for="category in categoriesData['hydra:member']">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td><router-link to="" class="icn"><span class="material-symbols-outlined">edit</span></router-link><router-link to="" class="icn"><span class="material-symbols-outlined">delete</span></router-link></td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .t-header {
    display: flex;
    justify-content: space-between;
    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 20px;
    }
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
</style>
