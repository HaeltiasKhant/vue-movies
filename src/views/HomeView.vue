<script setup>
import ShowView from '../components/ShowView.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { useMovieStore } from '../stores/counter';
import Footer from '../components/Footer.vue';

const trendings = computed(() => movieStore.trendings)
const latestMovies = computed(() => movieStore.latestMovies)
const latestTVs = computed(() => movieStore.latestTVs)
const movieStore = useMovieStore()
const route = useRoute()
const router = useRouter()

const getTrendings = async(type) => {
  if(type == 'movie') {
    router.push(`/home/${type}`)
  }

  if(type == 'tv') router.push(`/home/${type}`)
}

const getTrendingPage = async(type) => {
  if(!type) {
    movieStore.isLoading = true

    await movieStore.getTrendings('movie')
    await movieStore.getLatestMovies()
    await movieStore.getLatestTVs()

    movieStore.isLoading = false
    return
  }
  movieStore.isLoading = true

  await movieStore.getTrendings(type)
  await movieStore.getLatestMovies()
  await movieStore.getLatestTVs()

  movieStore.isLoading = false
  
}

watch(route, () => {

  getTrendingPage(route.params.type)

})

getTrendingPage(route.params.type)


</script>

<template>
  <div v-if="movieStore.isLoading" class="d-flex justify-content-center text-white my-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="mx-lg-5 mx-1 mt-3 mb-5 text-white" v-else>
    
    <h1 class="pb-2 fw-normal">Trending</h1>
      
    <ul class="nav nav-tabs my-2 border-bottom-info" >
      <li class="nav-item" @click="getTrendings('movie')">
        <span class="nav-link text-info" style="cursor: pointer;" 
        :class="{active: route.params.type == 'movie' || route.params.type == ''}"><font-awesome-icon :icon="['fas', 'film']" /> Movies</span></li>

      <li class="nav-item" @click="getTrendings('tv')">
        <span class="nav-link text-info" style="cursor: pointer;" 
        :class="{active: route.params.type == 'tv'}"><font-awesome-icon :icon="['fas', 'tv']" /> TV series</span></li>
    </ul>

    <div  class="row mb-2 g-1">
      <ShowView v-for="show in trendings" :key="show.id" :show="show" />
    </div>

    <h1 class="pb-2 fw-normal" >Latest Movies</h1>

    <div  class="row mb-2 g-1">
      <ShowView v-for="show in latestMovies.slice(0, 18)" :key="show.id" :show="show" />
    </div>
 
    <h1 class="pb-2 fw-normal" >Latest TV Shows</h1>
    
    <div  class="row mb-2 g-1">
      <ShowView v-for="show in latestTVs.slice(0, 18)" :key="show.id" :show="show" />
    </div>
  </div>

  
</template>
