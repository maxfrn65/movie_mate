<script setup>
import { defineProps } from 'vue'
defineProps({
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Button Label'
    },
    url: {
      type: String,
      default: ''
    }
  }
)
</script>

<template>
  <div class="btn">
    <div class="btn-fg"><router-link :to="url" class="btn-text"><span class="material-symbols-outlined">{{ icon }}</span>{{ text }}</router-link></div>
    <div class="btn-bg"></div>
  </div>
</template>

<style scoped lang="scss">
  .btn {
    width: 175px;
    height: 50px;
    position: relative;
    .btn-fg {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;
      text-decoration: none;
      z-index: 1;
      bottom: 0;
      right: 0;
      transition: all 100ms ease-out;
      .btn-text {
        width: 100%;
        height: 100%;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 500;
        justify-content: center;
        color: white;
        display: flex;
        align-items: center;
        text-decoration: none;
        gap: 10px;
      }
      &:hover {
        bottom: 5px;
        right: 5px;
      }
      &:active {
        bottom: 2px;
        right: 2px;
      }
    }
    .btn-bg {
      width: 100%; /* Utilisez 100% pour remplir la largeur de la div parent .btn */
      height: 100%; /* Utilisez 100% pour remplir la hauteur de la div parent .btn */
      background-color: #834AFF;
      border: black 2px solid;
      z-index: -1;
      position: absolute; /* Utilisez une position absolue pour empiler derrière .btn-fg */
    }
  }
</style>
