<script setup>
import { ref,computed, onMounted, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter'
import ShowView from '../components/ShowView.vue';

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

const goPreviousPage = async(num) => {
  pageNum.value = parseInt(num) - 1
  if(pageNum.value == 0) return

  router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: pageNum.value}})
}

const goNextPage = async(num) => {
  pageNum.value = parseInt(num) + 1
  if(pageNum.value > totalPages.value) return
  
  router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: pageNum.value}})
}

const goToPage = async(num) => {

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

  pageNum.value = route.params.page

  pages.value = []

  movieStore.isLoading = true

  await movieStore.getsearcheds(type, name, num)

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

  if(num < 7 || num >= totalPages.value) hasInputNum.value = false
  else hasInputNum.value = true
}

watch(route, () => {
  if(route.params.page <= totalPages.value) pageExists.value = true
  getSearchPage(route.params.type, route.params.searchName, route.params.page)
})

getSearchPage(route.params.type, route.params.searchName ,route.params.page)

</script>

<template>
  <div class="mx-lg-5 mt-lg-3 mt-1 text-white">

    <h1 class="pe-lg-3 mb-lg-4 mb-1" >Searched results for '{{ route.params.searchName }}', 
      <span class="fs-3">page - {{ route.params.page }}</span></h1>

    <ul class="nav nav-tabs my-2 border-bottom-info" style="margin-left: -10px;">
      <li class="nav-item" @click="getSearchs('movie')"><span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'movie'}">Movies</span></li>
      <li class="nav-item" @click="getSearchs('tv')"><span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'tv'}">TV series</span></li>
    </ul>

    <div v-if="movieStore.isLoading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="!pageExists" class="container text-center my-4">
      <h1 class="fs-1">Page not found</h1>
    </div>

    <div  class="row g-0" v-else>  
      <ShowView v-for="show in searchedMovie" :key="show.id" :show="show" />
    </div>

    <div class="d-flex justify-content-center mb-4" v-if="totalPages < 6">
      <button class="btn btn-light rounded-5 me-lg-2 me-1" @click="goPreviousPage(route.params.page)"><font-awesome-icon :icon="['fas', 'chevron-left']" /></button>
      <button class="btn btn-light rounded-5 me-lg-2 me-1"  v-for="(page, i) in pages" :key="page.id" @click="goToPage(page)" :class="{pageActive : i == parseInt(route.params.page) - 1}">{{ page }}</button>
      <button class="btn btn-light rounded-5 me-lg-2 me-1" @click="goNextPage(route.params.page)" ><font-awesome-icon :icon="['fas', 'angle-right']"  /></button>
    </div>

    <div class="d-lg-flex justify-content-center mb-4" v-else>

      <button class="btn btn-light rounded-5" 
        @click="goPreviousPage(route.params.page)"><font-awesome-icon :icon="['fas', 'chevron-left']" /></button>

      <button class="btn btn-light rounded-5 ms-lg-2 ms-1"  v-for="(page, i) in pages.slice(0, 6)" :key="page.id" 
        @click="goToPage(page)" :class="{pageActive : i == parseInt(route.params.page) - 1}">{{ page }}</button>
      
      <span v-if="route.params.page != 7 " class="text-light fs-3 ms-lg-2 ms-1">...</span>

      <button v-if="hasInputNum" class="btn btn-light rounded-5 mx-lg-2 mx-1" @click="goToPage(inputNum)" 
        :class="{pageActive: inputNum == route.params.page || pageNum == route.params.page }">{{ route.params.page }}</button>

      <span v-if="route.params.page != (totalPages - 1) " class="text-light fs-3 me-lg-2 me-1">...</span>

      <button v-if="pages.length > 6" class="btn btn-light rounded-5" :class="{pageActive: route.params.page == totalPages}" 
        @click="goToPage(totalPages)">{{ totalPages }}</button>

      <button class="btn btn-light rounded-5 ms-lg-2 ms-1" @click="goNextPage(route.params.page)" >
        <font-awesome-icon :icon="['fas', 'angle-right']"  /></button>

      <div class="d-flex align-items-center mt-lg-0 mt-2 ms-lg-2 ms-1">
        <input type="text" placeholder="Jump to-" class="border rounded me-1" style="width: 100px; height: 38px;" v-model="inputNum" >
        <button class="btn btn-outline-info" @click="goToPage(inputNum)" ><font-awesome-icon :icon="['fas', 'arrow-right']" class="text-light" /></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pageActive {
  background-color: aqua;
}
</style>