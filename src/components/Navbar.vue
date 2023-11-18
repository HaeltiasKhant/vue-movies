<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter';

const search = ref('')
const router = useRouter()
const movieStore = useMovieStore()

const smSearch = ref(false)

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
 <nav class="px-lg-4 px-2 navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between" >
    <div class="d-flex align-items-center">
      <a class="navbar-brand fw-bold fs-2 me-1" href="/">Fakelixer</a>
      
      <div class="position-relative my-2 d-none d-lg-block " role="search">
        
        <input @keyup.enter="navigateSearch" v-model="search" class="form-control pe-5 " 
          type="text" placeholder="Enter name..." aria-label="Search" name="search">

        <div @click="navigateSearch" class="" style="position: absolute; right: 4%; bottom: 18%; cursor: pointer;"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-info fs-5" /></div>
      </div>
    </div>
    
    <div class="d-flex align-items-center">
      <span @click="smSearch = !smSearch"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-info fs-3 d-lg-none" /></span>

      <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    
    <div class="collapse navbar-collapse d-lg-inline-flex justify-content-end" id="navbarSupportedContent">
 
      <ul class="nav nav-underline">
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

    <div class="hideSearchBar px-1 d-lg-none" :class="{showSearchBar: smSearch}">
      <div class="position-relative my-2  p-0" role="search">
              
        <input @keyup.enter="navigateSearch" v-model="search" class="form-control pe-5 py-2 " 
          type="text" placeholder="Enter name..." aria-label="Search" name="search">

        <div @click="navigateSearch" class="" style="position: absolute; right: 2%; bottom: 8%; cursor: pointer;"><button class="btn btn-info p-1">Search</button></div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.hideSearchBar {
  opacity: 1;
  position: absolute;
  top: 94%;
  left: 0%;
  min-width: 100vw;
  transform: translateX(-100%);
  transition: all 0.5s;
}

.showSearchBar {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.5s;
}
</style>
