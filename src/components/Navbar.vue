<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter';

const search = ref('')
const router = useRouter()
const movieStore = useMovieStore()

const genres = computed(() => movieStore.genres)

const smSearch = ref(false)
const genreMovie = ref(false)
const genreActive = ref(false)
const genreIndex = ref(null)

const navigateSearch = async() => {
  if(search.value) {
    router.push({ name: 'search', params: { type: 'movie', searchName : search.value, page: 1}})
  }
  else return
}

const smSearchAction = () => {
  smSearch.value = !smSearch.value
  genreActive.value = false
}

const getGenreIndex = (i) => {
  genreIndex.value = i
}

const GoToGenreView = (genreName, genreID) => {
  if(genreMovie.value) router.push({ name: 'genre', params: { type: 'movie', genre_type: genreName, genre_id: genreID, page: 1 }})
  else router.push({ name: 'genre', params: { type: 'tv', genre_type: genreName, genre_id: genreID, page: 1 }}) 
}

const getGenres = (type) => {
  if(type == 'movie') {
    genreMovie.value = true
    movieStore.getGenres(type)
  } else {
    genreMovie.value = false
    movieStore.getGenres(type)
  }
}

getGenres('movie')
</script>

<template>
 <nav class="px-lg-4 px-2 navbar navbar-expand-lg bg-body-tertiary position-relative" >
    <div class="d-flex align-items-center">
      <a class="navbar-brand fw-bold fs-2 me-1" href="/">Fakelixer</a>
      
      <div class="position-relative my-2 d-none d-lg-block " role="search">
        
        <input @keyup.enter="navigateSearch" v-model="search" class="form-control pe-5 " 
          type="text" placeholder="Enter name..." aria-label="Search" name="search">

        <div @click="navigateSearch" class="" style="position: absolute; right: 4%; bottom: 18%; cursor: pointer;"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-info fs-5" /></div>
      </div>
    </div>
    
    <div class="d-flex align-items-center">
      <span @click="smSearchAction"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-info fs-3 d-lg-none" /></span>

      <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    
    <div class="collapse navbar-collapse d-lg-inline-flex justify-content-end" id="navbarSupportedContent">
 
      <ul class="nav nav-underline">
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-info" aria-current="page" href="/home">HOME</a>
        </li>
        <li  class="pe-lg-4 d-inline-flex align-items-center" >
          <span @click="genreActive = !genreActive"  class="text-info nav-link" aria-current="page" style="cursor: pointer;">GENRE</span>
        </li>
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-info" href="/popular/movie/page-1">POPULAR SHOWS</a>
        </li>
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-info" href="/top-rated/movie/page-1">TOP-RATED SHOWS</a>
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

    <div v-if="genreActive"  class="position-absolute d-none d-lg-block bg-light p-lg-3 p-1 z-2 border border-1" style="max-width: 640px; top: 70%; left: 50%;">
      <div class="d-flex mb-2">
        <div class="me-lg-3 me-1">
          <span @click="getGenres('movie')">
            <font-awesome-icon class="text-secondary me-1" style="font-size: 12px;" :icon="['fas', 'circle']" :class="{'text-info': genreMovie}" />
          </span>
          <span>Movie</span>
        </div>
        <div>
          <span @click="getGenres('tv')">
            <font-awesome-icon class="text-secondary me-1" style="font-size: 12px;" :icon="['fas', 'circle']" :class="{'text-info': !genreMovie}" />
          </span>
          <span>TV</span>
        </div>
      </div>
      <div class="row g-0 px-lg-3 px-1">
        <div @click="GoToGenreView(genre.name ,genre.id)" v-for="(genre, i) in genres" :key="genre.id" @mouseover="getGenreIndex(i)" @mouseleave="genreIndex = null"
         class="col-lg-3 col-6 py-1 ps-lg-1" style="font-size: 15px; cursor: pointer;" :class="{'bg-info': i == genreIndex}"
          >{{ genre.name }}
        </div>
      </div>
    </div>

    <div :class="{showSearchBar: genreActive}"  class=" hideGenreBar d-lg-none bg-dark text-light d-block  p-lg-3 p-1 z-2 " >
      <div class="d-flex mb-2">
        <div class="me-lg-3 me-1">
          <span @click="getGenres('movie')">
            <font-awesome-icon class="text-secondary me-1" style="font-size: 12px;" :icon="['fas', 'circle']" :class="{'text-info': genreMovie}" />
          </span>
          <span>Movie</span>
        </div>
        <div>
          <span @click="getGenres('tv')">
            <font-awesome-icon class="text-secondary me-1" style="font-size: 12px;" :icon="['fas', 'circle']" :class="{'text-info': !genreMovie}" />
          </span>
          <span>TV</span>
        </div>
      </div>
      <div class="row g-0 px-lg-3 px-1">
        <div @click="GoToGenreView(genre.name ,genre.id)" v-for="(genre, i) in genres" :key="genre.id" @mouseover="getGenreIndex(i)" @mouseleave="genreIndex = null"
        class="col-lg-3 col-6 py-1 ps-lg-1" style="font-size: 15px; cursor: pointer;" :class="{'bg-info': i == genreIndex}"
          >{{ genre.name }}
        </div>
      </div>
    </div>

  </nav>
</template>

<style scoped>
.hideSearchBar {
  opacity: 0;
  position: absolute;
  top: 96%;
  left: 0%;
  min-width: 100vw;
  transform: translateX(-100%);
  transition: all 0.5s;
}

.showSearchBar {
  z-index: 1;
  opacity: 1;
  transform: translateX(0);
  transition: all 0.s;
}

.hideGenreBar {
  opacity: 0;
  position: absolute;
  top: 100%;
  right: 36%;
  max-width: 640px;
  transform: translateX(-100%);
  transition: all 0.4s;
}

.showSearchBar {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.4s;
}
</style>
