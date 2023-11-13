<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter'

const router = useRouter()
const movieStore = useMovieStore()

const emailText = ref('')
const passwordText = ref('')

const showEmailNoti = ref(false)
const showPSNoti = ref(false)
const psShort = ref(false)
const showLoginFailNoti = ref(false)

const submitLogin = async() => {
  if(!emailText.value) {  
    showEmailNoti.value = true
    return
  }

  if(!passwordText.value) {
    showPSNoti.value = true
    return
  }

  const data = {
    email: emailText.value,
    password: passwordText.value,
  }

  await movieStore.login(data)
  if(movieStore.isLoggedin) router.push('/acc/profile')
  else showLoginFailNoti.value = true
}

</script>

<template>
  <div class="border border-4 border-info rounded container mt-5 bg-light p-3" style="max-width: 600px;">
    <form @submit.prevent="submitLogin" >
      
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label fs-5">Email address</label>
        <p v-if="showEmailNoti" class="text-danger my-0">Email must not be empty.</p>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="emailText">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>

      <div class="mb-4">
        <label for="exampleInputPassword1" class="form-label fs-5">Password</label>
        <p v-if="showPSNoti" class="text-danger my-0">Password must not be empty.</p>
        <p v-if="psShort" class="text-danger my-0">Password must have at least 8 characters.</p>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="passwordText">
      </div>
      
      <button type="submit" class="btn btn-info mb-3 fs-5">Log in</button>
    </form>
    
    <p v-if="showLoginFailNoti" class="text-danger mb-2">Log in failed! Make sure to fail in your email and password correctly.</p>

    <p class="mb-0">Don't have an account yet? Register <a href="http://localhost:5173/acc/signup">here.</a></p>
  </div>
</template>