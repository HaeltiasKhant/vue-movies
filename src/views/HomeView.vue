<script setup>
import ShowView from '../components/ShowView.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { useMovieStore } from '../stores/counter';

const trendings = computed(() => movieStore.trendings)
const latestMovies = computed(() => movieStore.latestMovies)
const latestTVs = computed(() => movieStore.latestTVs)
const movieStore = useMovieStore()
const route = useRoute()
const router = useRouter()

const getTrendings = async(type) => {
  if(type == 'movie') {
    router.push(`/${type}`)
  }

  if(type == 'tv') router.push(`/${type}`)
}

const getTrendingPage = async(type) => {
  movieStore.isLoading = true

  await movieStore.getTrendings(type)

  movieStore.isLoading = false
  movieStore.getLatestMovies()
  movieStore.getLatestTVs()
}

watch(route, () => {

  getTrendingPage(route.params.type)

})

getTrendingPage(route.params.type)


</script>

<template>
  <div class="container mt-3 text-white">
    
    <h1 class="pb-2" style="margin-left: -10px;">Trending</h1>
      
    <ul class="nav nav-tabs my-2 border-bottom-info" style="margin-left: -10px;">
      <li class="nav-item" @click="getTrendings('movie')"><span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'movie'}">Movies</span></li>
      <li class="nav-item" @click="getTrendings('tv')"><span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'tv'}">TV series</span></li>
    </ul>

    <div v-if="movieStore.isLoading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div  class="row mb-2">
      <ShowView v-for="show in trendings" :key="show.id" :show="show" />
    </div>

    <h1 class="pb-2" style="margin-left: -10px;">Latest Movies</h1>

    <div  class="row mb-2">
      <ShowView v-for="show in latestMovies.slice(0, 18)" :key="show.id" :show="show" />
    </div>

    <h1 class="pb-2" style="margin-left: -10px;">Latest TV Shows</h1>
    
    <div  class="row mb-2">
      <ShowView v-for="show in latestTVs.slice(0, 18)" :key="show.id" :show="show" />
    </div>

  </div>
</template>
