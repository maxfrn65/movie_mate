<script setup>

</script>

<template>
  <div id="app">
    <header>
      <h1>MovieMate</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="actors">Actors</router-link>
        <router-link to="movies">Movies</router-link>
        <router-link to="categories">Categories</router-link>
      </nav>
    </header>
    <div id="view-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
