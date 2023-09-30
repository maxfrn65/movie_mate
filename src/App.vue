<script setup>

</script>

<template>
  <div id="app">
    <header>
      <h1>MovieMate</h1>
      <nav>
        <router-link class="hover-underline-animation" to="/">Home</router-link>
        <router-link class="hover-underline-animation" to="actors">Actors</router-link>
        <router-link class="hover-underline-animation" to="movies">Movies</router-link>
        <router-link class="hover-underline-animation" to="categories">Categories</router-link>
      </nav>
    </header>
    <div id="view-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #1a1a1a;
    h1 {
      color: white;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
    }
    nav {
display: flex;
      gap: 20px;
      a {
        color: white;
        font-family: 'Space Grotesk', sans-serif;
        text-decoration: none;
        border-radius: 25px;
        font-weight: bold;
        transition: color 0.25s ease-out;
        &:hover {
          color: #834AFF;
        }
      }
    }
  }

  .hover-underline-animation {
    display: inline-block;
    position: relative;
  }

  .hover-underline-animation::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: 2px;
    left: 0;
    background-color: #834AFF;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .hover-underline-animation:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
</style>
