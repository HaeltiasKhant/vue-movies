<script setup>
import axios from 'axios';
import { ref } from 'vue';

const usernameText = ref('')
const emailText = ref('')
const passwordText = ref('')
const showEmailNoti = ref(false)
const showPSNoti = ref(false)
const showNameNoti = ref(false)
const created = ref(false)
const emailExists = ref(false)

const submitSignup = async() => {
  if(!usernameText.value) {  
    showNameNoti.value = true
    return
  }

  if(!emailText.value) {  
    showEmailNoti.value = true
    return
  }

  if(!passwordText.value) {
    showPSNoti.value = true
    return
  }
  const data = {
    username: usernameText.value,
    email: emailText.value,
    password: passwordText.value
  }
  try{
    const response = await axios.post('http://localhost:3001/api/v1/auth/register', data)
    console.log('sign up success', response)
    created.value = true

  } catch(err) {
    emailExists.value = true
    console.log(err)
  }
}
</script>

<template>
  <div class="border border-4 border-info rounded container mt-5 bg-light p-3" style="max-width: 600px;">
    <form @submit.prevent="submitSignup">
      
      <div class="mb-3">
        <label for="username" class="form-label fs-5">Username</label>
        <p v-if="showNameNoti" class="text-danger my-0">Username should not be empty.</p>
        <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" v-model="usernameText">
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label fs-5">Email address</label>
        <p v-if="emailExists" class="text-danger my-0">Email already existed! Try using another Email.</p>
        <p v-if="showEmailNoti" class="text-danger my-0">Email must not be empty.</p>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="emailText">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>

      <div class="mb-4">
        <label for="exampleInputPassword1" class="form-label fs-5">Password</label>
        <p v-if="showPSNoti" class="text-danger my-0">Password must not be empty.</p>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="passwordText">
      </div>
      <button type="submit" class="btn btn-info mb-1 fs-5">Sign up</button>
    </form>

    <p v-if="created" class="text-success">Account successfully created! Please Log in <a href="http://localhost:5173/acc/login">here.</a></p>
    
    <p class="mb-0">Already have an account? Log in <a href="http://localhost:5173/acc/login">here.</a></p>
  </div>
</template>