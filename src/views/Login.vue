<script setup>
import IconFormBtn from "@/components/iconFormBtn.vue";
import axios from 'axios';

function submitForm() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  axios.post('https://127.0.0.1:8000/api/login_check', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response);
    localStorage.setItem('token', response.data.token)
    window.location.href = '/actors'
  })
}
</script>

<template>
<div class="content-view">
  <h1>Login</h1>
  <form @submit="submitForm">
    <div class="form-label-container">
      <div class="form-label">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
      </div>
      <div class="form-label">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
      </div>
    </div>
    <icon-form-btn icon="login" text="Login" />
  </form>
</div>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 10px;
}
  form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    .form-label {
      display: flex;
      flex-direction: column;
      input {
        width: 50%;
        height: 40px;
        border: black 1px solid;
        padding: 10px;
        &:focus {
          outline: none;
        }
      }
    }
  }
</style>