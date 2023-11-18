<script setup>
import { ref,computed, onMounted, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter'
import ShowView from '../components/ShowView.vue';
import Pagination from '../components/Pagination.vue';

const router = useRouter()
const route = useRoute()
const movieStore = useMovieStore()

const searchedMovie = computed(() => movieStore.searcheds)
const totalPages = computed(() => movieStore.totalPages)

const pages= ref([])
const inputNum = ref(null)
const hasInputNum = ref(false)
const pageExists = ref(true)
const pageNum = ref(null)
const hasResults = ref(true)

const getSearchs = async(type) => {
  if(type == 'movie') {
    router.push({ name: 'search', params: { type: type, searchName : route.params.searchName, page: 1}})
  }

  if(type == 'tv') {
    router.push({ name: 'search', params: { type: type, searchName : route.params.searchName, page: 1}})
  }

  inputNum.value = null
  hasInputNum.value = false
}

const goToPageByInput = async(num) => {

  if(num > totalPages.value ) {
    hasInputNum.value = false
    pageExists.value = false
    router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: num}})
    return
  } else {
    router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: num}})
  }
}

const getSearchPage = async(type, name, num) => {

  hasResults.value = true

  pageNum.value = route.params.page

  pages.value = []

  movieStore.isLoading = true

  await movieStore.getsearcheds(type, name, num)
  if(searchedMovie.value.length == 0) {
    hasResults.value = false
    movieStore.isLoading = false
    return
  }

  movieStore.isLoading = false

  if(num > totalPages.value ) {
    hasInputNum.value = false
    pageExists.value = false
    router.push({ name: 'search', params: { type: type, searchName : name, page: num}})
    return
  }

  for(let i=0; i<totalPages.value; i++) {
    const page = i + 1
    pages.value.push(page)
  } 

  if(num < 5 || num >= totalPages.value) hasInputNum.value = false
  else hasInputNum.value = true
}

watch(route, () => {
  if(route.params.page <= totalPages.value) pageExists.value = true
  getSearchPage(route.params.type, route.params.searchName, route.params.page)
})

getSearchPage(route.params.type, route.params.searchName ,route.params.page)

</script>

<template>
  <div v-if="movieStore.isLoading" class="d-flex justify-content-center text-white my-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="mx-lg-5 mt-lg-3 mt-1 text-white" v-else>

    <h2 class="pe-lg-3 mb-lg-4 mb-1 fw-normal my-3" >Search results for "{{ route.params.searchName }}"</h2>

    <ul class="nav nav-tabs border-bottom-info mb-lg-3 mb-2">
      <li class="nav-item" @click="getSearchs('movie')">
        <span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'movie'}">
          <font-awesome-icon :icon="['fas', 'film']" /> Movies</span></li>

      <li class="nav-item" @click="getSearchs('tv')">
        <span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'tv'}">
          <font-awesome-icon :icon="['fas', 'tv']" /> TV series</span></li>
    </ul>

    <Pagination :totalPages="totalPages" :hasInputNum="hasInputNum" :pageNum="pageNum"  />

    <div v-if="!hasResults" class="container text-center my-4">
      <h1 class="fs-1">No results</h1>
    </div>
  
    <div v-if="!pageExists" class="container text-center my-4">
      <h1 class="fs-1">Page doesn't exist!</h1>
    </div>

    <div  class="row g-0" v-if="pageExists">  
      <ShowView v-for="show in searchedMovie" :key="show.id" :show="show" />
    </div>

    <div class="d-lg-flex align-items-baseline justify-content-center" >
      <Pagination :totalPages="totalPages" :hasInputNum="hasInputNum" :pageNum="pageNum" />
      <div class="d-flex align-items-center mt-lg-0 mt-2 ms-lg-2 ms-1">
        <input type="text" placeholder="Jump to-" class="border rounded me-1" style="width: 100px; height: 38px;" v-model="inputNum" name="pageNumber">
        <button class="btn btn-outline-info" @click="goToPageByInput(inputNum)" ><font-awesome-icon :icon="['fas', 'arrow-right']" class="text-light" /></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pageActive {
  background-color: aqua;
}
</style>