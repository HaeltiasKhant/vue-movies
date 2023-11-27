<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter';
import { ref, watch, computed } from 'vue';
import Pagination from '../components/Pagination.vue';
import ShowView from '../components/ShowView.vue';

const showsByGenre = computed(() => movieStore.showsByGenre)
const totalPages = computed(() => movieStore.totalPages)

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

const inputNum = ref(null)
const hasInputNum = ref(false)
const pageExists = ref(true)

const pages= ref([])
const pageNum = ref(null)

const goToPageByInput = async(num) => {
  if(!num) return
  if(num > totalPages.value ) {
    hasInputNum.value = false
    pageExists.value = false
    router.push({ name: 'genre', params: { type: route.params.type, id: route.params.id, page: num}})
    return
  } else {
    router.push({ name: 'genre', params: { type: route.params.type, id: route.params.id, page: num}})
  }
}

const getShowsByGenrePage = async(type, id, num) => {
  pageExists.value = true
  pageNum.value = route.params.page

  movieStore.isLoading = true

  await movieStore.getShowsByGenre(type, id, num)

  movieStore.isLoading = false

  
  for(let i=0; i<totalPages.value; i++) {
    const page = i + 1
    pages.value.push(page)
  } 

  if(num > totalPages.value ) {
    hasInputNum.value = false
    pageExists.value = false
    router.push({ name: 'genre', params: { type: type , id: id, page: num}})
    return
  }

  if(num < 5 || num >= totalPages.value) hasInputNum.value = false
  else hasInputNum.value = true
}

watch(route, () => {
  if(route.params.type == 'movie') getShowsByGenrePage('movie', route.params.id, route.params.page)
  if(route.params.type == 'tv') getShowsByGenrePage('tv', route.params.id, route.params.page)
})

getShowsByGenrePage(route.params.type, route.params.id, route.params.page)
</script>

<template>
  <div v-if="movieStore.isLoading" class="d-flex justify-content-center text-white my-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class=" mt-lg-4 mt-2 mx-lg-5 mx-1 mb-5 text-white" v-else>
    <h1 class="pe-3 mb-lg-4 mb-2 fw-normal" >{{ route.params.genre_type }} 
      <span v-if="route.params.type == 'movie'">Movies</span>
      <span v-else>TV shows</span></h1>

    <Pagination :totalPages="totalPages" :pages="pages" :hasInputNum="hasInputNum" :pageNum="pageNum" />

    <div v-if="!pageExists" class="container text-center my-4">
      <h1 class="fs-1">Page not found</h1>
    </div>

    <div  class="row g-0" v-else>
      <ShowView v-for="show in showsByGenre" :key="show.id" :show="show" />
    </div>

    <div class="d-lg-flex align-items-baseline justify-content-center">
      <Pagination :totalPages="totalPages" :pages="pages" :hasInputNum="hasInputNum" :pageNum="pageNum" />
      <div class="d-flex align-items-center mt-lg-0 mt-2 ms-lg-2 ms-1">
        <input type="text" placeholder="Jump to-" class="border rounded me-1" style="width: 100px; height: 38px;" v-model="inputNum" name="pageNumber">
        <button class="btn btn-outline-info" @click="goToPageByInput(inputNum)" ><font-awesome-icon :icon="['fas', 'arrow-right']" class="text-light" /></button>
      </div>
    </div>
  </div>
</template>