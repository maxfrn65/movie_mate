<script setup>

</script>

<template>
  <input type="text" name="search" placeholder="Search...">
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