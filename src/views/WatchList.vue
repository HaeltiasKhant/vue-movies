<script setup>
import { ref ,computed } from 'vue';
import { useMovieStore } from '../stores/counter';
import axios from 'axios';
import ShowView from '../components/ShowView.vue';

const movieStore = useMovieStore()

const watchListMoviesIDs = computed(() => movieStore.watchListMoviesIDs)
const watchListTvsIDs = computed(() => movieStore.watchListTvsIDs)

let watchListMovies = ref([])
let watchListTvs = ref([])

const getUserMovies = async() => {
  await movieStore.getWatchListMoviesIDs()
  getMovieID()
}

const getUserTvs = async() => {
  await movieStore.getWatchListTvsIDs()
  getTvID()
}

let movieID = ''
const getMovieID = async() => {
  for(let index in watchListMoviesIDs.value) {
    movieID = watchListMoviesIDs.value[index]

    const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieID}?`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
      }
    };

    const response = await axios.request(options)
    watchListMovies.value.push(response.data)
  }
}

let tvID = ''
const getTvID = async() => {
  for(let index in watchListTvsIDs.value) {
    tvID = watchListTvsIDs.value[index]

    const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${tvID}?`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
      }
    };

    const response = await axios.request(options)
    watchListTvs.value.push(response.data)
  }
}

getUserMovies()
getUserTvs()

</script>

<template>
  <div class="container mt-5 mx-auto text-white">
    <h1 class="my-lg-4" style="margin-left: -10px;">Your watchlist Movies</h1>
    <div class="row">
      <ShowView v-for="show in watchListMovies" :key="show.id" :show="show" />
    </div>

    <h1 class="my-lg-4" style="margin-left: -10px;">Your watchlist Tv Shows</h1>
    <div class="row">
      <ShowView v-for="show in watchListTvs" :key="show.id" :show="show" />
    </div>
  </div>
  
</template>