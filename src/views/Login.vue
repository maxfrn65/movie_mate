<script setup>
import IconFormBtn from "@/components/iconFormBtn.vue";
</script>

<template>
<div class="content-view">
  <h1>Login</h1>
  <form @submit.prevent="submitForm">
    <div class="form-label-container">
      <div class="form-label">
        <label for="username">Email</label>
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
<script>
import axios from "axios";

export default {
  methods: {
    async submitForm() {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value

      try {
        const response = await axios.post('https://127.0.0.1:8000/api/login_check', {
          username: username,
          password: password
        });
        console.log(response.data);
        localStorage.setItem('token', response.data.token)
        this.$router.push({name: 'actors'})
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>