<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useMovieStore } from '../stores/counter';

const moviestrote = useMovieStore()

const route = useRoute()
const router = useRouter()

const { pages, totalPages, hasInputNum, pageNum } = defineProps(['pages', 'totalPages', 'hasInputNum', 'pageNum'])

const goPreviousPage = async(num) => {
  const previousPage = parseInt(num) - 1
  if(previousPage <= 0) return
  else {
    if(route.params.searchName) router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: previousPage}})
    else if(route.name == 'genre') router.push({ name: route.name, params: { type: route.params.type , id: route.params.id, page: previousPage }})
    else router.push({ name: route.name, params: { type: route.params.type , page: previousPage }})
  }
}

const goNextPage = async(num) => {
  const nextPage = parseInt(num) + 1
  if(nextPage > totalPages) return
  else {
    if(route.params.searchName) router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: nextPage}})
    else if(route.name == 'genre') router.push({ name: route.name, params: { type: route.params.type , id: route.params.id, page: nextPage }})
    else router.push({ name: route.name, params: { type: route.params.type , page: nextPage }})
  }
}

const goToPage = async(num) => {

  if(route.params.searchName) router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: num}})
  else if(route.name == 'genre') router.push({ name: route.name, params: { type: route.params.type , id: route.params.id, page: num }})
  else router.push({ name: route.name, params: { type: route.params.type , page: num }})
}

</script>

<template>
  <div class="d-flex justify-content-center mb-4">
    <button class="btn btn-light rounded-5" @click="goPreviousPage(route.params.page)">
      <font-awesome-icon :icon="['fas', 'chevron-left']" /></button>

    <button class="btn btn-light rounded-5 ms-lg-2 ms-1"  v-for="(page, i) in pages.slice(0, 4)" :key="page.id"
      @click="goToPage(page)" :class="{pageActive : i == parseInt(route.params.page) - 1}">{{ page }}</button>

    <span v-if="route.params.page != 5 && totalPages > 4" class="text-light fs-3 ms-lg-2 ms-1">...</span>

    <button v-if="hasInputNum" class="btn btn-light rounded-5 mx-lg-2 mx-1 " 
     :class="{pageActive: pageNum == route.params.page  }">
        {{ route.params.page }}</button>

    <span v-if="route.params.page != totalPages - 1 && totalPages > 4 " class="text-light fs-3 me-lg-2 me-1">...</span>

    <button v-if="totalPages > 4" @click="goToPage(totalPages)" class="btn btn-light rounded-5"
     :class="{pageActive: totalPages == route.params.page  }">
        {{ totalPages }}</button>

    <button class="btn btn-light rounded-5 ms-lg-2 ms-1 " @click="goNextPage(route.params.page)" >
      <font-awesome-icon :icon="['fas', 'angle-right']"  /></button>

  </div>
</template>

<style scoped>
.pageActive {
  background-color: aqua;
}</style>