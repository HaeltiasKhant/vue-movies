<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const router = useRouter()
const pages= ref([])

const { totalPages, hasInputNum, pageNum } = defineProps(['totalPages', 'hasInputNum', 'pageNum'])

for(let i=0; i<totalPages; i++) {
    const page = i + 1
    pages.value.push(page)
  } 

const goPreviousPage = async(num) => {
  const previousPage = parseInt(num) - 1
  if(previousPage <= 0) return
  if(route.params.searchName) router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: previousPage}})
  else router.push({ name: route.name, params: { type: route.params.type , page: previousPage }})
}

const goNextPage = async(num) => {
  const nextPage = parseInt(num) + 1
  if(nextPage > totalPages) return
  if(route.params.searchName) router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: nextPage}})
  else router.push({ name: route.name, params: { type: route.params.type , page: nextPage }})
}

const goToPage = async(num) => {

  if(num > totalPages.value ) {
    hasInputNum.value = false
    pageExists.value = false
    if(route.params.searchName) router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: num}})
    else router.push({ name: route.name, params: { type: route.params.type , page: num }})
    return
  } else {
    if(route.params.searchName) router.push({ name: 'search', params: { type: route.params.type, searchName : route.params.searchName, page: num}})
    else router.push({ name: route.name, params: { type: route.params.type , page: num }})
  }
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