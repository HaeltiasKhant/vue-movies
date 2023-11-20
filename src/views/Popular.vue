<script setup>
import ShowView from '../components/ShowView.vue';
import { computed, ref, watch } from 'vue';
import { useMovieStore } from '../stores/counter';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '../components/Pagination.vue';

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

const populars = computed(() => movieStore.populars)

const inputNum = ref(null)
const hasInputNum = ref(false)
const pageExists = ref(true)

const totalPages = ref(100)
const pages= ref([])
const pageNum = ref(null)

const getPopulars = async(type) => {
  if(type == 'movie') {
    router.push({ name: 'popular', params: { type: type , page: 1 }})
  }

  if(type == 'tv') {
    router.push({ name: 'popular', params: { type: type , page: 1 }})
  }
  inputNum.value = null
  hasInputNum.value = false
}

const goToPageByInput = async(num) => {
  
  if(num > totalPages.value ) {
    hasInputNum.value = false
    pageExists.value = false
    router.push({ name: 'popular', params: { type: route.params.type , page: num}})
    return
  } else {
    router.push({ name: 'popular', params: { type: route.params.type , page: num}})
  }
}

const getPopularPage = async(type, num) => {
  
  pageNum.value = route.params.page

  if(num > totalPages.value ) {
    hasInputNum.value = false
    pageExists.value = false
    router.push({ name: 'popular', params: { type: type , page: num}})
    return
  }

  movieStore.isLoading = true

  await movieStore.getPopulars(type, num)

  movieStore.isLoading = false
  
  for(let i=0; i<totalPages.value; i++) {
    const page = i + 1
    pages.value.push(page)
  } 

  if(num < 5 || num >= totalPages.value) hasInputNum.value = false
  else hasInputNum.value = true
}

watch(route, () => {
  if(route.params.page <= totalPages.value) pageExists.value = true
  if(route.params.type == 'movie') getPopularPage('movie', route.params.page)
  if(route.params.type == 'tv') getPopularPage('tv', route.params.page)
})

getPopularPage(route.params.type, route.params.page)

</script>

<template>
  <div v-if="movieStore.isLoading" class="d-flex justify-content-center text-white my-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class=" mt-lg-4 mt-2 mx-lg-5 mx-1 mb-5 text-white" v-else>
    <h1 class="pe-3 mb-lg-4 mb-2 fw-normal" >Popular shows</h1>
    <ul class="nav nav-tabs border-bottom-info mb-lg-3 mb-2" >
      <li class="nav-item" @click="getPopulars('movie')">
        <span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'movie'}">
          <font-awesome-icon :icon="['fas', 'film']" /> Movies</span></li>

      <li class="nav-item" @click="getPopulars('tv')">
        <span class="nav-link text-info" style="cursor: pointer;" :class="{active: route.params.type == 'tv'}">
          <font-awesome-icon :icon="['fas', 'tv']" /> TV series</span></li>
    </ul>

    <Pagination :totalPages="totalPages" :hasInputNum="hasInputNum" :pageNum="pageNum" />

    <div v-if="!pageExists" class="container text-center my-4">
      <h1 class="fs-1">Page not found</h1>
    </div>

    <div  class="row g-1" v-else>
      <ShowView v-for="show in populars" :key="show.id" :show="show" />
    </div>

    <div class="d-lg-flex align-items-baseline justify-content-center">
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