<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter'
import axios from 'axios';

const movieStore = useMovieStore()
const router = useRouter()

const username = computed(() => movieStore.username)
const email = computed(() => movieStore.email)

const logout = async() => {
  await movieStore.logout()
  router.push('/movie')
}

const goToFavorites = () => {
  if(movieStore.isLoggedin) router.push('/acc/profile/favorites')
  else router.push('/acc/login')
}

const goToWatchList = () => {
  if(movieStore.isLoggedin) router.push('/acc/profile/watch-list')
  else router.push('/acc/login')
}

onMounted(async() => {
  if(!movieStore.username) {
    movieStore.isLoading = true
    console.log(movieStore.username)

    const response = await axios.get('https://back-run-movies.onrender.com/api/v1/auth/profile', {withCredentials: true})
    console.log(response)
    movieStore.username = response.data.username
    movieStore.email = response.data.email
    console.log(movieStore.username)

    movieStore.isLoading = false
  }
})

</script>

<template>
  <div v-if="movieStore.isLoading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="container mt-4 bg-light border rounded-4 border border-info border-3" style="max-width:400px;" v-else>
    
    <div class="mb-4">
      <img src="https://lits.mtholyoke.edu/sites/default/files/styles/staff/public/staff/Staff.png.jpg?itok=rDNtA4yq" alt="user-profilepic" class="w-100">
    </div>

    <div class="">
      <p class="mb-1 fw-light">Name</p>
      <h2 class="fw-normal fs-4">{{ username }}</h2>

      <p class="mb-1 fw-light">Email address</p>
      <h2 class="fw-normal fs-4">{{ email }}</h2>

      <div class="my-3">
        <button type="button" class="btn btn-outline-info me-2" @click="goToFavorites">My favorites</button>
        <button type="button" class="btn btn-outline-info" @click="goToWatchList">My watchlist</button>
      </div>
      
      <button class="btn btn-dark mb-2" @click="logout">logout</button> 
    </div>
  </div>
  
</template>