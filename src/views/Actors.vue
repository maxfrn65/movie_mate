<script setup>
  import { ref, onMounted } from 'vue'
  import iconBtn from '@/components/iconBtn.vue'
  import axios from 'axios'

  let actorsData = ref([]);
  onMounted(async () => {
    const actorsResponse = await axios.get('https://127.0.0.1:8000/api/actors')
    actorsData.value = actorsResponse.data})
</script>

<template>
  <div class="content-view">
    <div class="t-header">
      <h1>Actors</h1>
      <iconBtn icon="add" text="Add an Actor" />
    </div>
    <table>
      <tr>
        <th>id</th>
        <th>first name</th>
        <th>last name</th>
        <th>edit/delete</th>
      </tr>
      <tr v-for="actor in actorsData['hydra:member']">
        <td>{{ actor.id }}</td>
        <td>{{ actor.firstName }}</td>
        <td>{{ actor.lastName }}</td>
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