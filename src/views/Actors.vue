<script setup>
  import { ref, onMounted } from 'vue'
  import iconBtn from '@/components/iconBtn.vue'
  import axios from 'axios'

  let token = localStorage.getItem('token')
  let actorsData = ref([]);
  onMounted(async () => {
    const actorsResponse = await axios.get('https://127.0.0.1:8000/api/actors', {headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    actorsData.value = actorsResponse.data})
</script>

<template>
  <div class="content-view">
    <div class="t-header">
      <h1>Actors</h1>
      <iconBtn icon="add" text="Add an Actor" url=""/>
    </div>
    <div class="not-logged-in" v-if="!token">
      <h1>You must be signed in to see the list!</h1>
      <iconBtn text="Sign In" url="login"/>
    </div>
    <table v-else>
      <tr>
        <th>id</th>
        <th>first name</th>
        <th>last name</th>
        <th>more...</th>
      </tr>
      <tr v-for="actor in actorsData['hydra:member']">
        <td>{{ actor.id }}</td>
        <td>{{ actor.firstName }}</td>
        <td>{{ actor.lastName }}</td>
        <td><router-link :to="{name: 'actorsDetails', params: {id: actor.id}}">Go to Actor Page</router-link></td>
      </tr>
    </table>
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
</style>
