<script setup>
import { ref ,computed } from 'vue';
import { useMovieStore } from '../stores/counter';
import axios from 'axios';
import ShowView from '../components/ShowView.vue';

const movieStore = useMovieStore()

const favMoviesIDs = computed(() => movieStore.favMoviesIDs)
const favTvsIDs = computed(() => movieStore.favTvsIDs)

let favMovies = ref([])
let favTvs = ref([])

const getUserMovies = async() => {
  await movieStore.getFavMoviesIDs()
  getMovieID()
}

const getUserTvs = async() => {
  await movieStore.getFavTvsIDs()
  getTvID()
}

let movieID = ''
const getMovieID = async() => {
  movieStore.isLoading = true

  for(let index in favMoviesIDs.value) {
    movieID = favMoviesIDs.value[index]

    const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieID}?`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
      }
    };

    const response = await axios.request(options)
    favMovies.value.push(response.data)
  }
  movieStore.isLoading = false
}

let tvID = ''
const getTvID = async() => {
  movieStore.isLoading = true

  for(let index in favTvsIDs.value) {
    tvID = favTvsIDs.value[index]

    const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${tvID}?`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
      }
    };

    const response = await axios.request(options)
    favTvs.value.push(response.data)
  }
  movieStore.isLoading = false
}

getUserMovies()
getUserTvs()

</script>

<template>
  <div class="container mt-lg-5 mt-2 mx-auto text-white">
    <h1 class="my-lg-4" style="margin-left: -10px;">Your favorite Movies</h1>
    <div class="row">
      <ShowView v-for="show in favMovies" :key="show.id" :show="show" />
    </div>

    <h1 class="my-lg-4" style="margin-left: -10px;">Your favorite Tv Shows</h1>
    <div class="row">
      <ShowView v-for="show in favTvs" :key="show.id" :show="show" />
    </div>
  </div>
  
</template>