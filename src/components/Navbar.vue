<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter';

const search = ref('')
const router = useRouter()
const movieStore = useMovieStore()

const navigateSearch = async() => {
  if(search.value) {
    router.push({ name: 'search', params: { type: 'movie', searchName : search.value, page: 1}})
  }
  else return
}
onMounted(() => {
  if(!movieStore.isLoggedin) movieStore.isLoggedin = localStorage.getItem('isLoggedin')
})

</script>

<template>
 <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Fakelixer</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="container-fluid d-lg-flex justify-content-lg-between align-items-center g-0">
        <div class="d-flex my-2" role="search">
          <input @keyup.enter="navigateSearch" v-model="search" class="form-control me-2" 
            type="text" placeholder="Enter name..." aria-label="Search" name="search">

          <button @click="navigateSearch" class="btn btn-outline-info"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
        </div>
        
        <ul class="nav nav-underline mb-2 mb-lg-0">
          <li class="nav-item pe-lg-4">
            <a class="nav-link text-info" aria-current="page" href="/movie">Home</a>
          </li>
          <li class="nav-item pe-lg-4">
            <a class="nav-link text-info" href="/popular/movie/page-1">Popular shows</a>
          </li>
          <li class="nav-item pe-lg-4">
            <a class="nav-link text-info" href="/top-rated/movie/page-1">Top-rated shows</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</template>
